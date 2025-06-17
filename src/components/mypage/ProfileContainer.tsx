'use client';

import { ProfileSection } from '@/components/ui';
import { useState } from 'react';
import PasswordModal from '../ui/Modal/PasswordModal';
import EditProfileModal from '../ui/Modal/ProfileModal';
import { mypageApi } from '@/utils/apis/mypage';
import { useQueryClient } from '@tanstack/react-query';

export default function ProfileContainer() {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const queryClient = useQueryClient();

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

    const handleSubmitPasswordModal = (data: {
        currentPassword: string;
        newPassword: string;
    }) => {
        console.log('submit');
        setIsPasswordModalOpen(false);
        mypageApi.changePassword({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        });
    };

    const handleSubmitEditProfileModal = (data: {
        nickname: string;
        profileImage?: File;
        description?: string;
    }) => {
        console.log('submit');
        setIsEditProfileModalOpen(false);
        mypageApi.changeProfile({
            nickname: data.nickname,
            profileImage: data.profileImage,
            description: data.description,
        });
        queryClient.invalidateQueries({ queryKey: ['user'] });
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
