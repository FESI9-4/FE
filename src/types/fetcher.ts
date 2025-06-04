export interface FetcherOptions<B> extends Omit<RequestInit, 'body'> {
    body?: B;
}
