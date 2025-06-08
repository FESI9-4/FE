export interface FetcherOptions<B> extends Omit<RequestInit, 'body'> {
    body?: B;
    returnFullResponse?: boolean; // 헤더도 리턴 받을 것인지 !
}
