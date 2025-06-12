'use client';

import ContainerInformaiton from '@/components/ui/ContainerInformation';
import Image from 'next/image';
import { HandIcon } from '@/assets';
import Tag from '@/components/ui/Tag';
// Image 경로로 받게 수정하고
// 가져온 데이터가 CONFIRMED - 개설확정 PENDING - 개설대기 CANCELED - 개설취소 ... 라는데  확정이면 이미지 처리 해주기
// 근데 우리 시안엔 취소가없으니 캔슬이 아니라.. . 마감으로 ...  openStatus: 'waiting' | 'finished' | 'progressing'; 로 바꿔달라고 요청 대기 확정 마감
// mockData.ts (혹은 테스트용 파일 내)

export const mockFinishedArticle = {
    title: '마감된 게시글입니다',
    location: '서울 강남역',
    latitude: 37.4979,
    longitude: 127.0276,
    description: '함께 디저트 투어하실 분 구했어요!',
    date: '2025-06-20T12:00:00.000+00:00',
    deadLine: '2025-06-20T12:00:00.000+00:00',
    createdAt: '2025-06-01T09:00:00.000+00:00',
    min_person: 3,
    currentPerson: 3,
    maxPerson: 5,
    participants: [
        { name: '유재석', image: 'https://picsum.photos/40?random=1' },
        { name: '박명수', image: 'https://picsum.photos/40?random=2' },
        { name: '정준하', image: 'https://picsum.photos/40?random=3' },
    ],
    wishList: false,
    article_image_url: 'https://picsum.photos/400/300?random=10', // ✅ 랜덤 이미지
    openStatus: 'finished', // ✅ 마감 상태
    useStatus: 'expected',
};

export default function DetailPageCard() {
    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:px-3 sm:gap-10 gap-6  sm:h-95 sm:items-end  ">
                <div className="relative w-full sm:min-w-70 h-65.25 sm:h-full text-white sm:w-full sm:max-w-75 bg-amber-200">
                    <Image
                        src={mockFinishedArticle.article_image_url}
                        alt="image"
                        fill
                        objectFit="cover"
                    />
                    {mockFinishedArticle.openStatus === 'finished' ? (
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
                        create_user="정재형"
                        title="모집 대기 중인 버스"
                        location="양평에서"
                        date="1748385600"
                        limitedDate="1748639999"
                        minPerson={10}
                        maxPerson={20}
                        currentPerson={5}
                        wishList={true}
                        articleId={3}
                    />
                </div>
            </div>
            <div className="h-6 sm:h-10 xl:h-12 px-4 sm:px-0">
                <div className=" h-full w-full border-gray-800 border-b"></div>
            </div>
        </div>
    );
}
