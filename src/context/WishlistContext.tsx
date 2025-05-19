'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type WishlistContextType = {
    wishlistCount: number;
    setWishlistCount: React.Dispatch<React.SetStateAction<number>>;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlistCount, setWishlistCount] = useState(0);

    useEffect(() => {
        const storedCount = localStorage.getItem('wishlistCount');
        if (storedCount) {
            setWishlistCount(parseInt(storedCount, 10));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlistCount', wishlistCount.toString());
    }, [wishlistCount]);

    return (
        <WishlistContext.Provider value={{ wishlistCount, setWishlistCount }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
