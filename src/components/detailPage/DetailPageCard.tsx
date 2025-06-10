'use client';

import ContainerInformaiton from '@/components/ui/ContainerInformation';

export default function DetailPageCard() {
    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:px-3 sm:gap-10 gap-6  sm:h-95 sm:items-end bg-amber-600 ">
                <div className="w-full sm:min-w-70 h-65.25 sm:h-full bg-red-400 text-white sm:w-full sm:max-w-75">
                    이미지
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
            <div className="h-6 sm:h-10 xl:h-12 border-gray-800 border-b"></div>
        </div>
    );
}
