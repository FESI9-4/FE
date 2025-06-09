// API 응답 공통 구조
export type ApiResponse<T> = {
    statusCode: number;
    message: string;
    data?: T;
    headers?: Record<string, string>; // 헤더 추가
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
export interface LoginRequest {
    userId: string;
    password: string;
}
export interface SignupRequest {
    userId: string;
    password: string;
    nickName: string;
}
// 유저 정보
export interface User {
    userId: string;
    nickName: string;
    img?: string;
    wistLikeCount?: number;
}
