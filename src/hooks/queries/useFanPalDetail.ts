import { useQuery } from '@tanstack/react-query';
import { getDetailApi } from '@/utils/apis/getDetailApi';

export const useFanPalDetail = (articleId: number) => {
    return useQuery({
        queryKey: ['fanpalDetail', articleId],
        queryFn: () => getDetailApi.getDetailById(articleId),
    });
};
