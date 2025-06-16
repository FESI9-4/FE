// 토큰 만료시간 전역 관리
export const TOKEN_EXPIRY = {
    ACCESS_TOKEN: 2 * 60 * 60, // 2시간 (7200초)
    REFRESH_TOKEN: 2 * 60 * 60, // 2시간 (7200초)
} as const;
