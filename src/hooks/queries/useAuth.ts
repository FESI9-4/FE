// hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginRequest, LoginResponse, SignupRequest } from '@/types/auth';
import { authApi } from '@/utils/apis/authApi';
import { useAuthStore } from '@/store/authStore';
import { fetchInstance } from '@/utils/apis/fetchInstance';

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (loginData: LoginRequest) => {
            const response = await fetchInstance<LoginResponse, LoginRequest>(
                '/api/auth/store-token',
                {
                    method: 'POST',
                    body: loginData,
                }
            );
            const { accessToken, data: user } = response;

            return {
                accessToken,
                user,
            };
        },
        onSuccess: async (result) => {
            // ✅ 데이터 처리
            if (result.user) {
                queryClient.setQueryData(['user'], result.user);
            }
            if (result.accessToken) {
                // ✅ 액세스 토큰 저장
                const { setAccessToken } = useAuthStore.getState();
                setAccessToken(result.accessToken);
            }
        },
        onError: (error) => {
            console.error('❌ 로그인 실패:', error.message);
        },
    });
};
export const useGetUser = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await authApi.getUser();
            const data = response.data;
            return data;
        },
        enabled: !!accessToken,
        staleTime: Infinity,
    });
};
export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const { removeAccessToken } = useAuthStore.getState();
            removeAccessToken();
            await authApi.logout();
            await authApi.clearCookie();
        },
        onSuccess: () => {
            queryClient.clear();
            window.location.href = '/login';
        },
    });
};
export const useSignup = () => {
    return useMutation({
        mutationFn: async (signupData: SignupRequest) => {
            const response = await authApi.signup(signupData);
            return response;
        },
    });
};
export const useTest = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    return useQuery({
        queryKey: ['test'],
        queryFn: async () => {
            const response = await authApi.test();
            const data = response.data;
            return data;
        },
        enabled: !!accessToken,
    });
};
export const useTest2 = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    return useQuery({
        queryKey: ['test2'],
        queryFn: async () => {
            const response = await authApi.test2();
            const data = response.data;
            return data;
        },
        enabled: !!accessToken,
    });
};
