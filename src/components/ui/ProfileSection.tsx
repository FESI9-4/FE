import Button from '@/components/ui/Button';
import Profile from '@/components/ui/Profile';

export default function ProfileSection() {
    return (
        <div className="w-85.75 h-63 md:w-249 md:h-56  flex flex-col justify-between items-center ">
            <div className="h-45 flex flex-col justify-between">
                <div className="h-16 w-81.75  flex justify-between">
                    <Profile size="large"></Profile>
                    <div>
                        <p>아이콘도 넣어 중앙정렬도</p>
                    </div>
                </div>
                <p className="text-base font-light text-gray-300 h-24  w-81.75">
                    우리 데식이들 최애 무대는 You Were Beautiful 첫 라이브… 진짜
                    눈물줄줄ㅠ 덕질도 여행도 좋아해서 같이 생일카페, 팝업, 공연
                    가실 분 환영해요 🫶
                </p>
            </div>

            <Button size="large" styled="outline" className="outline-amber-400">
                비밀번호 변경하기
            </Button>
        </div>
    );
}
