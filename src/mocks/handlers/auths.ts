import { http, HttpResponse } from 'msw';
import { SignupMemberRequestDto } from '@/types/auth';

const BASE_URL = 'http://localhost:3000'; // 추후 백엔드 서버로 변경
export const mockUser = [
    {
        userId: 'test@test.com',
        nickName: 'test',
        img: 'https://randomuser.me/api/portraits/men/75.jpg',
        wistLikeCount: 5,
        password: '12345678',
        description: '안녕하세요 test 입니다',
    },
    {
        userId: 'test2@test.com',
        nickName: 'test2',
        img: 'https://randomuser.me/api/portraits/men/76.jpg',
        wistLikeCount: 10,
        password: '12345678',
        description: '안녕하세요 test2 입니다',
    },
    {
        userId: 'test3@test.com',
        nickName: 'test3',
        img: 'https://randomuser.me/api/portraits/women/77.jpg',
        wistLikeCount: 10,
        password: '12345678',
        description: '안녕하세요 test3 입니다',
    },
];
// export const loginHandlers = [
//     http.post(`${BASE_URL}/api/auth/login`, async ({ request }) => {
//         console.log('🔍 === 로그인 핸들러 시작 ===');
//         const loginData = (await request.json()) as LoginRequest;

//         if (
//             mockUser.some(
//                 (user) =>
//                     user.userId === loginData.userId &&
//                     user.password === loginData.password
//             )
//         ) {
//             // 🎯 실제 JWT처럼 만료시간을 가진 토큰 생성
//             const accessPayload = {
//                 userId: loginData.userId,
//                 nickName: mockUser.find(
//                     (user) => user.userId === loginData.userId
//                 )?.nickName,
//                 role: 'user',
//                 iat: Math.floor(Date.now() / 1000), // 발급 시간
//                 exp: Math.floor(Date.now() / 1000) + 30, // 🎯 30초 후 만료
//             };
//             const refreshPayload = {
//                 userId: loginData.userId,
//                 nickName: mockUser.find(
//                     (user) => user.userId === loginData.userId
//                 )?.nickName,
//                 type: 'refresh',
//                 iat: Math.floor(Date.now() / 1000),
//                 exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 🎯 7일 후 만료
//             };

//             // JWT 형태로 만들기 (header.payload.signature)
//             const header = { alg: 'HS256', typ: 'JWT' };
//             const mockAccessToken =
//                 btoa(JSON.stringify(header)) +
//                 '.' +
//                 btoa(JSON.stringify(accessPayload)) +
//                 '.' +
//                 'mock-signature';
//             const mockRefreshToken =
//                 btoa(JSON.stringify(header)) +
//                 '.' +
//                 btoa(JSON.stringify(refreshPayload)) +
//                 '.' +
//                 'mock-signature';

//             const mockResponse: LoginResponse = {
//                 statusCode: 200,
//                 message: '로그인 성공',
//                 data: {
//                     userId: loginData.userId,
//                     nickName:
//                         mockUser.find(
//                             (user) => user.userId === loginData.userId
//                         )?.nickName || '',
//                     img:
//                         mockUser.find(
//                             (user) => user.userId === loginData.userId
//                         )?.img || '',
//                     wistLikeCount:
//                         mockUser.find(
//                             (user) => user.userId === loginData.userId
//                         )?.wistLikeCount || 0,
//                     description:
//                         mockUser.find(
//                             (user) => user.userId === loginData.userId
//                         )?.description || '',
//                 },
//             };

//             // 🎯 실제 만료시간을 가진 JWT 토큰 반환
//             return HttpResponse.json(mockResponse, {
//                 status: 200,
//                 headers: {
//                     Authorization: `Bearer ${mockAccessToken}`,
//                     'Set-Cookie': `refreshToken=${mockRefreshToken}; Path=/; Max-Age=604800; SameSite=Lax`,
//                 },
//             });
//         }

