import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, userApi } from '@/utils/apis/api';

export const useUser = (userId: number) => {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => userApi.getUser(userId),
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            userId,
            userData,
        }: {
            userId: number;
            userData: Partial<User>;
        }) => userApi.updateUser(userId, userData),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['user', variables.userId],
            });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: number) => userApi.deleteUser(userId),
        onSuccess: (_, userId) => {
            queryClient.invalidateQueries({ queryKey: ['user', userId] });
        },
    });
};
