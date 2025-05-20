'use client';

import { useWishlistStore } from '@/store/wishlistStore';

export default function NavTest() {
    const increment = useWishlistStore((state) => state.increment);

    // TODO 펜팔찾기 페이지에서 useWishlist를 받아오고 버튼에 대한 로직을 다음과 같이 작성

    return (
        <div className="text-3xl font-bold flex flex-col justify-center items-center">
            <button
                className="w-30 h-10 bg-orange-300 text-white rounded mt-10 cursor-pointer hover:bg-amber-500"
                onClick={increment}
            >
                찜하기 +1
            </button>
        </div>
    );
}
