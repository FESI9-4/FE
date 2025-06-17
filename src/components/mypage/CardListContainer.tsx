'use client';

import { useState } from 'react';
import { CardList, PaginationButton } from '@/components/ui';
import { BlankScreen } from '@/components/mypage';
import Link from 'next/link';
import { mypageApi } from '@/utils/apis/mypage';
import { useQuery } from '@tanstack/react-query';
import { SelfMypageResponse } from '@/types/myPage';

export default function CardListContainer() {
    const [currentPage, setCurrentPage] = useState(1);
    const [lastArticleId, setLastArticleId] = useState<number | null>(null);
    const { data, isLoading, isError } = useQuery<SelfMypageResponse>({
        queryKey: ['mypageSelf', currentPage],
        queryFn: () => mypageApi.getSelfMypage(lastArticleId, 4),
    });

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setLastArticleId((page - 1) * 4);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    return (
        <div>
            {data?.data.length === 0 || !data ? (
                <BlankScreen
                    text={`아직 만든 팬팔이 없어요\n마음을 나눌 팬팔을 직접 만들어보세요!`}
                    buttonText="팬팔 만들기"
                    link="/ "
                />
            ) : (
                <div className="flex flex-col gap-13.5">
                    <div>
                        {data?.data.map((item, index) => (
                            <Link
                                key={item.fanpal_id?.toString() ?? index}
                                href={`/panpal/${item.fanpal_id}`}
                                className="flex flex-col gap-3"
                            >
                                <CardList
                                    title={item.title}
                                    location={item.location}
                                    date={item.date}
                                    deadline={item.deadline}
                                    currentPerson={item.currentPerson}
                                    maxPerson={item.maxPerson}
                                    openStatus={
                                        item.openStatus as
                                            | 'waiting'
                                            | 'finished'
                                            | 'progressing'
                                    }
                                    image={item.image}
                                    createUser={item.createUser}
                                    createUserProfileImg={
                                        item.createUserProfileImg
                                    }
                                />
                                {index !== data?.data.length - 1 && (
                                    <hr className="border-t border-gray-800 pb-3" />
                                )}
                            </Link>
                        ))}
                    </div>
                    <PaginationButton
                        currentPage={currentPage}
                        totalPages={data?.totalPage ?? 0}
                        onPageChange={handlePageChange}
                        size="large"
                    />
                </div>
            )}
        </div>
    );
}
