// hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginRequest, SignupRequest } from '@/types/auth';
import { authApi } from '@/utils/apis/authApi';
import { useAuthStore } from '@/store/authStore';

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (loginData: LoginRequest) => {
            const response = await authApi.login(loginData);
            const data = await response.json();
            const authHeader = response.headers.get('Authorization');
            const accessToken = authHeader?.replace('Bearer ', '') || null;
            return {
                data,
                accessToken,
            };
        },
        onSuccess: async (result) => {
            // ✅ 데이터 처리
            if (result.data.data) {
                queryClient.setQueryData(['user'], result.data.data);
            }
            if (result.accessToken) {
                // ✅ 액세스 토큰 저장
                const { setAccessToken } = useAuthStore.getState();
                setAccessToken(result.accessToken);
                await authApi.storeAccessToken(result.accessToken);
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
