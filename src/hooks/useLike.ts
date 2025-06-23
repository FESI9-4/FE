"use client"
import { useWishlistStore } from '@/store/wishlistStore';
import { wishLikeApi } from '@/utils/apis/likeApi';
import { useState } from 'react';

interface UseLikeOptions {
    isLoggedIn: boolean;
    refetch?: () => void;
    onLikeClick?: (event: React.MouseEvent, isLiked: boolean) => void;
}

export const useLike = (articleId: number, options: UseLikeOptions) => {
    const { isLoggedIn, refetch, onLikeClick } = options;
    const [isProcessing, setIsProcessing] = useState(false);

    const isLiked = useWishlistStore((state) => state.isLiked(articleId));
    const addLike = useWishlistStore((state) => state.addLike);
    const removeLike = useWishlistStore((state) => state.removeLike);

    const toggleLike = async (event?: React.MouseEvent) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        // 중복 클릭 방지
        if (isProcessing) return;
        setIsProcessing(true);

        const wasLiked = isLiked; // 현재 상태 저장

        try {
            // 1. 먼저 UI 업데이트 (즉각적인 반응)
            if (wasLiked) {
                removeLike(articleId);
            } else {
                addLike(articleId);
            }

            // 2. 로그인된 경우만 서버 요청
            if (isLoggedIn) {
                if (wasLiked) {
                    await wishLikeApi.unlike(articleId);
                } else {
                    await wishLikeApi.like([articleId]);
                }
                
                // 서버 요청 성공 후 데이터 재조회
                refetch?.();
            }

            // 3. 콜백 실행
            if (event) onLikeClick?.(event, !wasLiked);

        } catch (error) {
            console.error('찜 처리 중 오류:', error);
            
            // 실패 시 롤백: 원래 상태로 되돌리기
            if (wasLiked) {
                addLike(articleId); // 원래 좋아요 상태였으면 다시 추가
            } else {
                removeLike(articleId); // 원래 좋아요가 아니었으면 다시 제거
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return { isLiked, toggleLike, isProcessing };
};
