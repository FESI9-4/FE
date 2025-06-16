// API 응답 성공시 공통 구조
export type ApiResponse<T> = {
    statusCode?: number;
    message?: string;
    data?: T;
    headers?: Record<string, string>; // 헤더 추가
};
export interface ApiFailure {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
}
export type LoginResponseResponseDto = {
    message: string;
    status: number;
};
// 로그인 응답 데이터
export type LoginResponse = ApiResponse<User> & {
    accessToken?: string; // 헤더에서 추출한 토큰
};

// 유저 정보 응답 데이터
export type UserResponse = ApiResponse<User>;
export type StoreTokenResponse = {
    success: boolean;
};

// 로그인 요청
export interface LoginRequestDto {
    email: string;
    password: string;
}
export interface SignupMemberRequestDto {
    email: string;
    password: string;
    nickname: string;
}
export interface SignupMemberResponseDto {
    member_id: number;
    email: string;
    nickname: string;
    created_at: string;
}
// 유저 정보
export interface User {
    userId: string;
    nickName: string;
    img?: string;
    wistLikeCount?: number;
    description?: string;
}

// 회원가입 성공시 데이터
export interface SignupData {
    member_id: number;
    email: string;
    nickname: string;
    created_at: string;
}
