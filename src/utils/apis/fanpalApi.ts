import { customFetcher } from '@/utils/apis/customFetcher';

interface FanFalResponse {
    statusCode: number;
    message: string;
    data: string;
}

export const fanFalApi = {
    join: async (articleId: number): Promise<FanFalResponse> => {
        return customFetcher<FanFalResponse, void>(
            `/api/board/${articleId}/fanFal`,
            {
                method: 'POST',
                auth: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    },

    cancel: async (articleId: number): Promise<FanFalResponse> => {
        return customFetcher<FanFalResponse, void>(
            `/api/board/${articleId}/fanFal`,
            {
                method: 'DELETE',
                auth: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    },
};
