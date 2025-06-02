import axiosInstance from './axiosInstance';

// 나중에 type 별로 묶어서 처리하면 좋을듯합니다
export interface User {
    id: number;
    username: string;
    email: string;
}

export const userApi = {
    getUser: (userId: number) =>
        axiosInstance.get<User>(`/users/${userId}`).then((res) => res.data),

    updateUser: (userId: number, userData: Partial<User>) =>
        axiosInstance
            .put<User>(`/users/${userId}`, userData)
            .then((res) => res.data),

    deleteUser: (userId: number) => axiosInstance.delete(`/users/${userId}`),
};
