import { ProfileIcon } from '@/assets/index';
import ContainerProgress from './ContainerProgress';
import { useState } from 'react';
import Like from './Like';

interface ContainerInformationProps {
    create_user: string;
    title: string;
    location: string;
    date: string;
    limitedDate: string | number;
    minPerson: number;
    maxPerson: number;
    currentPerson: number;
    wishList: boolean;
    articleId: number;
}
export default function ContainerInformaiton({
    create_user,
    title,
    location,
    date,
    limitedDate,
    minPerson,
    maxPerson,
    currentPerson,
    wishList,
    articleId,
}: ContainerInformationProps) {
    const now = new Date();
    const deadlineDate = new Date(Number(limitedDate) * 1000);

    const dateObj = new Date(Number(date) * 1000);

    const [liked, setLiked] = useState(wishList);

    const toggleLike = async () => {
        const newLiked = !liked;
        setLiked(newLiked);

        try {
            if (newLiked) {
                // TODO: 좋아요 추가 API
                console.log(`POST /api/wishlist/${articleId}`);
            } else {
                // TODO: 좋아요 제거 API
                console.log(`DELETE /api/wishlist/${articleId}`);
            }
        } catch (err) {
            console.error('좋아요 토글 실패:', err);
            setLiked(!newLiked);
        }
    };

    const openStatus =
        now > deadlineDate
            ? 'finished'
            : currentPerson >= minPerson
              ? 'progressing'
              : 'waiting';

    const formatKoreanDate = (date: Date) =>
        date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    return (
        <div className="w-full px-2 md:px-0 h-71 md:h-85  flex flex-col gap-7 md:justify-between bg-transparent min-w-86">
            <div className="h-43  flex flex-col justify-between md:h-48">
                <div className="h-23 md:h-24  flex flex-col gap-2 md:gap-3">
                    <div className=" flex flex-col h-15 gap-1 ">
                        <div className="flex justify-between items-center h-8">
                            <span className="text-2xl font-semibold h-8">
                                {title}
                            </span>
                            <Like
                                like={liked}
                                onClick={toggleLike}
                                className="hidden md:inline-block"
                            />
                        </div>
                        <span className="text-base font-normal text-gray-300 h-6 ">
                            {location}
                        </span>
                    </div>
                    <div className="h-6 flex gap-2 items-center ">
                        <ProfileIcon width={32} height={32} />
                        <span className="h-5">{create_user}</span>
                    </div>
                </div>
                <div className="h-13 md:h-14  flex flex-col gap-1 md:gap-2">
                    <div className="h-6 flex items-center">
                        <span className="w-14 text-base font-normal text-gray-400">
                            진행일시
                        </span>
                        <div className="w-0.5 h-3.5 ml-2.5 mr-2 bg-gray-800" />

                        <span className="text-base font-normal">
                            {formatKoreanDate(dateObj)}
                        </span>
                    </div>
                    <div className="h-6 flex items-center">
                        <span className="w-14 text-base font-normal text-green-400">
                            모집마감
                        </span>
                        <div className="w-0.5 h-3.5 ml-2.5 mr-2 bg-gray-800" />

                        <span className="text-base font-normal">
                            {formatKoreanDate(deadlineDate)}
                        </span>
                    </div>
                </div>
            </div>
            <div className="h-21 md:h-20 flex flex-col gap-3">
                <div className="h-10 ">
                    <ContainerProgress
                        max={maxPerson}
                        current={currentPerson}
                        openStatus={openStatus}
                    ></ContainerProgress>
                </div>
                <div className="h-4 flex items-center justify-between text-sm font-medium text-gray-500">
                    <span>최소인원 {minPerson}명</span>
                    <span>최대인원 {maxPerson}명</span>
                </div>
            </div>
        </div>
    );
}
