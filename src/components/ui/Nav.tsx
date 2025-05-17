'use client';
import Image from 'next/image';
import Link from 'next/link';
import useMediaQuery from '@/hooks/useMediaQuery';

export default function Nav() {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <nav className="w-full h-14 md:h-15 bg-black flex items-center justify-center min-w-75">
            <div className="w-[calc(100%-32px)] md:w-[calc(100%-46px)] h-full  flex justify-between items-center">
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
                            <p className="w-13 md:15 h-5 md:6 ">팬팔 찾기</p>
                        </Link>
                        <Link href="/wishlist">
                            <p className="w-13 md:15 h-5 md:6">찜한 팬팔</p>
                        </Link>
                        <Link href="/review">
                            <p className="w-13 md:15 h-5 md:6">모든 리뷰</p>
                        </Link>
                    </div>
                </div>
                <Link href="/login">
                    <p className="text-sm md:text-base font-semibold text-white h-5 md:h-6">
                        로그인
                    </p>
                </Link>
            </div>
        </nav>
    );
}
