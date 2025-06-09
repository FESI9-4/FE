import { create } from 'zustand';
type AuthState = {
    accessToken: string | null;
    setAccessToken: (accessToken: string) => void;
    removeAccessToken: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
    accessToken: null,
    setAccessToken: (token: string) => {
        set({ accessToken: token });
    },
    removeAccessToken: () =>
        set({
            accessToken: null,
        }),
}));
