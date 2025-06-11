'use client';
import DetailPageComment from './DetailPageComment';
import DetailPageParticipation from './DetailPageParticipation';
import GoogleMap from './GoogleMap';

// 상세내용 , 장소 위도 경도 넘겨주기
export default function DetailPageDescription() {
    return (
        <div className="xl:flex xl:gap-6">
            <div>
                <div className="w-full mt-6 sm:mt-10 xl:mt-12 flex flex-col gap-10 sm:gap-12 px-4 sm:px-6">
                    <p className=" w-full flex flex-col gap-3 sm:gap-5">
                        <span className="text-lg font-semibold text-white">
                            상세내용
                        </span>
                        <span className="text-gray-300 text-sm">
                            2025년 1월 7일 콘서트 가시는 분들!저 포함해서 몇몇
                            분이랑 을지로3가에서 버스 대절해서 같이 가려고 해요
                            버스 인원 때문에 20명까지만 모집합니다 유의사항
                            출발은 정시에 진행되므로, 오후 2시 30분까지 꼭
                            도착해주세요. 버스는 편도만 운영되며, 공연 종료 후
                            귀가는 개별로 진행해주셔야 해요.
                        </span>
                    </p>
                    <div className=" w-full h-80 flex flex-col gap-3 sm:gap-5">
                        <p className="text-lg font-semibold text-white h-7">
                            장소
                        </p>
                        <div className="w-full h-70 bg-gray-800 rounded-[20px]">
                            <GoogleMap lat={37.5665} lng={126.978} />
                        </div>
                    </div>
                </div>
                <DetailPageComment />
            </div>
            <DetailPageParticipation />
        </div>
    );
}
