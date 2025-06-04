'use client';

import React, { useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import CardList from '../ui/CardList';
import { Button } from '../ui';
import PaginationButton from '../ui/PaginationButton';
import Link from 'next/link';
import { Card } from '@/types/card';

interface CardSectionProps {
    cards: Card[];
}

export default function CardSection({ cards }: CardSectionProps) {
    const hasCards = cards && cards.length > 0;
    const isMobile = useMediaQuery('(max-width: 639px)');

    // 페이지 상태: 현재 페이지, 기본값 1
    const [currentPage, setCurrentPage] = useState(1);

    // 한 페이지에 보여줄 카드 수
    const cardsPerPage = 4;

    // 총 페이지 수 계산
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    // 현재 페이지에 보여줄 카드 리스트 슬라이스
    const currentCards = cards.slice(
        (currentPage - 1) * cardsPerPage,
        currentPage * cardsPerPage
    );

    // 페이지 변경 함수
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-col items-end gap-12">
            <div className="w-full min-h-110 sm:min-h-190 xl:min-h-145 flex items-center justify-center ">
                {hasCards ? (
                    <div className="flex flex-col gap-10 sm:gap-10 xl:gap-16 w-full ">
                        <div className="flex- flex-col gap-3 min-h-100 sm:min-h-160 xl:min-h-80">
                            {currentCards.map((card) => (
                                <Link key={card.id} href={`/panpal/${card.id}`}>
                                    <CardList
                                        key={card.id}
                                        title={card.title}
                                        location={card.location}
                                        date={card.date}
                                        deadline={card.deadline}
                                        currentPerson={card.currentPerson}
                                        maxPerson={card.maxPerson}
                                        openStatus={card.openStatus}
                                        wishList={card.wishList}
                                        image={card.image}
                                        createdUser={card.createdUser}
                                        createdUserProfileImg={
                                            card.createdUserProfileImg
                                        }
                                    />
                                </Link>
                            ))}
                        </div>

                        <PaginationButton
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            size="small"
                        />
                        <div className=""></div>
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm font-medium flex flex-col justify-center items-center">
                        <span>아직 팬팔이 없어요,</span>
                        <span>지금 바로 팬팔을 만들어보세요</span>
                    </p>
                )}
            </div>
            {isMobile && (
                <div className="h-20">
                    <Button className="w-30 h-12 whitespace-nowrap">
                        팬팔 만들기
                    </Button>
                </div>
            )}
        </div>
    );
}
