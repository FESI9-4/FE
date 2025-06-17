import { ProfileContainer, TabContainer } from '@/components/mypage';

export default function Mypage() {
    return (
        <div className="flex justify-center items-center px-6 pb-11 pt-26 overflow-auto w-full">
            <div className="w-full max-w-249 flex flex-col gap-11">
                <ProfileContainer />
                <TabContainer />
            </div>
        </div>
    );
}
