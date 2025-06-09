import { ProfileSection } from '@/components/ui';

export default function ProfileContainer() {
    return (
        <div className="flex flex-col gap-5">
            <div className="text-2xl font-semibold text-white">마이페이지</div>
            <div>
                <ProfileSection />
            </div>
        </div>
    );
}
