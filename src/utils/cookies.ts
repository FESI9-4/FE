import { Cookies } from 'react-cookie';

const cookies = new Cookies();
interface CookieOptions {
    path?: string;
    domain?: string;
    expires?: Date;
    maxAge?: number;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
    [key: string]: string | number | boolean | Date | undefined;
}

/**
 * @example
 * setCookie('cookie', 'realChocolate', {
 *     path: '/',
 *     secure: true,
 *     samesite: 'lax',
 *     'max-age': 3600,
 * });
 */
export function setCookie(
    name: string,
    value: string,
    options: CookieOptions = {}
) {
    //쿠키 기본 옵션 설정
    const defaultOptions: CookieOptions = {
        path: '/',
        secure: true,
        sameSite: 'lax',
        maxAge: 1800, // 30분
    };
    const finalOptions = { ...defaultOptions, ...options };
    cookies.set(name, value, finalOptions);
}
export function getCookie(name: string): string | undefined {
    return cookies.get(name);
}

/**
 * @example
 * removeCookie('accessToken');
 * removeCookie('accessToken', '/admin');
 * removeCookie('accessToken', '/', '.example.com');
 * 쿠키 삭제시 해당하는 path로 삭제 시켜야함
 */
export function removeCookie(name: string, path = '/', domain?: string) {
    cookies.remove(name, { path, domain });
}
export function getAllCookies() {
    return cookies.getAll();
}
