import { FetcherOptions } from '@/types/fetcher';

//const baseURL = 'http://localhost:3000';
export const publicApis = [
    '/api/proxy/login',
    '/api/proxy/signup',
    '/api/auth/login',
    '/api/auth/signup',
    '/api/auth/findpassword',
    '/api/board',
];
export const internalApis = [
    '/api/proxy/login',
    '/api/proxy/logout',
    '/api/proxy/refresh',
    '/api/auth/findpassword',
    '/api/auth/user',
];
export const externalApis = [
    '/api/auth/signup',
    '/api/auth/login',
    '/api/auth/logout',
    '/api/auth/refresh',
    '/api/board',
    '/api/images/postImage',
    '/api/images/getImage',
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
        process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

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
    const urlPath = url.split('?')[0];
    return internalApis.some((pattern) => {
        if (pattern.endsWith('/')) {
            return urlPath.startsWith(pattern);
        }
        return urlPath === pattern;
    });
}

function isExternalApi(url: string): boolean {
    const urlPath = url.split('?')[0]; // 쿼리 제거는 여기서 했지만
    return externalApis.some((pattern) => {
        if (pattern.endsWith('/')) {
            return urlPath.startsWith(pattern);
        }
        return urlPath === pattern || urlPath.startsWith(pattern + '/');
    });
}

export const isPublicApi = (url: string) => {
    const urlPath = url.split('?')[0];
    return publicApis.some((pattern) => {
        if (pattern.endsWith('/')) {
            return urlPath.startsWith(pattern);
        }
        return urlPath === pattern;
    });
};
