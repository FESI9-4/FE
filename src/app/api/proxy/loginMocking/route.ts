import { NextResponse } from 'next/server';
import { mockUser } from '@/mocks/handlers/auths';
import { TOKEN_EXPIRY } from '@/config/constants';

//api route에서 msw로 모킹한 핸들러를 인식을 못해서 api route로 모킹 처리
export async function POST(request: Request) {
    const { userId, password } = await request.json();

    if (userId && password) {
        const user = mockUser.find(
            (user) => user.userId === userId && user.password === password
        );

        if (user) {
            // 🎯 JWT 토큰 생성 (MSW와 동일한 로직)
            const accessPayload = {
                userId: user.userId,
                nickName: user.nickName,
                role: 'user',
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY.ACCESS_TOKEN,
            };

            const refreshPayload = {
                userId: user.userId,
                nickName: user.nickName,
                type: 'refresh',
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY.REFRESH_TOKEN,
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
                    statusCode: 200,
                    message: '로그인 성공',
                    data: userData,
                },
                {
                    status: 200,
                    headers: {
                        Authorization: `Bearer ${mockAccessToken}`,
                        'Set-Cookie': `refreshToken=${mockRefreshToken}; Path=/; Max-Age=${TOKEN_EXPIRY.REFRESH_TOKEN}; SameSite=Strict; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}`,
                    },
                }
            );
        }
    }

    return NextResponse.json(
        {
            statusCode: 401,
            message: '이메일 또는 비밀번호가 잘못되었습니다.',
        },
        { status: 401 }
    );
}
