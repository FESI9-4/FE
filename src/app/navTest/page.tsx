'use client';

import { useWishlist } from '@/context/WishlistContext';

export default function NavTest() {
    const { setWishlistCount } = useWishlist();

    const handleAddToWishlist = () => {
        setWishlistCount((prev) => {
            const newCount = prev + 1;
            localStorage.setItem('wishlistCount', newCount.toString());
            return newCount;
        });
    };

    // TODO 펜팔찾기 페이지에서 useWishlist를 받아오고 버튼에 대한 로직을 다음과 같이 작성

    return (
        <div className="text-3xl font-bold flex flex-col justify-center items-center">
            <button
                className="w-30 h-10 bg-orange-300 text-white rounded mt-10"
                onClick={handleAddToWishlist}
            >
                찜하기 +1
            </button>
        </div>
    );
}
