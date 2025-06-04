import { cookies } from 'next/headers';
import { fetchInstance, publicApis } from './fetchInstance';
import { FetcherOptions } from '@/types/fetcher';

export const serverFetcher = async <T, B>(
    url: string,
    options: FetcherOptions<B> = {}
): Promise<T> => {
    const cookieStore = await cookies();
    const isPublic = publicApis.some((api) => url.includes(api));
    const headers = new Headers(options.headers);

    if (!isPublic) {
        const token = cookieStore.get('accessToken')?.value;
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

                cookieStore.set('accessToken', refreshResponse.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/',
                });

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
                cookieStore.delete('accessToken');
                throw new Error('Authentication failed');
            }
        }
        throw error;
    }
};
