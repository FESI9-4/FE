import { useAuthStore } from '@/store/authStore';
import { fetchInstance, publicApis } from './fetchInstance';
import { FetcherOptions } from '@/types/fetcher';

export const clientFetcher = async <T, B>(
    url: string,
    options: FetcherOptions<B> = {}
): Promise<T> => {
    const authStore = useAuthStore.getState();
    const isPublic = publicApis.some((api) => url.includes(api));
    const headers = new Headers(options.headers);

    if (!isPublic) {
        const token = authStore.accessToken;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
    }

    try {
        const response = await fetchInstance<T, B>(url, {
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
                const refreshResponse = await fetchInstance<
                    { accessToken: string },
                    unknown
                >('/auth/refresh', {
                    method: 'POST',
                });

                authStore.setAccessToken(refreshResponse.accessToken);
                headers.set(
                    'Authorization',
                    `Bearer ${refreshResponse.accessToken}`
                );
                const retryResponse = await fetchInstance<T, B>(url, {
                    ...options,
                    headers,
                });

                return retryResponse;
            } catch {
                authStore.removeAccessToken();
                window.location.href = '/login';
                throw new Error('Authentication failed');
            }
        }
        throw error;
    }
};
