'use client';

import { useAuthStore } from '@/store/authStore';

export default function AfterLoginPage() {
    const { user, accessToken } = useAuthStore();

    return (
        <div className="bg-amber-900 flex flex-col items-center justify-center h-screen">
            <h1>AfterLoginPage</h1>
            <p>닉네임: {user?.nickName || '없음'}</p>
            <p>유저ID: {user?.userId || '없음'}</p>
            <p>토큰: {accessToken?.token || '없음'}</p>
            <p>찜 개수: {user?.wistLikeCount || '없음'}</p>
        </div>
    );
}
