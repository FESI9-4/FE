'use client';

import ContainerInformaiton from '@/components/ui/ContainerInformation';
import Image from 'next/image';

//Image 경로로 받고  나머지도 ...  커멘트 컴포넌트는?

export default function DetailPageCard() {
    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:px-3 sm:gap-10 gap-6  sm:h-95 sm:items-end  ">
                <div className="relative w-full sm:min-w-70 h-65.25 sm:h-full text-white sm:w-full sm:max-w-75 bg-amber-200">
                    <Image
                        src="/images/Rectangle 6189.svg"
                        alt="preview"
                        fill
                        className="object-cover"
                    />
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
