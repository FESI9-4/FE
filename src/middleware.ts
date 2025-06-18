import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const isLoggedIn = !!(accessToken || refreshToken);
    const authRoutes = ['/mypage'];
    const publicRoutes = ['/login', '/signup', '/findpassword'];

    const path = request.nextUrl.pathname;
    const isAuthRoute = authRoutes.some((route) => path === route);
    const isPublicRoute = publicRoutes.some((route) => path === route);

    if (isAuthRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (isPublicRoute && isLoggedIn) {
        return NextResponse.redirect(new URL('/mypage', request.nextUrl));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
