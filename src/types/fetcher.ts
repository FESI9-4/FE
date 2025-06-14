export interface FetcherOptions<B> extends Omit<RequestInit, 'body'> {
    body?: B;
    returnFullResponse?: boolean; // 헤더도 리턴 받을 것인지 !
    auth?: boolean; // true일 경우, access-token 헤더를 자동으로 포함하기 위한 플래그
}
