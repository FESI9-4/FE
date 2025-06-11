import { fetchInstance, publicApis } from './fetchInstance';
import { FetcherOptions } from '@/types/fetcher';
import { useAuthStore } from '@/store/authStore';

// 토큰 갱신 Promise 관리
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
            /**
             * @description 토큰 갱신 중이면 기다리고, 아니면 새로 시작
             */
            if (!refreshPromise) {
                refreshPromise = (async () => {
                    try {
                        console.log('🔄 리프레쉬 토큰으로 재발급 요청 시작');
                        const refreshResponse = await fetchInstance<
                            Response,
                            unknown
                        >('/api/auth/refresh', {
                            method: 'POST',
                            credentials: 'include',
                            returnFullResponse: true,
                        });
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

                        return newAccessToken;
                    } catch (refreshError) {
                        console.log('refreshResponse 실패', refreshError);
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
                })().finally(() => {
                    refreshPromise = null;
                });
            }

            try {
                // 토큰 갱신 완료까지 기다림
                const newAccessToken = await refreshPromise;

                // 새로 발급받은 액세스 토큰으로 원래 요청 재요청
                headers.set('Authorization', `Bearer ${newAccessToken}`);
                const retryResponse = await fetchInstance<TResponse, TRequest>(
                    url,
                    {
                        ...options,
                        headers,
                    }
                );
                //console.log('✅ 재요청 성공!', retryResponse);
                return retryResponse;
            } catch {
                throw new Error('Authentication failed');
            }
        }
        throw error;
    }
};
