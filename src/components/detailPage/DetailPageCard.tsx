'use client';

import ContainerInformaiton from '@/components/ui/ContainerInformation';
import Image from 'next/image';
import { HandIcon } from '@/assets';
import Tag from '@/components/ui/Tag';

interface DetailPageCardProps {
    articleImageUrl: string;
    openStatus: 'waiting' | 'finished' | 'progressing' | 'canceled';
    createUser: string;
    createUserProfileImgUrl: string;
    title: string;
    location: string;
    date: number;
    deadLine: number;
    minPerson: number;
    maxPerson: number;
    currentPerson: number;
    wishList: boolean;
    articleId: number;
}

export default function DetailPageCard({
    articleImageUrl,
    openStatus,
    createUser,
    createUserProfileImgUrl,
    title,
    location,
    date,
    deadLine,
    minPerson,
    maxPerson,
    currentPerson,
    wishList,
    articleId,
}: DetailPageCardProps) {
    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:px-3 sm:gap-10 gap-6 sm:h-95 sm:items-end">
                <div className="relative w-full sm:min-w-70 h-65.25 sm:h-full text-white sm:w-full sm:max-w-75 bg-amber-200">
                    <Image
                        src={articleImageUrl}
                        alt="article image"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
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
                <div className="px-3 h-56.7 sm:w-full sm:h-85">
                    <ContainerInformaiton
                        createUser={createUser}
                        createUserProfileImgUrl={createUserProfileImgUrl}
                        title={title}
                        location={location}
                        date={date}
                        deadLine={deadLine}
                        minPerson={minPerson}
                        maxPerson={maxPerson}
                        currentPerson={currentPerson}
                        wishList={wishList}
                        articleId={articleId}
                        openStatus={openStatus}
                    />
                </div>
            </div>
            <div className="h-6 sm:h-10 xl:h-12 px-4 sm:px-0">
                <div className="h-full w-full border-gray-800 border-b"></div>
            </div>
        </div>
    );
}
