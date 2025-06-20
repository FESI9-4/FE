import { useAuthStore } from '@/store/authStore';
import { fetchInstance, publicApis } from './fetchInstance';
import { FetcherOptions } from '@/types/fetcher';

// 토큰 갱신 중복 방지
let refreshPromise: Promise<string> | null = null;

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
                // 이미 갱신 중이면 기존 Promise 기다리기
                if (!refreshPromise) {
                    refreshPromise = (async () => {
                        const refreshResponse = await fetchInstance<
                            Response,
                            unknown
                            // msw에서는 '/api/auth/refresh'
                        >('/api/proxy/refresh', {
                            method: 'POST',
                            returnFullResponse: true,
                        });
                        const newAccessToken = refreshResponse.headers
                            .get('Authorization')
                            ?.replace('Bearer ', '');
                        if (!newAccessToken) {
                            throw new Error('No access token in response');
                        }
                        return newAccessToken;
                    })();
                }
                const newAccessToken = await refreshPromise;
                refreshPromise = null; // 완료 후 초기화
                authStore.setAccessToken(newAccessToken);

                // 새로운 토큰으로 헤더 업데이트
                headers.set('Authorization', `Bearer ${newAccessToken}`);
                const retryResponse = await fetchInstance<TResponse, TRequest>(
                    url,
                    {
                        ...options,
                        headers,
                    }
                );

                return retryResponse;
            } catch {
                refreshPromise = null; // 실패 시에도 초기화
                authStore.removeAccessToken();
                authStore.setHasRefreshToken(false);

                try {
                    // msw에서는 '/api/auth/logout'
                    await fetchInstance('/api/proxy/logout', {
                        method: 'POST',
                    });
                } catch {
                    console.error('❌ 쿠키 삭제 실패');
                }
                window.location.href = '/login';
                throw new Error('Authentication failed');
            }
        }
        throw error;
    }
};
