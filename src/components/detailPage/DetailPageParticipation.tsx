'use client';

import { useState } from 'react';
import { Button, Like } from '@/components/ui';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';
import LoginModal from '@/components/ui/Modal/LoginModal';
import { useFanFalMutations } from '@/hooks/queries/useFanFalMutations';
import { useGetUser } from '@/hooks/queries/useAuth';

interface DetailPageParticipationProps {
    articleId: number;
    createUser: string;
}

export default function DetailPageParticipation({
    articleId,
    createUser,
}: DetailPageParticipationProps) {
    const isDesktop = useMediaQuery('(min-width: 1279px)');
    const isTablet = useMediaQuery('(min-width: 640px)');
    const [isParticipated, setIsParticipated] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { joinMutation, cancelMutation } = useFanFalMutations();
    const { data: user } = useGetUser();
    const isLoggedIn = Boolean(user); // isLoggedin 훅 만들어도 좋을듯합니다

    // 팬팔 취소하기 공유하기 버튼있는데 취소하기 api 없어도 됨 ?

    const handleParticipateClick = () => {
        if (!isLoggedIn) {
            setIsLoginModalOpen(true);
            return;
        }

        if (isParticipated) {
            cancelMutation.mutate(articleId, {
                onSuccess: () => setIsParticipated(false),
                onError: (error: unknown) => {
                    if (error instanceof Error) alert(error.message);
                    else alert('참여 취소 실패');
                },
            });
        } else {
            joinMutation.mutate(articleId, {
                onSuccess: () => setIsParticipated(true),
                onError: (error: unknown) => {
                    if (error instanceof Error) alert(error.message);
                    else alert('참여 실패');
                },
            });
        }
    };
    // user.nickname이 createId랑 같으면 조건부 렌더링을 할거임 어느파트를 ? 참여하기 버튼부분을 취소하기와 공유하기 버튼을 ㅅ
    const isAdmin = user?.nickname === createUser;
    //

    return (
        <>
            <div
                className={cn(
                    'w-full bg-[#1A1B1FCC] px-5 pt-3 pb-4 gap-5.25 sm:px-6 sm:pt-5 sm:pb-7 mt-6 sm:mt-10 xl:mt-12 xl:w-70.5 xl:h-29 xl:pt-0 xl:pb-0 xl:px-0',
                    isDesktop
                        ? 'relative h-24'
                        : 'fixed bottom-0 left-0 z-50 h-19'
                )}
            >
                {isTablet ? (
                    <div className="flex w-full gap-33 xl:flex-col-reverse xl:gap-6 justify-between ">
                        <p className="flex flex-col w-70.5 h-full gap-1 whitespace-nowrap">
                            <span className="text-base font-semibold text-gray-200">
                                함께하면 더 즐거운 팬활동 💚
                            </span>
                            <span className="text-xs font-medium text-gray-500">
                                같은 마음으로 움직이는 팬들과 함께라면 훨씬
                                든든해요
                            </span>
                        </p>
                        {isAdmin ? (
                            isDesktop ? (
                                <div className="flex flex-col gap-3">
                                    <Button styled="outline">공유하기</Button>
                                    <Button>취소하기</Button>
                                </div>
                            ) : (
                                <div className="flex gap-2 w-80.5">
                                    <Button>취소하기</Button>
                                    <Button styled="outline">공유하기</Button>
                                </div>
                            )
                        ) : (
                            <Button
                                onClick={handleParticipateClick}
                                styled={isParticipated ? 'outline' : 'solid'}
                                disabled={
                                    joinMutation.isPending ||
                                    cancelMutation.isPending
                                }
                            >
                                {isParticipated ? '참여 취소하기' : '참여하기'}
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="flex justify-between items-center px-4 gap-5.25">
                        <Like />
                        {isAdmin ? (
                            <div className="flex gap-2 ">
                                <Button>취소하기</Button>
                                <Button styled="outline">공유하기</Button>
                            </div>
                        ) : (
                            <Button
                                onClick={handleParticipateClick}
                                styled={isParticipated ? 'outline' : 'solid'}
                                disabled={
                                    joinMutation.isPending ||
                                    cancelMutation.isPending
                                }
                            >
                                {isParticipated ? '취소하기' : '참여하기'}
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {isLoginModalOpen && (
                <LoginModal onClose={() => setIsLoginModalOpen(false)} />
            )}
        </>
    );
}
