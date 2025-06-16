import Image from 'next/image';
import dateConverter from '@/utils/dateConverter';
import Profile from './Profile';
import Tag from './Tag';
import { HandIcon, UserIcon } from '@/assets';
import ChipState from './ChipState';
import { ProgressChip } from '@/components/ui';
import { cva } from 'class-variance-authority';
import Button from './Button';

interface CardListProps {
    title: string;
    location: string;
    date: number;
    currentPerson: number;
    maxPerson: number;
    openStatus: 'waiting' | 'finished' | 'progressing' | 'canceled';
    image: string;
    createUser: string;
    createUserProfileImg: string;
    useStatus: 'UPCOMING' | 'COMPLETED'; 
    buttonOnClick: () => void;
}

export default function CardList({
    title,
    location,
    date,
    currentPerson,
    maxPerson,
    openStatus,
    image,
    createUser,
    createUserProfileImg,
    useStatus,
    buttonOnClick,
}: CardListProps) {
    const convertedDate = dateConverter(date, 'korea');
    const userCountClassName = cva(
        'flex py-3 gap-0.5 text-sm items-center font-medium',
        {
            variants: {
                useStatus: {
                    COMPLETED: '',
                    UPCOMING: '',
                },
                openStatus: {
                    waiting: '',
                    finished: '',
                    progressing: '',
                    canceled: '',
                },
            },
            compoundVariants: [
                {
                    useStatus: ['UPCOMING', 'COMPLETED'],
                    openStatus: 'canceled',
                    className: 'text-gray-600',
                },
                {
                    useStatus: 'COMPLETED',
                    openStatus: ['waiting', 'finished', 'progressing'],
                    className: 'text-gray-600',
                },
                {
                    useStatus: 'UPCOMING',
                    openStatus: ['waiting', 'finished', 'progressing'],
                    className: 'text-white',
                },
            ],
        }
    );

    return (
        <div className="w-full flex flex-col sm:flex-row sm:py-3 sm:pl-3 sm:pr-6 sm:gap-6 gap-0 sm:min-h-67.5 min-h-97">
            <div className="w-full sm:w-1/4 relative h-50 sm:h-auto">
                <Image src={image} alt="image" fill objectFit="cover" />
                {openStatus === 'canceled' ? (
                    <div className="absolute bg-black/50 w-full h-full flex flex-col justify-center items-center gap-6">
                        <HandIcon className="w-8 h-8 text-gray-600 fill-white" />
                        <div className="flex justify-center items-center text-gray-100 text-sm text-center">
                            모집 취소된 펜팔이에요.
                            <br />
                            다음기회에 만나요!
                        </div>
                    </div>
                ) : (
                    <Tag>오늘 12시 마감</Tag>
                )}
            </div>
            <div className="sm:w-3/4 w-full flex flex-col justify-between pt-6 sm:gap-0 gap-5">
                <div className="flex flex-row gap-3 sm:flex-col justify-between items-end sm:items-stretch">
                    <div className="flex sm:h-fit h-7 order-2 sm:order-1">
                        <ChipState status={useStatus}>
                            {useStatus === 'UPCOMING'
                                ? '이용 예정'
                                : '이용 완료'}
                        </ChipState>
                    </div>
                    <div className="flex justify-between sm:flex-row flex-col gap-2 order-1 sm:order-2">
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
                        </div>
                        <div className="flex gap-2 text-sm text-gray-400 items-center font-normal ">
                            <Profile
                                size="small"
                                image={createUserProfileImg}
                            />
                            <div>{createUser}</div>
                        </div>
                    </div>
                </div>

                <div className=" flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
                    <div className="flex gap-3">
                        <div
                            className={userCountClassName({
                                openStatus,
                                useStatus,
                            })}
                        >
                            <UserIcon className="w-4 h-4" />
                            <div>
                                {currentPerson} / {maxPerson}
                            </div>
                        </div>
                        {useStatus === 'UPCOMING' && (
                            <ProgressChip openStatus={openStatus}>
                                개설확정
                            </ProgressChip>
                        )}
                    </div>
                    <div className="flex sm:w-48 w-full">
                        {useStatus === 'UPCOMING' &&
                            (openStatus === 'canceled' ? (
                                <Button
                                    size="large"
                                    styled="outline"
                                    className="outline-white text-white hover:outline-white active:outline-white"
                                    onClick={buttonOnClick}
                                >
                                    삭제하기
                                </Button>
                            ) : (
                                <Button
                                    size="large"
                                    styled="outline"
                                    onClick={buttonOnClick}
                                >
                                    참여 취소하기
                                </Button>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
