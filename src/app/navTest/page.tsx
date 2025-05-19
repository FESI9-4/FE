'use client';
import { useState, useEffect } from 'react';
import Nav from '@/components/ui/Nav';

export default function NavTest() {
    const [wishlistCount, setWishlistCount] = useState(0);

    const handleAddToWishlist = () => {
        setWishlistCount((prev) => {
            const newCount = prev + 1;
            localStorage.setItem('wishlistCount', newCount.toString());
            return newCount;
        });
    };
    useEffect(() => {
        const storedCount = localStorage.getItem('wishlistCount');
        if (storedCount) {
            setWishlistCount(parseInt(storedCount, 10));
        }
    }, []);

    return (
        <div className="text-3xl font-bold flex flex-col justify-center items-center gap-10">
            <Nav wishlistCount={wishlistCount} />
            <button
                className="w-30 h-10 bg-orange-300 text-white rounded"
                onClick={handleAddToWishlist}
            >
                찜하기 +1
            </button>
        </div>
    );
}
