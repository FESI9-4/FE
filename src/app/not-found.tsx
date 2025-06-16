import { MikeIcon } from '@/assets';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404 - 페이지를 찾을 수 없습니다',
    description: '요청하신 페이지가 존재하지 않습니다.',
};
export default function NotFound404() {
    return (
        <div className="h-screen flex w-full justify-center items-center">
            <div className="w-[300px] sm:w-[460px] flex flex-col gap-10 sm:gap-12">
                <div className="relative">
                    <div className="w-[300px] sm:w-[460px] relative z-20  scale-175 sm:scale-190 sm:bottom-[18px] sm:left-[5px]">
                        <MikeIcon />
                    </div>
                    <h1 className="z-0 absolute top-[173px] sm:top-[260px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-850 text-[110px] sm:text-[160px] leading-8 font-black">
                        404
                    </h1>
                </div>
                <div className="flex flex-col gap-3 text-center truncate">
                    <h1 className="text-xl sm:text-2xl font-semibold leading-7 text-gray-50 ">
                        요청하신 페이지를 찾을 수 없습니다
                    </h1>
                    <div className="flex flex-col text-gray-500 text-sm sm:text-base">
                        <span>
                            페이지의 주소가 변경 혹은 삭제되었을 수 있습니다
                        </span>
                        <span>입력하신 주소를 다시 확인해주세요</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
