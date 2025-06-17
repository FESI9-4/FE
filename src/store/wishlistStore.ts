import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WishlistState = {
  wishlistCount: number;
  likedArticleIds: number[];
  setWishlistCount: (count: number) => void;
  addLike: (articleId: number) => void;
  removeLike: (articleId: number) => void;
  isLiked: (articleId: number) => boolean;
  reset: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistCount: 0,
      likedArticleIds: [],
      setWishlistCount: (count) => set({ wishlistCount: count }),
      addLike: (articleId) => {
        const ids = get().likedArticleIds;
        if (!ids.includes(articleId)) {
          set({
            likedArticleIds: [...ids, articleId],
            wishlistCount: get().wishlistCount + 1,
          });
        }
      },
      removeLike: (articleId) => {
        const ids = get().likedArticleIds;
        if (ids.includes(articleId)) {
          set({
            likedArticleIds: ids.filter((id) => id !== articleId),
            wishlistCount:
              get().wishlistCount > 0 ? get().wishlistCount - 1 : 0,
          });
        }
      },
      isLiked: (articleId) => {
        return get().likedArticleIds.includes(articleId);
      },
      reset: () =>
        set({
          wishlistCount: 0,
          likedArticleIds: [],
        }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
