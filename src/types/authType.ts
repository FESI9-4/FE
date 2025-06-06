// API 응답 공통 구조
export type ApiResponse<T> = {
    statusCode: number;
    message: string;
    data: T;
};
// 로그인 응답 데이터
export type LoginResponse = ApiResponse<LoginResponseData> & {
    accessToken?: string; // 헤더에서 추출한 토큰
};
// 내 펜팔 조회 응답
export type MyPenpalResponse = ApiResponse<MyPenpalResponseData[]>;
// 내 펜팔 조회 응답 데이터
export interface MyPenpalResponseData {
    artcleId: number;
    title: string;
    location: string;
    date: string;
    deadLine: string;
    createdAt: string;
    currentPerson: number;
    maxPerson: number;
    openStatus: string;
    wishList: boolean;
    image: string;
    useStatus: string;
}
// 로그인 요청
export interface LoginRequest {
    userId: string;
    password: string;
}
// 로그인 응답 데이터
export interface LoginResponseData {
    token: string;
    userId: string;
    nickName: string;
    img?: string;
    wistLikeCount?: number;
}
// 내 펜팔 조회 요청
export interface MyPenpalRequest {
    lastArticleId?: number;
    limit?: number;
}
// 유저 정보
export interface User {
    userId: string;
    nickName: string; // nickname → nickName으로 수정
    img?: string; // optional
    wistLikeCount?: number; // optional
}
// 액세스 토큰
export interface AccessToken {
    token: string;
}
