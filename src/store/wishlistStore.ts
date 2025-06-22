import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WishlistState = {
    wishlistCount: number;
    likedArticleIds: number[];
    isInitialized: boolean;
    isLoading: boolean; // 로딩 상태 추가
    setWishlistCount: (count: number) => void;
    addLike: (articleId: number) => void;
    removeLike: (articleId: number) => void;
    isLiked: (articleId: number) => boolean;
    reset: () => void;
    syncWithServer: (serverLikedIds: number[]) => void;
    getPendingLikes: () => number[];
    setInitialized: (initialized: boolean) => void;
    setLoading: (loading: boolean) => void; // 로딩 상태 설정
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

            // 로그아웃 시에도 로컬 데이터 보존하도록 수정
            reset: () => set({
                wishlistCount: 0,
                likedArticleIds: [],
                isInitialized: false,
                isLoading: false,
            }),

            syncWithServer: (serverLikedIds) => {
                const currentLocalIds = get().likedArticleIds;
                
                // 로그인 상태에서는 서버 데이터를 우선
                // 비로그인 상태에서는 로컬 데이터 유지
                const mergedIds = get().isInitialized 
                    ? serverLikedIds 
                    : [...new Set([...serverLikedIds, ...currentLocalIds])];

                set({
                    likedArticleIds: mergedIds,
                    wishlistCount: mergedIds.length,
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
