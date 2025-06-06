import { http, HttpResponse } from 'msw';
import { LoginRequest } from '@/types/authType';

const BASE_URL = 'http://localhost:3000'; // 추후 백엔드 서버로 변경

const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0QGdtYWlsLmNvbSIsIm5pY2tOYW1lIjoidG9tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDM5NzEyMDAsImV4cCI6MTcwMzk3MjEwMH0.K7WX9Q2mJ8fL3N5P8vR6tY9cB4xE1mA2nD7wS5uH8jK';

const refreshToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0QGdtYWlsLmNvbSIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzAzOTcxMjAwLCJleHAiOjE3MDQ1NzYwMDB9.M9pQ3vR7xY2zA8bC6dE4fG1hI5jL8kN0oP9qS3tU7wV';

export const loginHandlers = [
    http.post(`${BASE_URL}/api/auth/login`, async ({ request }) => {
        // 🎯 요청 body에서 데이터 추출
        const { userId, password } = (await request.json()) as LoginRequest;
        console.log('loginHandlers 호출:', { userId, password });

        if (userId === 'test@test.com' && password === '12345678') {
            return HttpResponse.json(
                {
                    statusCode: 200,
                    message: '로그인 성공',
                    data: {
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0QGdtYWlsLmNvbSIsIm5pY2tOYW1lIjoidG9tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDM5NzEyMDAsImV4cCI6MTcwMzk3MjEwMH0.K7WX9Q2mJ8fL3N5P8vR6tY9cB4xE1mA2nD7wS5uH8jK',
                        userId: 'toma@gmail.com',
                        nickName: '홍길동',
                        img: 'https://randomuser.me/api/portraits/men/75.jpg',
                        wistLikeCount: 10,
                    },
                },
                {
                    //리프레쉬 토큰 쿠키 설정 (이부분은 백엔드에서 처리해서 줄 예정)
                    headers: {
                        'Set-Cookie': `refreshToken=${refreshToken};Max-Age=3600;SameSite=strict;Path=/`,
                        // 🎯 액세스 토큰을 Authorization 헤더로 전송
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        }
        return HttpResponse.json({
            statusCode: 401,
            message: '로그인 실패',
        });
    }),
];
export const logoutHandlers = [
    http.post(`${BASE_URL}/api/auth/logout`, async () => {
        return HttpResponse.json({
            statusCode: 200,
            message: '로그아웃 성공',
        });
    }),
];
