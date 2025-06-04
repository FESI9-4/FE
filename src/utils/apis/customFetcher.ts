import { serverFetcher } from './serverFetcher';
import { clientFetcher } from './clientFetcher';
import { FetcherOptions } from '@/types/fetcher';

export const customFetcher = <T, B>(
    url: string,
    options: FetcherOptions<B> = {}
) => {
    if (typeof window === 'undefined') {
        return serverFetcher<T, B>(url, options);
    }

    return clientFetcher<T, B>(url, options);
};
