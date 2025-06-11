'use client';

import { ConcertCardList } from '@/components/concert';
import { PaginationButton } from '@/components/ui';
import { useEffect, useState } from 'react';
import { getConcertList, findTotalCount } from '@/utils/apis/concert';
import { Concert } from '@/types/concert';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export default function ConcertPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const queryClient = useQueryClient();
    const startDate = '20250601';
    const endDate = '20250630';

    const {
        data: concertList,
        isLoading,
        isError,
    } = useQuery<Concert[]>({
        queryKey: ['concerts', currentPage],
        queryFn: () => getConcertList(currentPage, startDate, endDate),
        staleTime: 1000 * 60 * 1,
    });

    const {
        data: totalCount,
        isLoading: totalCountLoading,
        isError: totalCountError,
    } = useQuery<number>({
        queryKey: ['totalCount', startDate, endDate],
        queryFn: () => findTotalCount(startDate, endDate),
    });

    useEffect(() => {
        if (totalCount && currentPage <= totalCount - 2) {
            const nextPage = currentPage + 1;
            queryClient.prefetchQuery({
                queryKey: ['concerts', nextPage],
                queryFn: () => getConcertList(nextPage, startDate, endDate),
            });
        }
    }, [currentPage, queryClient, totalCount]);

    if (isLoading || totalCountLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (isError || totalCountError) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">
                    데이터를 불러오는데 실패했습니다.
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center gap-17 pt-25 w-full">
            {concertList && <ConcertCardList concertResponse={concertList} />}
            {totalCount && (
                <PaginationButton
                    currentPage={currentPage}
                    totalPages={totalCount}
                    onPageChange={setCurrentPage}
                    size="large"
                />
            )}
        </div>
    );
}
