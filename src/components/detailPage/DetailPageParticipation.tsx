'use client';
import { Button, Like } from '@/components/ui';
import useMediaQuery from '@/hooks/useMediaQuery';

export default function DetailPagePaparticipateion() {
    const isTablet = useMediaQuery(
        '(min-width: 640px)'
    );
    return (
        <div className="w-full h-19 flex  bg-blue-500 sm:h-24  px-5 pt-3 pb-4 gap-5.25 sm:px-6 sm:pt-5 sm:pb-7 ">
            {isTablet ? (
                <div className='flex w-full gap-33 xl:flex-col-reverse'>
                    <p className='flex flex-col w-70.5 h-full gap-1 bg-blue-800 whitespace-nowrap'>
                        <span className='text-base font-semibold text-gray-200'>함께하면 더 즐거운 팬활동 💚</span>
                        <span className='text-xs font-medium text-gray-500'>같은 마음으로 움직이는 팬들과 함께라면 훨씬 든든해요</span>
                    </p>
                    <Button>참여하기</Button>
                </div>
            ) : (
                <>
                    <Like></Like>
                    <Button>참여하기</Button>
                </>
            )}
        </div>
    );
}
