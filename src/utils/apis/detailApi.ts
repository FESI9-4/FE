import { DetailApiResponse } from '@/types/detail';
import { customFetcher } from '@/utils/apis/customFetcher';

export const detailApi = {
    getDetailById: async (
        articleId: number
    ): Promise<DetailApiResponse['data']> => {
        return customFetcher<DetailApiResponse, undefined>(
            `/api/board/${articleId}`,
            {
                method: 'GET',
            }
        ).then((res) => res.data);
    },
};