//         return HttpResponse.json(
//             {
//                 statusCode: 401,
//                 message: '이메일 또는 비밀번호가 잘못되었습니다.',
//             },
//             {
//                 status: 401,
//             }
//         );
//     }),
// ];
export const logoutHandlers = [
    http.post(`${BASE_URL}/api/auth/logout`, async () => {
        console.log('logoutHandlers 호출');
        return HttpResponse.json(
            {
                statusCode: 200,
                message: '로그아웃 성공',
            },
            {
                headers: {
                    'Set-Cookie':
                        'refreshToken=; Path=/; Max-Age=0; SameSite=Strict',
                },
            }
        );
    }),
];
export const signupHandlers = [
    http.post(`${BASE_URL}/api/auth/signup`, async ({ request }) => {
        const signupData = (await request.json()) as SignupMemberRequestDto;
        if (mockUser.some((user) => user.userId === signupData.userId)) {
            return HttpResponse.json(
                {
                    statusCode: 104,
                    message: '이미 사용중인 이메일입니다.',
                },
                {
                    status: 200,
                }
            );
        }
        mockUser.push({
            userId: signupData.userId,
            nickName: signupData.nickName,
            img: '',
            wistLikeCount: 0,
            password: signupData.password,
            description: '',
        });
        return HttpResponse.json(
            {
                statusCode: 200,
                message: '회원가입 성공',
                data: '',
            },
            {
                status: 200,
            }
        );
    }),
];
export const userHandlers = [
    http.get(`${BASE_URL}/api/auth/user`, async ({ request }) => {
        console.log('userHandlers 호출');
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '');

        // 🎯 JWT 만료시간 검증
        try {
            const payload = JSON.parse(atob(token?.split('.')[1] || ''));
            const currentTime = Math.floor(Date.now() / 1000);
            console.log(
                '🔍 토큰 만료시간:',
                new Date(payload.exp * 1000).toLocaleString()
            );
            console.log('🔍 현재 시간:', new Date().toLocaleString());

            // 토큰 만료 확인
            if (payload.exp < currentTime) {
                console.log('🚨 토큰 만료됨!');
                throw new Error('Token expired');
            }

            console.log('✅ 토큰 유효함');

            // ✅ 성공 응답
            return HttpResponse.json({
                statusCode: 200,
                message: '유저 정보 조회 성공',
                data: {
                    userId: payload.userId,
                    nickName: payload.nickName,
                    img:
                        mockUser.find((user) => user.userId === payload.userId)
                            ?.img || '',
                    wistLikeCount:
                        mockUser.find((user) => user.userId === payload.userId)
                            ?.wistLikeCount || 0,
                    description:
                        mockUser.find((user) => user.userId === payload.userId)
                            ?.description || '',
                },
            });
        } catch (error) {
            console.log('🚨 토큰 검증 실패:', error);
            return HttpResponse.json(
                {
                    statusCode: 401,
                    message: '유효하지 않거나 만료된 액세스 토큰입니다',
                },
                { status: 401 }
            );
        }
    }),
];
// export const refreshHandlers = [
//     http.post(`${BASE_URL}/api/auth/refresh`, async (request) => {
//         console.log('🔍 === 리프레쉬 핸들러 시작 ===');
//         const cookieHeader = request.headers.get('Cookie');
//         const refreshToken = cookieHeader?.split(';')[0].split('=')[1];
//         console.log('🔑 추출된 리프레쉬 토큰:', refreshToken);

//         if (!refreshToken) {
//             console.error('❌ 리프레쉬 토큰이 없습니다');

//             // 🎯 명확한 401 응답 반환
//             return HttpResponse.json(
//                 {
//                     statusCode: 401,
//                     message: '리프레쉬 토큰이 없습니다.',
//                 },
//                 {
//                     status: 401,
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
//         }

//         // JWT 검증
//         try {
//             const payload = JSON.parse(atob(refreshToken.split('.')[1]));
//             const currentTime = Math.floor(Date.now() / 1000);

//             console.log(
//                 '🕐 리프레쉬 토큰 만료시간:',
//                 new Date(payload.exp * 1000).toLocaleString()
//             );
//             console.log('🕐 현재 시간:', new Date().toLocaleString());

