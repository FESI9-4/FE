'use client';
import DetailPageComment from './DetailPageComment';
import DetailPageParticipation from './DetailPageParticipation';
import GoogleMap from './GoogleMap';
import { useGetUser } from '@/hooks/queries/useAuth';

interface DetailPageDescriptionProps {
    description: string;
    latitude: number;
    longitude: number;
    articleId: number;
    createUser: string;
}

export default function DetailPageDescription({
    description,
    latitude,
    longitude,
    articleId,
    createUser, // 비교해야지... user...id랑 ㅇㅋㅇㅋ 
}: DetailPageDescriptionProps) {
    const { data: user } = useGetUser();
    console.log(user?.userId) //비교해서 같으면 조건부렌더링을할거고 이건 저 하위에서할거니간 넘겨주기만하면됨. 
    return (
        <div className="xl:flex xl:gap-6 ">
            <div>
                <div className="w-full mt-6 sm:mt-10 xl:mt-12 flex flex-col gap-10 sm:gap-12 px-4 sm:px-6">
                    <p className="w-full flex flex-col gap-3 sm:gap-5">
                        <span className="text-lg font-semibold text-white">
                            상세내용
                        </span>
                        <span className="text-gray-300 text-sm min-w-148">
                            {description}
                        </span>
                    </p>
                    <div className="w-full h-80 flex flex-col gap-3 sm:gap-5">
                        <p className="text-lg font-semibold text-white h-7">
                            장소
                        </p>
                        <div className="w-full h-70 bg-gray-800 rounded-[20px]">
                            <GoogleMap lat={latitude} lng={longitude} />
                        </div>
                    </div>
                </div>
                <DetailPageComment id={articleId} createUser={createUser} />
            </div>
            <DetailPageParticipation articleId={articleId} />
        </div>
    );
}
