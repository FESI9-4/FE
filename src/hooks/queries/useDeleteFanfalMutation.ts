import { useMutation } from '@tanstack/react-query';
import { deleteFanfalApi } from '@/utils/apis/deleteFanfal';

export interface ApiResponse {
    statusCode: number;
    message: string;
    data: number;
}

export function useDeleteFanfalMutation() {
    return useMutation<ApiResponse, Error, number>({
        mutationFn: (articleId: number) =>
            deleteFanfalApi.deleteArticle(articleId),
    });
}
