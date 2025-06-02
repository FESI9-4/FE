import axiosInstance from './axiosInstance';

// 나중에 type 별로 묶어서 처리하면 좋을듯합니다
export interface User {
    id: number;
    username: string;
    email: string;
}

export const userApi = {
    getUser: async (userId: number) => {
        const response = await axiosInstance.get<User>(`/users/${userId}`);
        return response.data;
    },

    updateUser: async (userId: number, userData: Partial<User>) => {
        const response = await axiosInstance.put<User>(
            `/users/${userId}`,
            userData
        );
        return response.data;
    },

    deleteUser: async (userId: number) => {
        await axiosInstance.delete(`/users/${userId}`);
    },
};
