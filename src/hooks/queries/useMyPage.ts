import { mypageApi } from '@/utils/apis/mypage';
import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import {
    MyPageResponse,
    QuestionListResponse,
    SelfMypageResponse,
    AnswerListResponse,
    ProfileEditRequest,
} from '@/types/myPage';

export const useChangeProfileMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ProfileEditRequest) => mypageApi.changeProfile(data),
        onSuccess: () => {
            console.log('프로필 변경 성공');
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error) => {
            console.error('프로필 변경 실패:', error);
        },
    });
};

export const useChangePasswordMutation = () => {
    return useMutation({
        mutationFn: (data: { currentPassword: string; newPassword: string }) =>
            mypageApi.changePassword(data),
        onSuccess: () => {
            console.log('비밀번호 변경 성공');
        },
        onError: (error) => {
            console.error('비밀번호 변경 실패:', error);
        },
    });
};

export const useGetMyPage = (currentPage: number, pageSize: number) => {
    return useQuery<MyPageResponse>({
        queryKey: ['mypage', currentPage],
        queryFn: () => mypageApi.getMypage(currentPage, pageSize),
    });
};

export const useDeleteMypageMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (fanpal_id: number) => mypageApi.deleteMypage(fanpal_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mypage'] });
        },
        onError: (error) => {
            console.error('팬팔 삭제 실패:', error);
        },
    });
};

export const useCancelMypageMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (fanpal_id: number) => mypageApi.cancelMypage(fanpal_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mypage'] });
        },
        onError: (error) => {
            console.error('팬팔 취소 실패:', error);
        },
    });
};

export const useGetSelfMypage = (currentPage: number, pageSize: number) => {
    return useQuery<SelfMypageResponse>({
        queryKey: ['mypageSelf', currentPage],
        queryFn: () => mypageApi.getSelfMypage(currentPage, pageSize),
    });
};

export const useGetQuestion = (pageParam: number | null, pageSize: number) => {
    return useInfiniteQuery<QuestionListResponse>({
        queryKey: ['questionList'],
        queryFn: ({ pageParam }) =>
            mypageApi.getQuestion(pageParam as number | null, pageSize),
        getNextPageParam: (lastPage) => {
            if (lastPage.data.length === 0) return undefined;
            return lastPage.data[lastPage.data.length - 1].comment_id;
        },
        initialPageParam: 1,
    });
};

export const useGetAnswer = (pageParam: number | null, pageSize: number) => {
    return useInfiniteQuery<AnswerListResponse>({
        queryKey: ['answerList'],
        queryFn: ({ pageParam }) =>
            mypageApi.getAnswer(pageParam as number | null, pageSize),
        getNextPageParam: (lastPage) => {
            if (lastPage.data.data.length === 0) return undefined;
            return lastPage.data.data[lastPage.data.data.length - 1].fanpal_id;
        },
        initialPageParam: 1,
    });
};
