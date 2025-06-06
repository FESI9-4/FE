import { useAuthStore } from '@/store/authStore';
import axios from 'axios';

const baseURL = 'http://localhost:3000'; // 주소 수정

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

// 토큰 X 경로 수정
const publicApis = ['/auth/login', '/auth/register', '/auth/refresh'];

const setTokens = (tokens: TokenResponse) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
};

const removeTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

const onRefreshError = () => {
    refreshSubscribers = [];
    removeTokens();
    window.location.href = '/login'; //리다이렉트
};

const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const response = await axios.post<TokenResponse>(
            `${baseURL}/auth/refresh`, // 리프레시 토큰 경로 수정
            {
                refreshToken,
            }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data; // 데이터 수정
        setTokens({ accessToken, refreshToken: newRefreshToken });
        return accessToken;
    } catch (error) {
        onRefreshError();
        throw error;
    }
};

const isPublicApi = (url: string) => {
    return publicApis.some((api) => url.includes(api));
};

axiosInstance.interceptors.request.use(
    (config) => {
        if (!isPublicApi(config.url || '')) {
            const token = useAuthStore.getState().accessToken;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            !isPublicApi(originalRequest.url || '') &&
            error.response?.status === 401 && // 오류 코드 수정
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                try {
                    const token = await new Promise<string>((resolve) => {
                        refreshSubscribers.push((token) => resolve(token));
                    });
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                } catch (err) {
                    return Promise.reject(err);
                }
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newToken = await refreshToken();
                isRefreshing = false;
                onRefreshed(newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
