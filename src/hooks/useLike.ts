import { useWishlistStore } from '@/store/wishlistStore';
import { wishLikeApi } from '@/utils/apis/likeApi';

interface UseLikeOptions {
    isLoggedIn: boolean;
    refetch?: () => void;
    onLikeClick?: (event: React.MouseEvent, isLiked: boolean) => void;
}

export const useLike = (articleId: number, options: UseLikeOptions) => {
    const { isLoggedIn, refetch, onLikeClick } = options;

    const isLiked = useWishlistStore((state) => state.isLiked(articleId));
    const addLike = useWishlistStore((state) => state.addLike);
    const removeLike = useWishlistStore((state) => state.removeLike);

    const toggleLike = async (event?: React.MouseEvent) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        try {
            if (isLoggedIn) {
                if (isLiked) {
                    await wishLikeApi.unlike(articleId);
                } else {
                    await wishLikeApi.like([articleId]);
                }
            }

            if (isLiked) {
                removeLike(articleId);
            } else {
                addLike(articleId);
            }

            refetch?.();
            if (event) onLikeClick?.(event, !isLiked);
        } catch (error) {
            console.error('찜 처리 중 오류:', error);
            // 실패 시 롤백
            if (isLiked) {
                addLike(articleId);
            } else {
                removeLike(articleId);
            }
        }
    };

    return { isLiked, toggleLike };
};
