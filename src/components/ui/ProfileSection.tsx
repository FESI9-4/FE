'use client';

import Button from '@/components/ui/Button';
import Profile from '@/components/ui/Profile';
import { EditNoBgIcon, Heart, ThreeHeart } from '@/assets';
import { useEffect, useState } from 'react';

// 왜 반응형을 조건부 렌더링으로 했냐면 피그마 시안에 있는 div 구조가 아예 바뀌어서...

//TODO 비밀번호 변경 추후 api 연결
//TODO 닉네임 변경 또한 추후 연결

export default function ProfileSection({ onClick }: { onClick: () => void }) {
    const user = {
        id: 'user123',
        nickname: '재형',
        profileImage: 'https://randomuser.me/api/portraits/men/75.jpg',
        description: '안녕하세요 정재형입니다',
    };
    const [isMdUp, setIsMdUp] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMdUp(window.innerWidth >= 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isMdUp) {
        return (
            <>
                <div className="w-full h-55.5 bg-gray-850 p-8 flex flex-col justify-center items-center rounded-t-[20px]">
                    <div className="w-full h-full flex flex-col gap-2">
                        <div className="w-full h-16 flex justify-between">
                            <Profile
                                size="large"
                                image={user?.profileImage || ''}
                            ></Profile>
                            <Button
                                size="small"
                                styled="outline"
                                className="w-39.25  text-white outline-white h-10"
                                onClick={onClick}
                            >
                                비밀번호 변경하기
                            </Button>
                        </div>
                        <div className="h-8 flex items-center overflow-hidden">
                            <p className="text-xl font-semibold h-7 text-white ">
                                {user?.nickname}
                            </p>
                            <div className="w-8 h-8 text-white cursor-pointer hover:text-green-500">
                                <EditNoBgIcon width={32} height={32} />
                            </div>
                        </div>
                        <p className="text-base font-light text-gray-300 h-12  w-full overflow-auto">
                            {user?.description}
                        </p>
                    </div>
                </div>
                <div className="bg-green-400 rounded-b-[20px] w-full h-10 px-8 flex justify-between items-center">
                    <Heart />
                    <ThreeHeart />
                </div>
            </>
        );
    }

    return (
        <div className="w-full h-63  flex flex-col justify-between items-center">
            <div className="h-45 flex flex-col justify-between">
                <div className="h-16 w-full flex items-center gap-4">
                    <Profile size="large" image={user?.profileImage || ''} />
                    <div className="h-8 flex items-center ">
                        <p className="text-lg font-semibold h-7 text-white overflow-hidden">
                            {user?.nickname}
                        </p>
                        <div className="text-white">
                            <EditNoBgIcon width={32} height={32} />
                        </div>
                    </div>
                </div>
                <p className="text-base font-light text-gray-300 h-24  w-full overflow-auto">
                    {user?.description}
                </p>
            </div>

            <Button
                size="large"
                styled="outline"
                className="outline-white text-white w-full h-10"
                onClick={onClick}
            >
                비밀번호 변경하기
            </Button>
        </div>
    );
}
