import Button from '@/components/ui/Button';
import Profile from '@/components/ui/Profile';
import { EditNoBgIcon } from '@/assets';
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

// 왜 반응형을 조건부 렌더링으로 했냐면 피그마 시안에 있는 div 구조가 아예 바뀌어서...

//TODO 비밀번호 변경 추후 api 연결
//TODO 닉네임 변경 또한 추후 연결
export default function ProfileSection() {
    const { user } = useAuth();
    const [isMdUp, setIsMdUp] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMdUp(window.innerWidth >= 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // bg-gray-850 ??? 일단 #..
    if (isMdUp) {
        return (
            <div className="w-full h-56 bg-[#222326] p-8 flex flex-col justify-center items-center rounded-[20px]">
                <div className="w-full h-full flex flex-col gap-2  ">
                    <div className="w-full h-16 flex justify-between">
                        <Profile
                            size="large"
                            image={user?.profileImage || ''}
                        ></Profile>
                        <Button
                            size="large"
                            styled="outline"
                            className="w-39.25  text-white outline-white h-10"
                        >
                            비밀번호 변경하기
                        </Button>
                    </div>
                    <div className="h-8 w-27.5  flex items-center justify-between">
                        <p className="text-xl font-semibold h-7 text-white ">
                            데식이들
                        </p>
                        <EditNoBgIcon className="w-8 h-8 text-white"></EditNoBgIcon>
                    </div>
                    <p className="text-base font-light text-gray-300 h-12  w-full">
                        우리 데식이들 최애 무대는 You Were Beautiful 첫 라이브…
                        진짜 눈물줄줄ㅠ 덕질도 여행도 좋아해서 같이 생일카페,
                        팝업, 공연 가실 분 환영해요 🫶
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-63  flex flex-col justify-between items-center bg-amber-300 ">
            <div className="h-45 flex flex-col justify-between">
                <div className="h-16 w-81.75  flex justify-between items-center">
                    <Profile
                        size="large"
                        image={user?.profileImage || ''}
                    ></Profile>
                    <div className="h-8 w-61.75  flex items-center justify-between">
                        <p className="text-lg font-semibold h-7 text-white ">
                            데식이들
                        </p>
                        <EditNoBgIcon className="w-8 h-8 text-white"></EditNoBgIcon>
                    </div>
                </div>
                <p className="text-base font-light text-gray-300 h-24  w-81.75">
                    우리 데식이들 최애 무대는 You Were Beautiful 첫 라이브… 진짜
                    눈물줄줄ㅠ 덕질도 여행도 좋아해서 같이 생일카페, 팝업, 공연
                    가실 분 환영해요 🫶
                </p>
            </div>

            <Button
                size="large"
                styled="outline"
                className="outline-white text-white w-full h-10"
            >
                비밀번호 변경하기
            </Button>
        </div>
    );
}
