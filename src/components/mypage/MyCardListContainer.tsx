'use client';

import { CustomSkeleton, MyCardList, PaginationButton } from '@/components/ui';
import { BlankScreen } from '@/components/mypage';
import { useState } from 'react';
import {
    useCancelMypageMutation,
    useDeleteMypageMutation,
    useGetMyPage,
} from '@/hooks/queries/useMyPage';

export default function MyCardListContainer() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, isError } = useGetMyPage(currentPage, 4);
    const { mutate: deleteMypage } = useDeleteMypageMutation();
    const { mutate: cancelMypage } = useCancelMypageMutation();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (isLoading) return <CustomSkeleton layout="fanpal" count={4} />;
    if (isError) return <div>Error</div>;

    return (
        <div>
            {data?.data.data.length === 0 || !data ? (
                <BlankScreen
                    text={`신청한 펜팔이 없어요\n마음에 드는 팬팔을 찾으러 갈까요?`}
                    buttonText="팬팔 둘러보기"
                    link="/"
                />
            ) : (
                <div className="flex flex-col gap-13.5">
                    <div>
                        {data?.data.data.map((item, index) => (
                            <div
                                key={item?.fanpal_id?.toString() ?? index}
                                className="flex flex-col gap-3"
                            >
                                <MyCardList
                                    title={item.title}
                                    location={item.location}
                                    date={item.date}
                                    currentPerson={item.currentPerson}
                                    maxPerson={item.maxPerson}
                                    openStatus={
                                        item.openStatus as
                                            | 'waiting'
                                            | 'finished'
                                            | 'progressing'
                                            | 'canceled'
                                    }
                                    image={item.image}
                                    createUser={item.createUser}
                                    createUserProfileImg={item.image}
                                    useStatus={
                                        item.useStatus as
                                            | 'UPCOMING'
                                            | 'COMPLETED'
                                    }
                                    buttonOnClick={() => {
                                        if (
                                            item.openStatus === 'waiting' ||
                                            item.openStatus === 'finished' ||
                                            item.openStatus === 'progressing'
                                        ) {
                                            cancelMypage(item.fanpal_id);
                                        } else {
                                            deleteMypage(item.fanpal_id);
                                        }
                                    }}
                                />
                                {index !== data?.data.data.length - 1 && (
                                    <hr className="border-t border-gray-800 pb-3" />
                                )}
                            </div>
                        ))}
                    </div>
                    <PaginationButton
                        currentPage={currentPage}
                        totalPages={Math.ceil(data?.data.totalCount / 4) ?? 0}
                        onPageChange={handlePageChange}
                        size="large"
                    />
                </div>
            )}
        </div>
    );
}
