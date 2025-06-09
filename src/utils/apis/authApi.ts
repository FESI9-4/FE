// api/authApi.ts
import {
    LoginRequest,
    StoreTokenResponse,
    UserResponse,
    ApiResponse,
    SignupRequest,
} from '@/types/auth';
import { customFetcher } from '@/utils/apis/customFetcher';
const BASE_URL = '/api/auth';
export const authApi = {
    // 로그인
    login: async (loginData: LoginRequest) => {
        return customFetcher<Response, LoginRequest>(`${BASE_URL}/login`, {
            method: 'POST',
            body: loginData,
            returnFullResponse: true, // 이 옵션으로 Response 객체 받음
        });
    },

    // 로그아웃
    logout: async () => {
        return customFetcher<Response, void>(`${BASE_URL}/logout`, {
            method: 'POST',
        });
    },
    // 회원가입
    signup: async (signupData: SignupRequest) => {
        return customFetcher<Response, SignupRequest>(`${BASE_URL}/signup`, {
            method: 'POST',
            body: signupData,
        });
    },

    // 유저 정보 조회
    getUser: async () => {
        return customFetcher<UserResponse, void>(`${BASE_URL}/user`, {
            method: 'GET',
        });
    },
    // 이메일 중복 체크
    checkUserId: async (userId: string) => {
        return customFetcher<ApiResponse<void>, string>(
            `${BASE_URL}/check-userId?userId=${userId}`,
            {
                method: 'GET',
            }
        );
    },
    // 액세스 토큰 api route로 쿠키 설정 api
    storeAccessToken: async (accessToken: string) => {
        return customFetcher<StoreTokenResponse, { accessToken: string }>(
            `${BASE_URL}/store-token`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: { accessToken },
            }
        );
    },
    // 쿠키 삭제
    clearCookie: async () => {
        return customFetcher<Response, void>(`${BASE_URL}/clear-cookie`, {
            method: 'POST',
        });
    },
};
