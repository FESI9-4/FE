// hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginRequest, SignupRequest } from '@/types/auth';
import { authApi } from '@/utils/apis/authApi';
import { useAuthStore } from '@/store/authStore';

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (loginData: LoginRequest) => {
            // ✅ API에서 Response 객체 받기
            const response = await authApi.login(loginData);
            // ✅ 훅에서 데이터 가공
            const data = await response.json();
            const authHeader = response.headers.get('Authorization');
            const accessToken = authHeader?.replace('Bearer ', '') || null;

            return {
                // result 객체에 담김
                data,
                accessToken,
            };
        },
        onSuccess: async (result) => {
            // ✅ 데이터 처리
            if (result.data.data) {
                console.log('🔄 유저 정보 캐시에 저장 완료');
                queryClient.setQueryData(['user'], result.data.data);
            }
            if (result.accessToken) {
                // ✅ 액세스 토큰 저장
                const { setAccessToken } = useAuthStore.getState();
                setAccessToken(result.accessToken);
                //Route Handler로 HttpOnly 쿠키 저장
                await authApi.storeAccessToken(result.accessToken);
                console.log('✅ 액세스 토큰 스토어에 저장 완료:');
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
            const response = (await authApi.getUser()).data;
            return response;
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
            window.location.replace('/login');
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
export const useCheckUserId = () => {
    return useMutation({
        mutationFn: async (userId: string) => {
            const response = await authApi.checkUserId(userId);
            return response;
        },
    });
};
