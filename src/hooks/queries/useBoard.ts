import { useQuery } from '@tanstack/react-query';
import { boardApi } from '@/utils/apis/boardApi';
import { CATEGORY_DATA } from '@/types/categories';
import { Card } from '@/types/card';

interface UseArticlesParams {
    activeTab: number;
    selectedCategory: string;
    selectedRegion: string;
    selectedDate: Date | null;
    selectedSortOption: 'recent' | 'deadline' | 'person';
    sortAsc: boolean;
    lastArticleId?: number;
    limit?: number;
}

export const useArticles = ({
    activeTab,
    selectedCategory,
    selectedRegion,
    selectedDate,
    selectedSortOption,
    sortAsc,
    lastArticleId = 0,
    limit = 10,
}: UseArticlesParams) => {
    const queryResult = useQuery({
        queryKey: [
            'articles',
            activeTab,
            selectedCategory,
            selectedRegion,
            selectedDate?.getTime(),
            selectedSortOption,
            sortAsc,
            lastArticleId,
            limit,
        ],
        queryFn: async (): Promise<Card[]> => {
            const bigCategory = CATEGORY_DATA[activeTab].id;

            const response = await boardApi.getArticles({
                bigCategory,
                smallCategory:
                    selectedCategory === 'ALL' ? '' : selectedCategory,
                location: selectedRegion === '전체' ? '' : selectedRegion,
                date: selectedDate
                    ? Math.floor(selectedDate.getTime() / 1000)
                    : Math.floor(Date.now() / 1000),
                sort: selectedSortOption,
                sortAsc,
                lastArticleId,
                limit,
            });

            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 10 * 60 * 1000, // 10분
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // 탭이나 필터가 변경될 때마다 새로운 데이터를 가져오도록 설정
        refetchOnWindowFocus: false,
        placeholderData: (previousData) => previousData,
    });

    return queryResult;
};
