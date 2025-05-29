import { ProfileIcon, LikeIcon } from '@/assets/index';
import ContainerProgress from './ContainerProgress';

// 모바일은 하트가 존재하지않음
// 테블릿부턴 또 있음
export default function containerInformaiton({}) {
    return (
        <div className="w-full px-2 md:px-0 h-71 md:h-85  flex flex-col gap-7 md:justify-between bg-gray-900 min-w-86">
            <div className="h-43  flex flex-col justify-between md:h-48">
                <div className="h-23 md:h-24  flex flex-col gap-2 md:gap-3">
                    <div className=" flex flex-col h-15 gap-1 ">
                        <div className="flex justify-between items-center h-8">
                            <span className="text-2xl font-semibold h-8">
                                데이식스 콘서트 버스 대절
                            </span>
                            <LikeIcon
                                width={24}
                                height={24}
                                className="hidden md:inline-block  m-2"
                            ></LikeIcon>
                        </div>
                        <span className="text-base font-normal text-gray-300 h-6 ">
                            을지로 3가 서울시 중구 청계천로 100
                        </span>
                    </div>
                    <div className="h-6 flex gap-2 items-center ">
                        <ProfileIcon width={32} height={32} />
                        <span className="h-5">데식이들</span>
                    </div>
                </div>
                <div className="h-13 md:h-14  flex flex-col gap-1 md:gap-2">
                    <div className="h-6 flex items-center">
                        <span className="w-14 text-base font-normal text-gray-400">
                            진행일시
                        </span>
                        <div className="w-0.5 h-3.5 ml-2.5 mr-2 bg-gray-800" />

                        <span className="text-base font-normal">
                            2025년 1월 7일 12:00
                        </span>
                    </div>
                    <div className="h-6 flex items-center">
                        <span className="w-14 text-base font-normal text-green-400">
                            모집마감
                        </span>
                        <div className="w-0.5 h-3.5 ml-2.5 mr-2 bg-gray-800" />

                        <span className="text-base font-normal">
                            2025년 1월 7일 12:00
                        </span>
                    </div>
                </div>
            </div>
            <div className="h-21 md:h-20 flex flex-col gap-3">
                <div className="h-10 ">
                    <ContainerProgress
                        max={20}
                        current={18}
                        openStatus="progressing"
                        deadline="2025.06.30"
                    ></ContainerProgress>
                </div>
                <div className="h-4 flex items-center justify-between text-sm font-medium text-gray-500">
                    <span className="">최소인원 5명</span>
                    <span>최대인원 10명</span>
                </div>
            </div>
        </div>
    );
}
