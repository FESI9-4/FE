import { MyCardList, PaginationButton } from '@/components/ui';
import { BlankScreen } from '@/components/mypage';
import { useState } from 'react';

export default function MyCardListContainer() {
    const mok = {
        totalPage: 10,
        currentPage: 1,
        data: [
            {
                article_id: 1,
                title: '나의 팬팔',
                location: '서울',
                date: '1748933344',
                deadline: '1748933344',
                created_at: '1748933344',
                current_person: 1,
                max_person: 10,
                openStatus: 'waiting',
                wish_list: true,
                image: 'https://picsum.photos/200/300',
                useStatus: 'schedule',
            },
            {
                article_id: 2,
                title: '나의 팬팔',
                location: '서울',
                date: '1748933344',
                deadline: '1748933344',
                created_at: '1748933344',
                current_person: 1,
                max_person: 10,
                openStatus: 'finished',
                wish_list: true,
                image: 'https://picsum.photos/200/300',
                useStatus: 'done',
            },
            {
                article_id: 3,
                title: '나의 팬팔',
                location: '서울',
                date: '1748933344',
                deadline: '1748933344',
                created_at: '1748933344',
                current_person: 1,
                max_person: 10,
                openStatus: 'progressing',
                wish_list: true,
                image: 'https://picsum.photos/200/300',
                useStatus: 'schedule',
            },
            {
                article_id: 4,
                title: '나의 팬팔',
                location: '서울',
                date: '1748933344',
                deadline: '1748933344',
                created_at: '1748933344',
                current_person: 1,
                max_person: 10,
                openStatus: 'canceled',
                wish_list: true,
                image: 'https://picsum.photos/200/300',
                useStatus: 'schedule',
            },
        ],
    };
    const [currentPage, setCurrentPage] = useState(mok.currentPage);

    return (
        <div>
            {mok.data.length === 0 ? (
                <BlankScreen
                    title="팬팔을 만들어 보세요!"
                    description="팬팔을 만들어 보세요!"
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
