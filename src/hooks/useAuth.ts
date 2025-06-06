import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';
//TODO 추후에 NEXTAuth로 대체 ? Nav에서 임시 사용

export default function useAuth() {
    const { user, accessToken } = useAuthStore((state) => state);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(user && accessToken ? true : false);
        // console.log('🔥 isLoggedIn', isLoggedIn);
    }, [user, accessToken, isLoggedIn]);
    return { isLoggedIn, user, accessToken };
}
