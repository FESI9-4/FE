import { create } from 'zustand';
type AuthState = {
    accessToken: string | null;
    hasRefreshToken: boolean;
    setAccessToken: (accessToken: string) => void;
    setHasRefreshToken: (hasRefreshToken: boolean) => void;
    removeAccessToken: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
    accessToken: null,
    setAccessToken: (token: string) => {
        set({ accessToken: token });
    },
    hasRefreshToken: false,
    setHasRefreshToken: (hasRefreshToken: boolean) => {
        set({ hasRefreshToken });
    },
    removeAccessToken: () =>
        set({
            accessToken: null,
        }),
    removeHasRefreshToken: () => set({ hasRefreshToken: false }),
}));
