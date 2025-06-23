import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WishlistState = {
    wishlistCount: number;
    likedArticleIds: number[];
    isInitialized: boolean;
    isLoading: boolean;
    setWishlistCount: (count: number) => void;
    addLike: (articleId: number) => void;
    removeLike: (articleId: number) => void;
    isLiked: (articleId: number) => boolean;
    reset: () => void;
    syncWithServer: (serverLikedIds: number[]) => void;
    getPendingLikes: () => number[];
    setInitialized: (initialized: boolean) => void;
    setLoading: (loading: boolean) => void;
};

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            wishlistCount: 0,
            likedArticleIds: [],
            isInitialized: false,
            isLoading: false,

            setWishlistCount: (count) => set({ wishlistCount: count }),
            setLoading: (loading) => set({ isLoading: loading }),

            addLike: (articleId) => {
                const { likedArticleIds, isLoading } = get();
                if (isLoading || likedArticleIds.includes(articleId)) return;
                
                set({
                    likedArticleIds: [...likedArticleIds, articleId],
                    wishlistCount: get().wishlistCount + 1,
                });
            },

            removeLike: (articleId) => {
                const { likedArticleIds, isLoading } = get();
                if (isLoading || !likedArticleIds.includes(articleId)) return;
                
                set({
                    likedArticleIds: likedArticleIds.filter((id) => id !== articleId),
                    wishlistCount: Math.max(0, get().wishlistCount - 1),
                });
            },

            isLiked: (articleId) => {
                return get().likedArticleIds.includes(articleId);
            },

            reset: () => set({
                wishlistCount: 0,
                likedArticleIds: [],
                isInitialized: false,
                isLoading: false,
            }),

            // 서버 동기화 로직 개선
            syncWithServer: (serverLikedIds) => {
                set({
                    likedArticleIds: serverLikedIds,
                    wishlistCount: serverLikedIds.length,
                    isInitialized: true,
                });
            },

            getPendingLikes: () => {
                return get().likedArticleIds;
            },

            setInitialized: (initialized) => set({ isInitialized: initialized }),
        }),
        {
            name: 'wishlist-storage',
        }
    )
);
