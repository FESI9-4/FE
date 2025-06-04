'use client';
import { BigTitleIcon, MikeIcon } from '@/assets';
import { cn } from '@/utils/cn';
interface LoginIllustrationProps {
    className?: string;
}

export default function LeftImg({ className }: LoginIllustrationProps) {
    return (
        <div
            className={cn(
                'flex justify-center items-center px-2 pt-10',
                className
            )}
        >
            <div className="relative w-[375px] h-[276px] sm:w-[300px] sm:h-[318px] xl:w-[471px] xl:h-[534px] xl:flex xl:flex-col xl:gap-10 ">
                <div className="flex flex-col gap-4 sm:justify-center sm:items-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-white text-base font-semibold leading-6  sm:text-center xl:text-2xl xl:leading-8">
                            Let&apos;s Play
                        </h1>
                        <BigTitleIcon className="xl:w-[228px] xl:h-[38px] w-[160px] h-[27px]" />
                    </div>
                    <span className="text-gray-400 text-xs font-light leading-4 sm:text-center xl:hidden">
                        함께하면 즐거운 덕질, <br />
                        팬팔모임에서 같이 즐겨요!
                    </span>
                </div>
                <div className="absolute left-[160px] top-[60px] sm:static flex items-center justify-center w-[210px] h-[140px] sm:w-[300px] sm:h-[200px] xl:w-[471px] xl:h-[320px]">
                    <MikeIcon
                        className="scale-200 origin-center"
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
