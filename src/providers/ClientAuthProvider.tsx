'use client';

import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

interface ClientAuthProviderProps {
    initialAccessToken?: string;
    children: React.ReactNode;
}

export const ClientAuthProvider = ({
    initialAccessToken,
    children,
}: ClientAuthProviderProps) => {
    const { user, accessToken, setAccessToken } = useAuthStore();

    useEffect(() => {
        //console.log('🔥 initialAccessToken', initialAccessToken);
        // 🎯 단순하게: 유저 있고 토큰 없고 쿠키에 토큰 있으면 복원만
        if (user && !accessToken && initialAccessToken) {
            setAccessToken({ token: initialAccessToken });
            console.log('✅ accessToken 토큰 복원 완료');
        }
    }, [user, accessToken, initialAccessToken, setAccessToken]);
    return <>{children}</>;
};
