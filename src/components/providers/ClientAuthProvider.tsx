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
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    useEffect(() => {
        if (initialAccessToken) {
            setAccessToken(initialAccessToken);
        }
    }, [initialAccessToken, setAccessToken]);

    return <>{children}</>;
};
