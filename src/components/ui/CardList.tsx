import Image from 'next/image';
import dateConverter from '@/utils/dateConverter';
import Profile from './Profile';
import ContainerProgress from './ContainerProgress';
import Like from './Like';
import Tag from './Tag';
import { HandIcon } from '@/assets';

interface CardListProps {
    title: string;
    location: string;
    date: number;
    deadline: number;
    currentPerson: number;
    maxPerson: number;
    openStatus: 'waiting' | 'finished' | 'progressing';
    wishList: boolean;
    image: string;
    createdUser: string;
    createdUserProfileImg: string;
}

export default function CardList({
    title,
    location,
    date,
    deadline,
    currentPerson,
    maxPerson,
    openStatus,
    wishList,
    image,
    createdUser,
    createdUserProfileImg,
}: CardListProps) {
    const convertedDate = dateConverter(Number(date), 'korea');
    const convertedDeadline = dateConverter(Number(deadline), 'korea-short');

    return (
        <div className="w-full flex flex-col sm:flex-row sm:py-3 sm:pl-3 sm:pr-6 sm:gap-6 gap-0 sm:min-h-67.5 min-h-97 hover:bg-gray-900 active:opacity-50 hover:cursor-pointer">
            <div className="w-full sm:w-1/4 relative h-50 sm:h-auto">
                <Image src={image} alt="image" fill objectFit="cover" />
                {openStatus === 'finished' ? (
                    <div className="absolute bg-black/50 w-full h-full flex flex-col justify-center items-center gap-6">
                        <HandIcon className="w-8 h-8 text-gray-600 fill-white" />
                        <div className="flex justify-center items-center text-gray-100 text-sm text-center">
                            모집이 마감되었어요.
                            <br />
                            다음기회에 만나요!
                        </div>
                    </div>
                ) : (
                    <Tag>오늘 12시 마감</Tag>
                )}
            </div>
            <div className="sm:w-3/4 w-full flex flex-col justify-between pt-5.5 sm:gap-0 gap-5">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1 text-sm">
                            <div className="flex gap-2  text-gray-400 items-center">
                                <div className="text-xl font-semibold text-white">
                                    {title}
                                </div>
                                <div className="hidden sm:block">|</div>
                                <div className="font-medium hidden sm:block">
                                    {location}
                                </div>
                            </div>
                            <div className="flex sm:text-white text-gray-400 items-center font-normal gap-2">
                                <div className="font-medium sm:hidden">
                                    {location}
                                </div>
                                <div className="sm:hidden">|</div>
                                {convertedDate}
                            </div>
                        </div>
                        <div className="flex gap-2 text-sm text-gray-400 items-center">
                            <Profile
                                size="small"
                                image={createdUserProfileImg}
                            />
                            <p>{createdUser}</p>
                        </div>
                    </div>
                    <div>
                        <Like like={wishList} />
                    </div>
                </div>
                <ContainerProgress
                    current={currentPerson}
                    max={maxPerson}
                    openStatus={openStatus}
                    deadline={convertedDeadline}
                />
            </div>
        </div>
    );
}
