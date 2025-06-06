import { create } from 'zustand';
import { AccessToken, User } from '@/types/authType';
import { persist } from 'zustand/middleware';

interface AuthStore {
    user: User | null;
    accessToken: AccessToken | null;
    setAuth: (user: User) => void;
    setAccessToken: (accessToken: AccessToken) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            setAuth: (user) => set({ user }),
            setAccessToken: (token) => set({ accessToken: token }),
            clearAuth: () => {
                console.log('clearAuth 호출');
                set({ user: null, accessToken: null });
            },
        }),
        {
            name: 'auth-user',
            // ✅ 유저 정보만 localStorage에 저장
            partialize: (state) => ({
                user: state.user,
            }),
        }
    )
);

type AuthState = {
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
    removeAccessToken: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
    accessToken: '',
    setAccessToken: (accessToken) => set({ accessToken }),
    removeAccessToken: () => set({ accessToken: '' }),
}));
