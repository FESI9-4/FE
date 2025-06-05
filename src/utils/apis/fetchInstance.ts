import { FetcherOptions } from '@/types/fetcher';

const baseURL = 'http://localhost:3000';
export const publicApis = ['/auth/login', '/auth/register', '/auth/refresh'];

export const fetchInstance = async <TResponse, TRequest>(
    url: string,
    options: FetcherOptions<TRequest> = {}
): Promise<TResponse> => {
    const fullUrl = `${baseURL}${url}`;
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    try {
        const response = await fetch(fullUrl, {
            ...options,
            headers,
            credentials: 'include',
            body: options.body ? JSON.stringify(options.body) : undefined,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};
