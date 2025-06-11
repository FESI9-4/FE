'use client';

import { Button, Like } from '@/components/ui';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

export default function DetailPageParticipation() {
    const isDesktop = useMediaQuery('(min-width: 1279px)');
    const isTablet = useMediaQuery('(min-width: 640px)');

    return (
        <div
            className={cn(
                'w-full bg-[#1A1B1FCC] px-5 pt-3 pb-4 gap-5.25 sm:px-6 sm:pt-5 sm:pb-7 mt-6 sm:mt-10 xl:mt-12 xl:w-70.5 xl:h-29 xl:pt-0 xl:pb-0 xl:px-0',
                isDesktop ? 'relative h-24' : 'fixed bottom-0 left-0 z-50 h-19'
            )}
        >
            {isTablet ? (
                <div className="flex w-full gap-33 xl:flex-col-reverse xl:gap-6">
                    <p className="flex flex-col w-70.5 h-full gap-1 whitespace-nowrap">
                        <span className="text-base font-semibold text-gray-200">
                            함께하면 더 즐거운 팬활동 💚
                        </span>
                        <span className="text-xs font-medium text-gray-500">
                            같은 마음으로 움직이는 팬들과 함께라면 훨씬 든든해요
                        </span>
                    </p>
                    <Button>참여하기</Button>
                </div>
            ) : (
                <div className="flex justify-between items-center px-4 gap-5.25">
                    <Like />
                    <Button>참여하기</Button>
                </div>
            )}
        </div>
    );
}
