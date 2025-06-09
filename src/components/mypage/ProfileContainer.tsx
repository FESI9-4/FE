'use client';

import { ProfileSection } from '@/components/ui';
import { useState } from 'react';
import PasswordModal from '../ui/Modal/PasswordModal';
import EditProfileModal from '../ui/Modal/ProfileModal';

export default function ProfileContainer() {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

    const handleOpenPasswordModal = () => {
        setIsPasswordModalOpen(true);
    };

    const handleOpenEditProfileModal = () => {
        setIsEditProfileModalOpen(true);
    };

    const handleClosePasswordModal = () => {
        setIsPasswordModalOpen(false);
    };

    const handleCloseEditProfileModal = () => {
        setIsEditProfileModalOpen(false);
    };

    const handleSubmitPasswordModal = () => {
        console.log('submit');
        setIsPasswordModalOpen(false);
    };

    const handleSubmitEditProfileModal = () => {
        console.log('submit');
        setIsEditProfileModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="text-2xl font-semibold text-white">마이페이지</div>
            <div>
                <ProfileSection
                    handlePasswordModal={handleOpenPasswordModal}
                    handleEditProfileModal={handleOpenEditProfileModal}
                />
                {isPasswordModalOpen && (
                    <PasswordModal
                        onClose={handleClosePasswordModal}
                        onSubmit={handleSubmitPasswordModal}
                    />
                )}
                {isEditProfileModalOpen && (
                    <EditProfileModal
                        onClose={handleCloseEditProfileModal}
                        onSubmit={handleSubmitEditProfileModal}
                    />
                )}
            </div>
        </div>
    );
}
