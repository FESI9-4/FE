import { create } from 'zustand';

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
