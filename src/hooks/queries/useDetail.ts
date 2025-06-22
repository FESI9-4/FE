import { useQuery } from '@tanstack/react-query';
import { getDetailApi } from '@/utils/apis/getDetailApi';

export function useDetail(articleId: number) {
    return useQuery({
        queryKey: ['detail', articleId],
        queryFn: () => getDetailApi.getDetailById(articleId),
        staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
        refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 재요청 비활성화
    });
}
