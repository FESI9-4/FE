// api/authApi.ts
import {
    LoginRequest,
    UserResponse,
    SignupRequest,
    ApiResponse,
} from '@/types/auth';
import { customFetcher } from '@/utils/apis/customFetcher';
import { fetchInstance } from './fetchInstance';
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
        return fetchInstance<ApiResponse<void>, SignupRequest>(
            `${BASE_URL}/signup`,
            {
                method: 'POST',
                body: signupData,
            }
        );
    },

    // 유저 정보 조회
    getUser: async () => {
        return customFetcher<UserResponse, void>(`${BASE_URL}/user`, {
            method: 'GET',
        });
    },
    // 쿠키 삭제
    clearCookie: async () => {
        return customFetcher<Response, void>(`${BASE_URL}/clear-cookie`, {
            method: 'POST',
        });
    },
    test: async () => {
        return customFetcher<ApiResponse<{ test: string }>, void>(
            `${BASE_URL}/test`,
            {
                method: 'GET',
            }
        );
    },
    test2: async () => {
        return customFetcher<ApiResponse<{ test: string }>, void>(
            `${BASE_URL}/test2`,
            {
                method: 'GET',
            }
        );
    },
};
