import { FetcherOptions } from '@/types/fetcher';

const baseURL = 'http://localhost:3000';
export const publicApis = [
    'api/auth/login',
    'api/auth/signup',
    'api/auth/refresh',
    'api/auth/check-userId',
];

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
        // ✅ Response 타입이면 response 자체를, 아니면 json 반환
        if (options.returnFullResponse) {
            return response as TResponse;
        }
        return response.json();
    } catch (error) {
        throw error;
    }
};
