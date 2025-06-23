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
    // 새로 추가된 메서드
    initializeWithServer: (serverLikedIds: number[]) => void;
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
                    likedArticleIds: likedArticleIds.filter(
                        (id) => id !== articleId
                    ),
                    wishlistCount: Math.max(0, get().wishlistCount - 1),
                });
            },

            isLiked: (articleId) => {
                return get().likedArticleIds.includes(articleId);
            },

            reset: () =>
                set({
                    wishlistCount: 0,
                    likedArticleIds: [],
                    isInitialized: false,
                    isLoading: false,
                }),

            // 기존 syncWithServer 유지 (하위 호환성)
            syncWithServer: (serverLikedIds) => {
                set({
                    likedArticleIds: serverLikedIds,
                    wishlistCount: serverLikedIds.length,
                    isInitialized: true,
                });
            },

            // 새로운 초기화 메서드 - 로컬 데이터와 서버 데이터를 합치는 로직
            initializeWithServer: (serverLikedIds) => {
                const { likedArticleIds } = get();
                
                // 로컬에만 있는 항목들 (서버에 아직 동기화되지 않은 항목들)
                const localOnlyIds = likedArticleIds.filter(
                    id => !serverLikedIds.includes(id)
                );
                
                // 서버 데이터를 기준으로 로컬 상태 초기화
                // 하지만 로컬에만 있는 항목들은 유지 (나중에 서버에 동기화될 예정)
                const combinedIds = [...new Set([...serverLikedIds, ...localOnlyIds])];
                
                set({
                    likedArticleIds: combinedIds,
                    wishlistCount: combinedIds.length,
                    isInitialized: true,
                });
            },

            getPendingLikes: () => {
                return get().likedArticleIds;
            },

            setInitialized: (initialized) =>
                set({ isInitialized: initialized }),
        }),
        {
            name: 'wishlist-storage',
        }
    )
);
