import { useAuthStore } from '@/store/authStore';
import { fetchInstance, publicApis } from './fetchInstance';
import { FetcherOptions } from '@/types/fetcher';
export const clientFetcher = async <TResponse, TRequest>(
    url: string,
    options: FetcherOptions<TRequest> = {}
): Promise<TResponse> => {
    const authStore = useAuthStore.getState();
    const isPublic = publicApis.includes(url);
    const headers = new Headers(options.headers);

    if (!isPublic) {
        const token = authStore.accessToken;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
            console.log('clientFetcher 헤더에 액세스 토큰 설정 완료');
        }
    }
    try {
        const response = await fetchInstance<TResponse, TRequest>(url, {
            ...options,
            headers,
        });
        return response;
    } catch (error: unknown) {
        if (
            error instanceof Error &&
            error.message.includes('401') &&
            !isPublic
        ) {
            try {
                console.log('🔄 리프레쉬 토큰으로 재발급 요청 시작');
                const refreshResponse = await fetchInstance<Response, unknown>(
                    '/api/auth/refresh',
                    {
                        method: 'POST',
                        credentials: 'include',
                        returnFullResponse: true,
                    }
                );
                const newAccessToken = refreshResponse.headers
                    .get('Authorization')
                    ?.replace('Bearer ', '');

                if (!newAccessToken) {
                    throw new Error('No access token in response');
                }
                authStore.setAccessToken(newAccessToken);
                await fetchInstance('/api/auth/store-token', {
                    method: 'POST',
                    body: { accessToken: newAccessToken },
                });
                headers.set('Authorization', `Bearer ${newAccessToken}`);
                const retryResponse = await fetchInstance<TResponse, TRequest>(
                    url,
                    {
                        ...options,
                        headers,
                    }
                );
                console.log('✅ 재요청 성공!', retryResponse);
                return retryResponse;
            } catch {
                console.log('refreshResponse 실패', error);
                authStore.removeAccessToken();
                try {
                    console.log('로그아웃 시작');
                    await fetchInstance('/api/auth/logout', {
                        method: 'POST',
                        credentials: 'include',
                    });
                    await fetchInstance('/api/auth/clear-cookie', {
                        method: 'POST',
                        credentials: 'include',
                    });
                } catch (error) {
                    console.error('Logout failed:', error);
                }
                window.location.href = '/login';
                throw new Error('Authentication failed');
            }
        }
        throw error;
    }
};
