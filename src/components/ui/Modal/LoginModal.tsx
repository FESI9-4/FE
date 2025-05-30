'use client';

import BaseModal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

interface LoginModalProps {
    onClose: () => void;
    
}

export default function LoginModal({ onClose }: LoginModalProps) {
    const router = useRouter();

    const handleSubmit = () => {
        router.push('/login');
    };
    return (
        <BaseModal onClose={onClose}>
            <div className="w-75 h-45 md:w-105 md:h-52.5 flex items-center justify-center">
                <div className="w-63 h-30 md:w-91 md:h-34 flex flex-col gap-6 md:gap-7">
                    <div className="flex flex-col gap-6 h-41">
                        <div className="h-14 md:h-15 flex flex-col gap-1 md:gap-2">
                            <p className="text-white text-lg font-semibold flex justify-center">
                                로그인이 필요해요
                            </p>
                            <p className="text-gray-400 text-base font-light flex justify-center">
                                지금 로그인하고 팬판에 참여해보세요!
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 h-10 md:h-12">
                        <Button size="large" onClick={onClose} styled="outline">
                            취소
                        </Button>
                        <Button size="large" onClick={handleSubmit}>
                            확인
                        </Button>
                    </div>
                </div>
            </div>
        </BaseModal>
    );
}
