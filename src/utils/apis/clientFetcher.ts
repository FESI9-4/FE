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
                const refreshResponse = await fetchInstance<Response, unknown>(
                    '/auth/refresh',
                    {
                        method: 'POST',
                    }
                );

                const newAccessToken = refreshResponse.headers
                    .get('Authorization')
                    ?.replace('Bearer ', '');
                if (!newAccessToken) {
                    throw new Error('No access token in response');
                }

                authStore.setAccessToken(newAccessToken);
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
                authStore.removeAccessToken();
                window.location.href = '/login';
                throw new Error('Authentication failed');
            }
        }
        throw error;
    }
};
