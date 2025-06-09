// app/api/auth/store-token/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { accessToken } = await request.json();
    const cookieStore = await cookies();
    // ✅ App Router에서 HttpOnly 쿠키 설정
    cookieStore.set({
        name: 'accessToken',
        value: accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });
    console.log('✅ 액세스 토큰 쿠키에 저장 완료');
    return NextResponse.json({ success: true });
}
