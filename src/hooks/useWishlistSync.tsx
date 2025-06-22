"use client";

import { useRef, useEffect } from 'react';
import { useWishlistStore } from '@/store/wishlistStore';
import { wishLikeApi } from '@/utils/apis/likeApi';
import { useGetUser } from '@/hooks/queries/useAuth';

export const useWishlistSync = () => {
    const getPendingLikes = useWishlistStore((state) => state.getPendingLikes);
    const reset = useWishlistStore((state) => state.reset);
    const isInitialized = useWishlistStore((state) => state.isInitialized);
    const setInitialized = useWishlistStore((state) => state.setInitialized);

    // 로그인 시 호출할 함수
    const handleLogin = async () => {
        if (isInitialized) return; // 이미 초기화된 경우 중복 실행 방지

        try {
            // 1. 로컬에 있는 찜 목록 가져오기
            const pendingLikes = getPendingLikes();
            
            // 2. 로컬에 찜한 항목이 있다면 서버에 전송
            if (pendingLikes.length > 0) {
                await wishLikeApi.like(pendingLikes);
            }
            
            // 3. 서버로부터 사용자의 찜 목록을 가져와서 동기화 (선택사항)
            // const serverWishlist = await wishLikeApi.getUserWishlist();
            // syncWithServer(serverWishlist.data);
            
            setInitialized(true);
        } catch (error) {
            console.error('찜 목록 동기화 실패:', error);
        }
    };

    // 로그아웃 시 호출할 함수
    const handleLogout = () => {
        reset(); // 로컬 찜 목록 초기화
    };

    return {
        handleLogin,
        handleLogout,
        isInitialized,
    };
};

// 전역 인증 상태 관리 컴포넌트
export const WishlistAuthSync = ({ children }: { children: React.ReactNode }) => {
    const { data: user, isLoading } = useGetUser();
    const { handleLogin, handleLogout, isInitialized } = useWishlistSync();
    const prevUser = useRef<typeof user | null>(null);

    useEffect(() => {
        if (isLoading) return;

        // user가 유효한 로그인 상태인지 확인 (예: id 필드 존재 여부)
        const isLoggedIn = user && !!user.userId;
        const wasLoggedIn = prevUser.current && !!prevUser.current.userId;

        // 로그인 처리: 이전에 비로그인 상태였다가 현재 로그인 상태인 경우
        if (isLoggedIn && !wasLoggedIn && !isInitialized) {
            handleLogin();
        }

        // 로그아웃 처리: 이전에 로그인 상태였다가 현재 비로그인 상태인 경우
        if (!isLoggedIn && wasLoggedIn) {
            handleLogout();
        }

        prevUser.current = user || null;
    }, [user, isLoading, isInitialized, handleLogin, handleLogout]);

    return <>{children}</>;
};
