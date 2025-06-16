import { FetcherOptions } from '@/types/fetcher';

//const baseURL = 'http://localhost:3000';
//const baseURL = 'https://api.fanfal.com/';
export const publicApis = [
    '/api/auth/login',
    '/api/auth/signup',
    '/api/proxy/login',
    '/api/proxy/signup',
];
export const internalApis = [
    '/api/proxy/login',
    '/api/proxy/logout',
    '/api/proxy/signup',
    '/api/proxy/refresh',
];
export const externalApis = [
    '/api/auth/signup',
    '/api/auth/login',
    '/api/auth/logout',
    '/api/auth/refresh',
];
export const fetchInstance = async <TResponse, TRequest>(
    url: string,
    options: FetcherOptions<TRequest> = {}
): Promise<TResponse> => {
    //const fullUrl = `${baseURL}${url}`;
    let fullUrl: string;
    //프록시 요청
    const FRONTEND_URL =
        process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
    //실제 api 요청
    const BACKEND_URL =
        process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.fanfal.com';
    if (isInternalApi(url)) {
        // 내부 API: Next.js API Routes
        fullUrl = `${FRONTEND_URL}${url}`;
    } else if (isExternalApi(url)) {
        // 외부 API: 실제 백엔드
        fullUrl = `${BACKEND_URL}${url}`;
    } else {
        // 절대 URL이면 그대로 사용
        fullUrl = url.startsWith('http') ? url : `${FRONTEND_URL}${url}`;
    }
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    try {
        const response = await fetch(fullUrl, {
            ...options,
            headers,
            credentials: 'include',
            body: options.body ? JSON.stringify(options.body) : undefined,
        });
        console.log('fetchInstance', response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        //✅ returnFullResponse가 true면 ok 체크 없이 Response 반환
        if (options.returnFullResponse) {
            return response as TResponse;
        }
        return response.json();
    } catch (error) {
        throw error;
    }
};

function isInternalApi(url: string): boolean {
    return internalApis.some((pattern) => {
        if (pattern.endsWith('/')) {
            return url.startsWith(pattern);
        }
        return url === pattern;
    });
}

function isExternalApi(url: string): boolean {
    return externalApis.some((pattern) => {
        if (pattern.endsWith('/')) {
            return url.startsWith(pattern);
        }
        return url === pattern;
    });
}
