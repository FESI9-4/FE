import { customFetcher } from './customFetcher';

// 나중에 type 별로 묶어서 처리하면 좋을듯합니다
export interface User {
    id: number;
    username: string;
    email: string;
}

export const userApi = {
    getUser: async (userId: number) => {
        return customFetcher<User, void>(`/users/${userId}`);
    },

    updateUser: async (userId: number, userData: Partial<User>) => {
        return customFetcher<User, Partial<User>>(`/users/${userId}`, {
            method: 'PUT',
            body: userData,
        });
    },

    deleteUser: async (userId: number) => {
        return customFetcher<void, void>(`/users/${userId}`, {
            method: 'DELETE',
        });
    },
};
// 사용 예시
// const user = await userApi.getUser(1);
// const updatedUser = await userApi.updateUser(1, { username: 'newName' });
// await userApi.deleteUser(1);
