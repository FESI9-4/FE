// api/authApi.ts
import {
    LoginRequestDto,
    UserResponse,
    ApiResponse,
    SignupMemberRequestDto,
    SignupMemberResponseDto,
    ApiFailure,
    LoginResponseResponseDto,
} from '@/types/auth';
import { customFetcher } from '@/utils/apis/customFetcher';
const BASE_URL = '/api/proxy';
export const authApi = {
    // 로그인
    login: async (loginData: LoginRequestDto) => {
        return customFetcher<
            ApiResponse<LoginResponseResponseDto> | ApiFailure,
            LoginRequestDto
        >(`${BASE_URL}/login`, {
            method: 'POST',
            body: loginData,
        });
    },
    // 로그아웃
    logout: async () => {
        return customFetcher<Response, void>(`${BASE_URL}/logout`, {
            method: 'POST',
        });
    },
    // 회원가입
    signup: async (signupData: SignupMemberRequestDto) => {
        return customFetcher<
            ApiResponse<SignupMemberResponseDto> | ApiFailure,
            SignupMemberRequestDto
        >(`${BASE_URL}/signup`, {
            method: 'POST',
            body: signupData,
        });
    },

    // 유저 정보 조회
    getUser: async () => {
        return customFetcher<UserResponse, void>(
            `http://localhost:3000/api/auth/user`,
            {
                method: 'GET',
            }
        );
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
