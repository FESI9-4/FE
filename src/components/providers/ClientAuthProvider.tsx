'use client';

import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

interface ClientAuthProviderProps {
    hasRefreshToken: boolean;
    initialAccessToken?: string;
    children: React.ReactNode;
}

export const ClientAuthProvider = ({
    hasRefreshToken,
    initialAccessToken,
    children,
}: ClientAuthProviderProps) => {
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const setHasRefreshToken = useAuthStore(
        (state) => state.setHasRefreshToken
    );
    useEffect(() => {
        if (initialAccessToken) {
            setAccessToken(initialAccessToken);
        }
        if (hasRefreshToken) {
            setHasRefreshToken(true);
        }
    }, [
        initialAccessToken,
        setAccessToken,
        hasRefreshToken,
        setHasRefreshToken,
    ]);

    return <>{children}</>;
};
