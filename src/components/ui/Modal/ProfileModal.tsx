'use client';

import BaseModal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Profile from '@/components/ui/Profile';
import useAuth from '@/hooks/useAuth';

interface EditProfileModalProps {
    onClose: () => void;
    onSubmit: () => void;
}

export default function EditProfileModal({
    onClose,
    onSubmit,
}: EditProfileModalProps) {
    const { user } = useAuth();

    return (
        <BaseModal onClose={onClose}>
            <div className="w-85.75 h-82 md:w-130 md:h-84 flex items-center justify-center">
                <div className="w-73.75 h-70 md:w-118 md:h-72 flex flex-col gap-6">
                    <div className="flex justify-between h-7 w-full items-center">
                        <p className="text-lg font-semibold">프로필 수정하기</p>
                    </div>
                    <div className="flex flex-col gap-6 h-41">
                        <div>
                            <Profile
                                size="large"
                                edit={true}
                                image={user?.profileImage || ''}
                            />
                        </div>
                        <div className="h-19">
                            <p className="text-base font-semibold">닉네임</p>
                            <Input type="text" id="text" />
                        </div>
                    </div>
                    <div className="flex gap-3 h-10 md:h-12">
                        <Button size="large" onClick={onClose} styled="outline">
                            취소
                        </Button>
                        <Button size="large" onClick={onSubmit} styled="solid">
                            수정하기
                        </Button>
                    </div>
                </div>
            </div>
        </BaseModal>
    );
}
