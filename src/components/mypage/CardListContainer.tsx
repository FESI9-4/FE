import { useState } from 'react';
import { MyCardList, PaginationButton } from '@/components/ui';
import { BlankScreen } from '@/components/mypage';
export default function CardListContainer() {
    const mok = {
        totalPage: 1,
        currentPage: 1,
        data: [],
    };
    const [currentPage, setCurrentPage] = useState(mok.currentPage);

    return (
        <div>
            {mok.data.length === 0 ? (
                <BlankScreen
                    text={`신청한 펜팔이 없어요\n마음에 드는 팬팔을 찾으러 갈까요?`}
                    buttonText="팬팔 만들기"
                    link="/"
                />
            ) : (
                <div className="flex flex-col gap-13.5">
                    <div>
                        {mok.data.map((item, index) => (
                            <div
                                key={item.article_id}
                                className="flex flex-col gap-3"
                            >
                                <MyCardList
                                    title={item.title}
                                    location={item.location}
                                    date={item.date}
                                    currentPerson={item.current_person}
                                    maxPerson={item.max_person}
                                    openStatus={
                                        item.openStatus as
                                            | 'waiting'
                                            | 'finished'
                                            | 'progressing'
                                            | 'canceled'
                                    }
                                    image={item.image}
                                    createdUser={item.created_at}
                                    createdUserProfileImg={item.image}
                                    useStatus={
                                        item.useStatus as 'schedule' | 'done'
                                    }
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
