import { useEffect, useState } from 'react';
import { PaginationButton } from '../ui';
import ConcertCardList from './ConcertCardList';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { findTotalCount, getConcertList } from '@/utils/apis/concert';
import { Concert } from '@/types/concert';
import { BlankScreen } from '../mypage';

export default function CardContainer({
    startDate,
    endDate,
    location,
}: {
    startDate: string;
    endDate: string;
    location: string;
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const queryClient = useQueryClient();
    const {
        data: concertList,
        isLoading,
        isError,
    } = useQuery<Concert[]>({
        queryKey: ['concerts', currentPage, location, startDate, endDate],
        queryFn: () =>
            getConcertList(currentPage, startDate, endDate, location),
        staleTime: 1000 * 60 * 1,
    });
    const {
        data: totalCount,
        isLoading: totalCountLoading,
        isError: totalCountError,
    } = useQuery<number>({
        queryKey: ['totalCount', location, startDate, endDate],
        queryFn: () => findTotalCount(startDate, endDate, location),
    });

    useEffect(() => {
        if (totalCount && currentPage <= totalCount - 2) {
            const nextPage = currentPage + 1;
            queryClient.prefetchQuery({
                queryKey: ['concerts', nextPage, location, startDate, endDate],
                queryFn: () =>
                    getConcertList(nextPage, startDate, endDate, location),
            });
        }
    }, [currentPage, queryClient, totalCount, startDate, endDate, location]);

    useEffect(() => {
        setCurrentPage(1);
    }, [location]);

    if (isLoading || totalCountLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen min-w-[1060px]">
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
        <div className="flex flex-col gap-17 justify-center items-center ">
            {concertList && concertList[0] ? (
                <ConcertCardList concertResponse={concertList} />
            ) : (
                <div className="flex justify-center items-center min-w-[1060px]">
                    <BlankScreen text="검색 결과가 없습니다." />
                </div>
            )}
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
