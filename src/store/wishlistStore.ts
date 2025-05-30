import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WishlistState = {
    wishlistCount: number;
    setWishlistCount: (count: number) => void;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
};

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set) => ({
            wishlistCount: 0,
            setWishlistCount: (count) => set({ wishlistCount: count }),
            increment: () =>
                set((state) => ({ wishlistCount: state.wishlistCount + 1 })),
            decrement: () =>
                set((state) => ({
                    wishlistCount:
                        state.wishlistCount > 0 ? state.wishlistCount - 1 : 0,
                })),
            reset: () => set({ wishlistCount: 0 }),
        }),
        {
            name: 'wishlist-storage',
        }
    )
);
