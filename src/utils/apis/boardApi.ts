import { BoardApiResponse, BoardParams } from '@/types/board';

import { customFetcher } from '@/utils/apis/customFetcher';

export const boardApi = {
    getArticles: async (params: BoardParams): Promise<BoardApiResponse> => {
        const query = new URLSearchParams({
            bigCategory: params.bigCategory,
            ...(params.smallCategory && {
                smallCategory: params.smallCategory,
            }),
            ...(params.location && { location: params.location }),
            ...(params.date && { date: params.date.toString() }),
            sort: params.sort,
            sortAsc: String(params.sortAsc),
            lastArticleId: params.lastArticleId.toString(),
            limit: params.limit.toString(),
        });

        return customFetcher<BoardApiResponse, undefined>(
            `/api/board?${query.toString()}`,
            {
                method: 'GET',
            }
        );
    },
};
