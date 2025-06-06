// hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { LoginRequest, LoginResponse } from '@/types/authType';
import { removeCookie, setCookie } from '@/utils/cookies';
import axiosInstance from '@/utils/apis/axiosInstance';

export const useLogin = () => {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    return useMutation({
        mutationFn: async ({ userId, password }: LoginRequest) => {
            const response = await axiosInstance.post('api/auth/login', {
                userId,
                password,
            });

            const authHeader = response.headers['authorization'];
            const accessToken = authHeader?.replace('Bearer ', '');

            const data = response.data;

            console.log('📡 응답 확인:', {
                headers: response.headers,
                authHeader,
                accessToken,
                data,
            });
            return { ...data, accessToken: accessToken };
        },

        onSuccess: (response: LoginResponse) => {
            if (response.statusCode === 200) {
                console.log('🔥 로그인 성공, 스토어 저장 시작');
                setCookie('accessToken', response.accessToken || '');
                setAccessToken({
                    token: response.data.token,
                });
                setAuth({
                    userId: response.data.userId,
                    nickName: response.data.nickName,
                    img: response.data.img || '',
                    wistLikeCount: response.data.wistLikeCount || 0,
                });

                router.push('/afterlogin');
            }
        },

        onError: (error) => {
            console.error('로그인 실패:', error);
        },
    });
};
export const useLogout = () => {
    const router = useRouter();
    const clearAuth = useAuthStore((state) => state.clearAuth);
    return useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post('/api/auth/logout');
            console.log('📡 응답 확인:', response.data);
            return response.data;
        },
        // 로그아웃 성공시 유저정보 및 액세스토큰 삭제
        onSuccess: () => {
            clearAuth();
            removeCookie('accessToken');
            console.log('로그아웃 성공');
            router.push('/');
        },
    });
};
