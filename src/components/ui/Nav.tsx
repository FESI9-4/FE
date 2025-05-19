'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useMediaQuery from '@/hooks/useMediaQuery';
import useAuth from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import { useWishlist } from '@/context/WishlistContext';

export default function Nav() {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const { isLoggedIn } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();
    const { wishlistCount } = useWishlist();

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const getNavLinkClass = (path: string) =>
        `relative w-13 w-auto md:w-15 h-5 md:h-6 ${
            pathname === path ? 'text-orange-300' : 'text-black-50'
        } transition-colors`;
    //TODO 색상 테이블 추가하면 색상에 맞게 수정하기

    return (
        <nav className="w-full h-14 md:h-15  bg-black flex items-center justify-center min-w-85.5">
            <div className="w-[calc(100%-32px)] md:w-[calc(100%-46px)] xl:w-[calc(100%-722px)] h-full flex justify-between items-center">
                <div className="w-57 md:w-97 h-full flex items-center justify-between">
                    <Link href="/">
                        <Image
                            src={
                                isDesktop
                                    ? '/icons/navDesktop.svg'
                                    : '/icons/navMobile.svg'
                            }
                            alt="navLogo"
                            width={isDesktop ? 131.32 : 32}
                            height={32}
                            className="cursor-pointer"
                        />
                    </Link>
                    <div className="w-45 md:w-57 h-full text-sm md:text-base font-semibold md:font-mold text-orange-50 flex items-center whitespace-nowrap gap-3 md:gap-10">
                        <Link href="/search">
                            <p className={getNavLinkClass('/search')}>
                                팬팔 찾기
                            </p>
                        </Link>
                        <Link href="/wishlist" className="flex ">
                            <p className={getNavLinkClass('/wishlist')}>
                                찜한 팬팔
                            </p>
                            {wishlistCount > 0 && (
                                <p className="bg-gray-800 ml-1.25 w-6.75 md:mt-0.5 h-5 rounded-2xl text-xs font-semibold flex items-center justify-center">
                                    {wishlistCount}
                                </p>
                            )}
                        </Link>
                        <Link href="/review">
                            <p className={getNavLinkClass('/review')}>
                                모든 리뷰
                            </p>
                        </Link>
                    </div>
                </div>
                {!isLoggedIn ? (
                    <Link href="/login">
                        <p className="text-sm md:text-base font-semibold text-white h-5 md:h-6">
                            로그인
                        </p>
                    </Link>
                ) : (
                    <div className="relative">
                        <Image
                            src="/icons/profile.svg"
                            alt="User"
                            width={40}
                            height={40}
                            className="cursor-pointer"
                            onClick={toggleDropdown}
                        />
                        {isDropdownOpen && (
                            <div className="absolute right-0 xl:right-auto mt-1.5 xl:mt-2 w-27.5 bg-gray-700 rounded-xl shadow-xl h-20 z-50 text-white font-medium text-sm xl:w-35.5 xl:h-28 xl:text-base ">
                                <Link
                                    href="/mypage"
                                    className="h-10 rounded-t-xl xl:h-14 flex items-center justify-center"
                                >
                                    <p className="w-32.5 h-10 hover:bg-gray-600 rounded-xl pl-4 flex items-center">
                                        마이페이지
                                    </p>
                                </Link>
                                <button
                                    className="w-full h-10 xl:h-14 rounded-b-xl flex items-center justify-center    "
                                    onClick={() => {
                                        // 로그아웃 처리 임시처리값
                                        localStorage.removeItem('token');
                                        localStorage.removeItem(
                                            'wishlistCount'
                                        );
                                        window.location.reload();
                                    }}
                                >
                                    <p className="w-32.5 h-10 hover:bg-gray-700 rounded-xl pl-4 flex items-center">
                                        로그아웃
                                    </p>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
