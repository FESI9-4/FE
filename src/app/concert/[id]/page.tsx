'use client';

import { Button } from '@/components/ui';
import { getConcertDetail } from '@/utils/apis/concert';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ConcertDetail } from '@/types/concert';

export default function ConcertDetailPage() {
    const { id } = useParams();
    const { data, isLoading, isError } = useQuery<ConcertDetail>({
        queryKey: ['concertDetail', id],
        queryFn: () => getConcertDetail(id as string),
    });
    console.log(data);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div className="pt-25 pb-10 text-white w-full flex justify-center">
            <div className="max-w-[1005px] flex flex-col gap-12">
                <div className="flex gap-10">
                    <div className="relative w-72 h-96">
                        <Image
                            src="https://picsum.photos/200/300"
                            alt="콘서트 이미지"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-col gap-14">
                        <div className="text-2xl font-semibold">
                            콘서트 타이틀
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-3 text-base font-normal">
                                <div className="text-gray-400">공연장소</div>
                                <div className="text-gray-800">|</div>
                                <div>{data?.fcltynm}</div>
                            </div>
                            <div className="flex gap-3 text-base font-normal">
                                <div className="text-gray-400">공연기간</div>
                                <div className="text-gray-800">|</div>
                                <div>
                                    {data?.prfpdfrom} ~ {data?.prfpdto}
                                </div>
                            </div>
                            <div className="flex gap-3 text-base font-normal">
                                <div className="text-gray-400">관람연령</div>
                                <div className="text-gray-800">|</div>
                                <div>{data?.prfage}</div>
                            </div>
                            <div className="flex gap-3 text-base font-normal">
                                <div className="text-gray-400">가격</div>
                                <div className="text-gray-800">|</div>
                                <div>{data?.pcseguidance}</div>
                            </div>
                            <div className="flex gap-3 text-base font-normal">
                                <div className="text-gray-400">예매처</div>
                                <div className="text-gray-800">|</div>
                                <div>{data?.relates.relate[0]?.relatenm}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border-t border-gray-800 " />
                <div className="flex gap-8">
                    <div className="relative w-[690px] h-[1068px]">
                        <Image
                            src="https://picsum.photos/200/300"
                            alt="콘서트 이미지"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div>
                        <Button size="large">예매처 바로가기</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
