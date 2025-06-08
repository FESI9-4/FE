import { useState } from 'react';
import { CardList, PaginationButton } from '@/components/ui';
import { BlankScreen } from '@/components/mypage';
import { mok2 as mok } from './mok';

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
                            <div
                                key={item.article_id}
                                className="flex flex-col gap-3"
                            >
                                <CardList
                                    title={item.title}
                                    location={item.location}
                                    date={item.date}
                                    deadline={item.deadline}
                                    currentPerson={item.current_person}
                                    maxPerson={item.max_person}
                                    openStatus={
                                        item.openStatus as
                                            | 'waiting'
                                            | 'finished'
                                            | 'progressing'
                                    }
                                    wishList={item.wish_list}
                                    image={item.image}
                                    createdUser={item.created_at}
                                    createdUserProfileImg={item.image}
                                    href={`/panpal/${item.article_id}`}
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
