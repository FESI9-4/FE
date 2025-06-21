import { useQuery } from '@tanstack/react-query';
import { customFetcher } from '@/utils/apis/customFetcher';

export const useCheckParticipation = (articleId: number) => {
    return useQuery({
        queryKey: ['isParticipated', articleId],
        queryFn: async () => {
            const response = await customFetcher<{
                isParticipated: boolean;
            }>(`/api/board/${articleId}/fanFal/me`, {
                method: 'GET',
                auth: true,
            });
            return response.isParticipated;
        },
        staleTime: 1000 * 10, // 10초 정도 캐시
    });
};
