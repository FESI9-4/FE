import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import useMediaQuery from '@/hooks/useMediaQuery';

import { NavDesktopIcon, NavMobileIcon } from '@/assets';
import { cva } from 'class-variance-authority';
import Profile from '@/components/ui/Profile';

const navLink = cva('relative w-auto md:w-15 h-5 md:h-6 transition-colors', {
    variants: {
        active: {
            true: 'text-green-400',
            false: 'text-white',
        },
    },
});

const iconStyle = cva('cursor-pointer', {
    variants: {
        size: {
            mobile: 'w-8 h-8',
            desktop: 'w-32.83 h-8',
        },
    },
});

// 스토리북용 Nav 컴포넌트
const StoryNav = ({
    isLoggedIn,
    user,
    currentPath = '/',
}: {
    isLoggedIn: boolean;
    user?: {
        email: string;
        nickname: string;
        profileImage: string;
        wistLikeCount: number;
        description: string;
    };
    currentPath?: string;
}) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = currentPath; // 스토리북에서는 props로 받은 경로 사용
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleLogout = () => {
        console.log('로그아웃 실행');
    };

    const wishlistCount = 0;
    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    return (
        <nav className="fixed w-full h-14 md:h-15 bg-black flex items-center justify-center min-w-85.5 z-53">
            <div className="w-[calc(100%-32px)] md:w-[calc(100%-46px)] xl:w-[calc(100%-722px)] h-full flex justify-between items-center">
                <div className="w-57 md:w-97 h-full flex items-center justify-between">
                    <Link href="/">
                        {isDesktop ? (
                            <NavDesktopIcon
                                className={iconStyle({ size: 'desktop' })}
                            />
                        ) : (
                            <NavMobileIcon
                                className={iconStyle({ size: 'mobile' })}
                            />
                        )}
                    </Link>
                    <div className="w-45 md:w-57 h-full text-sm md:text-base font-semibold md:font-mold text-orange-50 flex items-center whitespace-nowrap gap-3 md:gap-10">
                        <Link href="/">
                            <p
                                className={navLink({
                                    active: pathname === '/',
                                })}
                            >
                                팬팔 찾기
                            </p>
                        </Link>
                        <Link href="/wishlist" className="flex">
                            <p
                                className={navLink({
                                    active: pathname === '/wishlist',
                                })}
                            >
                                찜한 팬팔
                            </p>
                            {isLoggedIn
                                ? wishlistCount + (user?.wistLikeCount || 0) >
                                      0 && (
                                      <p className="bg-gray-800 ml-1.25 w-6.75 md:mt-0.5 h-5 rounded-2xl text-xs font-semibold flex items-center justify-center">
                                          {wishlistCount +
                                              (user?.wistLikeCount || 0)}
                                      </p>
                                  )
                                : wishlistCount > 0 && (
                                      <p className="bg-gray-800 ml-1.25 w-6.75 md:mt-0.5 h-5 rounded-2xl text-xs font-semibold flex items-center justify-center">
                                          {wishlistCount}
                                      </p>
                                  )}
                        </Link>
                        <Link href="/concert">
                            <p
                                className={navLink({
                                    active: pathname === '/concert',
                                })}
                            >
                                공연 목록
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
                    <div className="relative" ref={dropdownRef}>
                        <div
                            onClick={toggleDropdown}
                            className="cursor-pointer"
                        >
                            <Profile
                                size="medium"
                                image={user?.profileImage || ''}
                            />
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute right-0 xl:right-auto mt-1.5 xl:mt-2 w-27.5 bg-gray-700 rounded-xl shadow-xl h-20 z-50 text-white font-medium text-sm xl:w-35.5 xl:h-28 xl:text-base">
                                <Link
                                    href="/mypage"
                                    className="h-10 rounded-t-xl xl:h-14 flex items-center justify-center cursor-pointer"
                                >
                                    <p className="w-32.5 h-10 hover:bg-gray-600 rounded-xl pl-4 flex items-center">
                                        마이페이지
                                    </p>
                                </Link>
                                <button
                                    className="w-full h-10 xl:h-14 rounded-b-xl flex items-center justify-center cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    <div className="w-32.5 h-10 rounded-xl pl-4 flex hover:bg-gray-600 items-center">
                                        로그아웃
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

const meta: Meta<typeof StoryNav> = {
    title: 'UI/Nav',
    component: StoryNav,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    '네비게이션 바 컴포넌트입니다. 로그인 상태에 따라 다른 UI를 표시합니다.',
            },
        },
        backgrounds: {
            default: 'dark',
        },
        viewport: {
            defaultViewport: 'desktop',
        },
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="min-h-screen min-w-screen">
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 로그아웃 상태
export const LoggedOut: Story = {
    args: {
        isLoggedIn: false,
    },
};

// 로그인 상태
export const LoggedIn: Story = {
    args: {
        isLoggedIn: true,
        user: {
            email: 'test@test.com',
            nickname: '팬팔러버',
            profileImage:
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=60',
            wistLikeCount: 3,
            description: '팬팔러버입니다.',
        },
    },
};
// 로그인 상태 이미지 x 찜 x
export const LoggedInNoImageNoWishlist: Story = {
    args: {
        isLoggedIn: true,
        user: {
            email: 'test@test.com',
            nickname: '팬팔러버',
            profileImage: '',
            wistLikeCount: 0,
            description: '팬팔러버입니다.',
        },
    },
};
