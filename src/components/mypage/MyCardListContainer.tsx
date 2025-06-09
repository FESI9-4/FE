'use client';

import { MyCardList, PaginationButton } from '@/components/ui';
import { BlankScreen } from '@/components/mypage';
import { useState } from 'react';
import { MyCardListMok as mok } from '../../__mock__/mypage';

export default function MyCardListContainer() {
    const [currentPage, setCurrentPage] = useState(mok.currentPage);

    return (
        <div>
            {mok.data.length === 0 ? (
                <BlankScreen
                    text={`신청한 펜팔이 없어요\n마음에 드는 팬팔을 찾으러 갈까요?`}
                    buttonText="팬팔 둘러보기"
                    link="/"
                />
            ) : (
                <div className="flex flex-col gap-13.5">
                    <div>
                        {mok.data.map((item, index) => (
                            <div
                                key={item.fanpal_id}
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
                                    createdUser={item.createdUser}
                                    createdUserProfileImg={item.image}
                                    useStatus={
                                        item.useStatus as 'schedule' | 'done'
                                    }
                                    buttonOnClick={() => {}}
                                />
                                {index !== mok.data.length - 1 && (
                                    <hr className="border-t border-gray-800 pb-3" />
                                )}
                            </div>
                        ))}
                    </div>
                    <PaginationButton
                        currentPage={currentPage}
                        totalPages={mok.totalPage}
                        onPageChange={setCurrentPage}
                        size="large"
                    />
                </div>
            )}
        </div>
    );
}
