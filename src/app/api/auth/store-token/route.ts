'use server';
import { mockUser } from '@/mocks/handlers/auths';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const requestData = await request.json();
    const cookieStore = await cookies();

    // 개발환경에서 직접 모킹 처리
    if (process.env.NODE_ENV === 'development') {
        //로그인 요청일 때 mock 처리
        if (requestData.userId && requestData.password) {
            // MSW와 동일한 인증 로직
            const user = mockUser.find(
                (user) =>
                    user.userId === requestData.userId &&
                    user.password === requestData.password
            );

            if (user) {
                console.log('✅ 인증 성공!');
                // 🎯 JWT 토큰 생성 (MSW와 동일한 로직)
                const accessPayload = {
                    userId: user.userId,
                    nickName: user.nickName,
                    role: 'user',
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + 30, // 30초 후 만료
                };

                const refreshPayload = {
                    userId: user.userId,
                    nickName: user.nickName,
                    type: 'refresh',
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7일 후 만료
                };

                const header = { alg: 'HS256', typ: 'JWT' };
                const mockAccessToken =
                    btoa(JSON.stringify(header)) +
                    '.' +
                    btoa(JSON.stringify(accessPayload)) +
                    '.' +
                    'mock-signature';
                const mockRefreshToken =
                    btoa(JSON.stringify(header)) +
                    '.' +
                    btoa(JSON.stringify(refreshPayload)) +
                    '.' +
                    'mock-signature';

                // 쿠키에 액세스 토큰 저장,
                cookieStore.set({
                    name: 'accessToken',
                    value: mockAccessToken,
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict',
                    path: '/',
                });

                // 유저 데이터
                const userData = {
                    userId: user.userId,
                    nickName: user.nickName,
                    img: user.img,
                    wistLikeCount: user.wistLikeCount,
                    description: user.description,
                };

                return NextResponse.json(
                    {
                        success: true,
                        accessToken: mockAccessToken,
                        user: userData,
                    },
                    {
                        status: 200,
                        headers: {
                            'Set-Cookie': `refreshToken=${mockRefreshToken}; Path=/; Max-Age=604800; SameSite=Strict`,
                        },
                    }
                );
            }
        }

        if (requestData.accessToken) {
            console.log('🔄 액세스 토큰 쿠키 저장 요청');
            cookieStore.set({
                name: 'accessToken',
                value: requestData.accessToken,
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                path: '/',
            });
            return NextResponse.json({
                success: true,
            });
        }
        console.log('❌ 인증 실패');
        return NextResponse.json(
            {
                success: false,
                error: '이메일 또는 비밀번호가 잘못되었습니다.',
            },
            { status: 401 }
        );
    }

    // 🚀 프로덕션에서는 실제 authApi.login() 호출
    // const response = await authApi.login(loginData);
    // ... 실제 백엔드 로직

    return NextResponse.json(
        {
            success: false,
            error: '프로덕션 환경에서는 실제 백엔드 연동 필요',
        },
        { status: 500 }
    );
}
