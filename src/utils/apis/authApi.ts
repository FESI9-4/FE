// api/authApi.ts
import {
    LoginRequestDto,
    User,
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
        return customFetcher<ApiResponse<User>, void>(
            `http://localhost:3000/api/auth/user`,
            {
                method: 'GET',
            }
        );
    },
};
