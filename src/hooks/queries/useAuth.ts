// hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginRequestDto, SignupMemberRequestDto } from '@/types/auth';
import { authApi } from '@/utils/apis/authApi';
import { useAuthStore } from '@/store/authStore';

export const useLogin = () => {
    return useMutation({
        mutationFn: async (loginData: LoginRequestDto) => {
            const response = await authApi.login(loginData);
            console.log('response', response);
            return response;
        },
    });
};
export const useGetUser = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const hasRefreshToken = useAuthStore((state) => state.hasRefreshToken);
    const isAuthenticated = !!(accessToken || hasRefreshToken);

    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await authApi.getUser();
            const data = response.data;
            return data;
        },
        enabled: isAuthenticated,
        staleTime: Infinity,
        retry: false,
    });
};
export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const { removeAccessToken } = useAuthStore.getState();
            removeAccessToken();
            const response = await authApi.logout();
            console.log('response', response);
        },
        onSuccess: () => {
            queryClient.clear();
            window.location.href = '/login';
        },
    });
};
export const useSignup = () => {
    return useMutation({
        mutationFn: async (signupData: SignupMemberRequestDto) => {
            const response = await authApi.signup(signupData);
            return response;
        },
    });
};
