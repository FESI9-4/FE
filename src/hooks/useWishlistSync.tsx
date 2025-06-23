// 3. 수정된 useWishlistSync 훅
'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useWishlistStore } from '@/store/wishlistStore';
import { wishLikeApi } from '@/utils/apis/likeApi';
import { useGetUser } from '@/hooks/queries/useAuth';

export const useWishlistSync = () => {
    const getPendingLikes = useWishlistStore((state) => state.getPendingLikes);
    const isInitialized = useWishlistStore((state) => state.isInitialized);
    const setInitialized = useWishlistStore((state) => state.setInitialized);
    const setLoading = useWishlistStore((state) => state.setLoading);
    const initializeWithServer = useWishlistStore((state) => state.initializeWithServer);

    // 로그인 시 호출할 함수 - 완전히 새로운 접근 방식
    const handleLogin = useCallback(async () => {
        if (isInitialized) return; // 이미 초기화된 경우 중복 실행 방지

        setLoading(true);

        try {
            // 1. 서버에서 현재 사용자의 찜 목록 가져오기
            const serverLikedIds = await wishLikeApi.getMyLikes(); // 이 API가 있다고 가정
            
            // 2. 로컬에 저장된 찜 목록 가져오기
            const localLikedIds = getPendingLikes();
            
            // 3. 로컬에만 있는 항목들 (서버에 아직 없는 항목들) 찾기
            const localOnlyIds = localLikedIds.filter(
                id => !serverLikedIds.includes(id)
            );
            
            // 4. 로컬에만 있는 항목들을 서버에 동기화
            if (localOnlyIds.length > 0) {
                await wishLikeApi.like(localOnlyIds);
                console.log('로컬 찜 목록을 서버에 동기화:', localOnlyIds);
            }
            
            // 5. 서버 데이터로 로컬 상태 초기화 (로컬 데이터도 고려)
            const finalLikedIds = [...new Set([...serverLikedIds, ...localOnlyIds])];
            initializeWithServer(finalLikedIds);
            
        } catch (error) {
            console.error('찜 목록 동기화 실패:', error);
            
            // API 호출 실패 시 대체 로직
            // getMyLikes API가 없거나 실패한 경우, 로컬 데이터만으로 초기화
            try {
                const localLikedIds = getPendingLikes();
                if (localLikedIds.length > 0) {
                    // 로컬 데이터를 서버에 전송만 시도
                    await wishLikeApi.like(localLikedIds);
                }
                setInitialized(true);
            } catch (secondError) {
                console.error('로컬 데이터 동기화도 실패:', secondError);
                // 완전히 실패한 경우에도 초기화는 진행
                setInitialized(true);
            }
        } finally {
            setLoading(false);
        }
    }, [isInitialized, getPendingLikes, setInitialized, setLoading, initializeWithServer]);

    // 로그아웃 시 호출할 함수
    const handleLogout = useCallback(() => {
        // 로그아웃 시에는 초기화 상태만 리셋 (로컬 찜 목록은 유지)
        setInitialized(false);
    }, [setInitialized]);

    return {
        handleLogin,
        handleLogout,
        isInitialized,
    };
};

// 4. WishlistAuthSync 컴포넌트는 기존과 동일
export const WishlistAuthSync = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { data: user, isLoading } = useGetUser();
    const { handleLogin, handleLogout, isInitialized } = useWishlistSync();
    const prevUser = useRef<typeof user | null>(null);

    useEffect(() => {
        if (isLoading) return;

        // user가 유효한 로그인 상태인지 확인
        const isLoggedIn = user && !!user.nickName;
        const wasLoggedIn = prevUser.current && !!prevUser.current.nickName;

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