//             if (payload.exp < currentTime) {
//                 console.error('❌ 리프레쉬 토큰이 만료되었습니다');
//                 throw new Error('Refresh token expired');
//             }

//             console.log('✅ 리프레쉬 토큰 검증 통과');

//             // 새 액세스 토큰 생성
//             const newAccessPayload = {
//                 userId: payload.userId,
//                 nickName: payload.nickName,
//                 role: 'user',
//                 iat: Math.floor(Date.now() / 1000),
//                 exp: Math.floor(Date.now() / 1000) + 60, // 1분 후 만료
//             };

//             const header = { alg: 'HS256', typ: 'JWT' };
//             const newAccessToken =
//                 btoa(JSON.stringify(header)) +
//                 '.' +
//                 btoa(JSON.stringify(newAccessPayload)) +
//                 '.' +
//                 'mock-signature';

//             console.log('✅ 새 JWT 액세스 토큰 생성:', newAccessToken);

//             return HttpResponse.json(
//                 {
//                     statusCode: 200,
//                     message: '리프레쉬 토큰으로 액세스 토큰 재발급 성공',
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${newAccessToken}`,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
//         } catch (error) {
//             console.error('❌ 리프레쉬 토큰 검증 실패:', error);

//             // 🎯 명확한 401 응답 반환
//             return HttpResponse.json(
//                 {
//                     statusCode: 401,
//                     message: '유효하지 않거나 만료된 리프레쉬 토큰입니다.',
//                 },
//                 {
//                     status: 401,
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
//         }
//     }),
// ];
export const testHandlers = [
    http.get(`${BASE_URL}/api/auth/test`, async ({ request }) => {
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '');
        console.log('testHandlers1 호출');
        // 🎯 JWT 만료시간 검증
        try {
            const payload = JSON.parse(atob(token?.split('.')[1] || ''));
            const currentTime = Math.floor(Date.now() / 1000);
            console.log(
                '🔍 토큰 만료시간:',
                new Date(payload.exp * 1000).toLocaleString()
            );
            console.log('🔍 현재 시간:', new Date().toLocaleString());

            // 토큰 만료 확인
            if (payload.exp < currentTime) {
                console.log('🚨 토큰 만료됨!');
                throw new Error('Token expired');
            }

            console.log('✅ 토큰 유효함');

            // ✅ 성공 응답
            return HttpResponse.json({
                statusCode: 200,
                message: '유저 정보 조회 성공',
                data: {
                    test: 'test',
                },
            });
        } catch (error) {
            console.log('🚨 토큰 검증 실패:', error);
            return HttpResponse.json(
                {
                    statusCode: 401,
                    message: '유효하지 않거나 만료된 액세스 토큰입니다',
                },
                { status: 401 }
            );
        }
    }),
];
export const testHandlers2 = [
    http.get(`${BASE_URL}/api/auth/test2`, async ({ request }) => {
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '');
        console.log('testHandlers2 호출');
        // 🎯 JWT 만료시간 검증
        try {
            const payload = JSON.parse(atob(token?.split('.')[1] || ''));
            const currentTime = Math.floor(Date.now() / 1000);

            console.log(
                '🔍 토큰 만료시간:',
                new Date(payload.exp * 1000).toLocaleString()
            );
            console.log('🔍 현재 시간:', new Date().toLocaleString());

            // 토큰 만료 확인
            if (payload.exp < currentTime) {
                console.log('🚨 토큰 만료됨!');
                throw new Error('Token expired');
            }

            console.log('✅ 토큰 유효함');

            // ✅ 성공 응답
            return HttpResponse.json({
                statusCode: 200,
                message: '유저 정보 조회 성공',
                data: {
                    test: 'test2',
                },
            });
        } catch (error) {
            console.log('🚨 토큰 검증 실패:', error);
            return HttpResponse.json(
                {
                    statusCode: 401,
                    message: '유효하지 않거나 만료된 액세스 토큰입니다',
                },
                { status: 401 }
            );
        }
    }),
];
