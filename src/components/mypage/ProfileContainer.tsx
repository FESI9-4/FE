'use client';

import { ProfileSection } from '@/components/ui';
import { useState } from 'react';
import PasswordModal from '../ui/Modal/PasswordModal';

export default function ProfileContainer() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = () => {
        console.log('submit');
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="text-2xl font-semibold text-white">마이페이지</div>
            <div>
                <ProfileSection onClick={handleOpen} />
                {isOpen && (
                    <PasswordModal
                        onClose={handleClose}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </div>
    );
}
