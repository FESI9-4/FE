import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
    console.log('middleware 실행');
    // 쿠키에서 액세스 토큰 가져오기
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');

    // 로그인된 사용자만 접근 가능한 페이지
    const authRoutes = ['/mypage'];
    // 로그인하지 않은 사용자만 접근 가능한 페이지 (로그인된 사용자는 리다이렉트)
    const publicRoutes = ['/login', '/signup', '/findpassword'];

    // 현재 경로 정보
    const path = request.nextUrl.pathname;
    const isAuthRoute = authRoutes.some((route) => path.startsWith(route));
    const isPublicRoute = publicRoutes.some((route) => path === route);

    //🎯 보호된 페이지인데 토큰이 없음 → 단순히 로그인 페이지로
    if (isAuthRoute && !accessToken) {
        console.log('❌ 로그인 필요 - 로그인 페이지로 이동');
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    //🎯 로그인된 사용자가 guestRoutes 페이지 접근 → 마이페이지로
    if (isPublicRoute && accessToken) {
        console.log('✅ 이미 로그인됨 - 마이페이지로 이동');
        return NextResponse.redirect(new URL('/mypage', request.nextUrl));
    }
    return NextResponse.next();
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
