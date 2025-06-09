'use client';

import { useState } from 'react';
import { CardList, PaginationButton } from '@/components/ui';
import { BlankScreen } from '@/components/mypage';
import { CardListMok as mok } from '../../__mock__/mypage';
import Link from 'next/link';

export default function CardListContainer() {
    const [currentPage, setCurrentPage] = useState(mok.currentPage);

    return (
        <div>
            {mok.data.length === 0 ? (
                <BlankScreen
                    text={`아직 만든 팬팔이 없어요\n마음을 나눌 팬팔을 직접 만들어보세요!`}
                    buttonText="팬팔 만들기"
                    link="/ "
                />
            ) : (
                <div className="flex flex-col gap-13.5">
                    <div>
                        {mok.data.map((item, index) => (
                            <Link
                                key={item.fanpal_id}
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
                                    wishList={item.wishList}
                                    image={item.image}
                                    createdUser={item.createdUser}
                                    createdUserProfileImg={item.image}
                                />
                                {index !== mok.data.length - 1 && (
                                    <hr className="border-t border-gray-800 pb-3" />
                                )}
                            </Link>
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
