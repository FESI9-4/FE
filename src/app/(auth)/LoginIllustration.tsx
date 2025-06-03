'use client';
import { BigTitleIcon, MikeIcon } from '@/assets';
export default function LeftImg() {
    return (
        <div className="flex justify-center items-center">
            <div className="relative w-[375px] h-[276px] md:w-[300px] md:h-[318px] xl:w-[471px] xl:h-[534px] xl:flex xl:flex-col xl:gap-10 ">
                <div className="flex flex-col gap-4 md:justify-center md:items-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-white text-base font-semibold leading-6  md:text-center xl:text-2xl xl:leading-8">
                            Let&apos;s Play
                        </h1>
                        <BigTitleIcon className="xl:w-[228px] xl:h-[38px] w-[160px] h-[27px]" />
                    </div>
                    <span className="text-gray-400 text-xs font-light leading-4 md:text-center xl:hidden">
                        함께하면 즐거운 덕질, <br />
                        팬팔모임에서 같이 즐겨요!
                    </span>
                </div>
                <div className="md:relative xl:static xl:h-[320px]">
                    <MikeIcon
                        className="absolute top-0 left-10 md:left-[-160px] md:top-[-110px] xl:left-[-200px]
                    w-[375px] h-[276px] xl:w-[871px] xl:h-[680px] md:w-[626px] md:h-[435px]"
                        viewBox="0 0 871 680"
                    />
                </div>
                <div>
                    <span className="text-gray-50 text-base font-normal leading-6 hidden xl:block text-center">
                        함께하면 즐거운 덕질, <br />
                        팬팔모임에서 같이 즐겨요!
                    </span>
                </div>
            </div>
        </div>
    );
}
