import { customFetcher } from './customFetcher';
import {
    MyPageResponse,
    SelfMypageResponse,
    QuestionListResponse,
    AnswerListResponse,
    ProfileEditRequest,
} from '@/types/myPage';

export const mypageApi = {
    getMypage: async (page: number | null, limit: number) => {
        return customFetcher<
            MyPageResponse,
            { lastArticleId: number | null; limit: number }
        >(`/api/myPage?page=${page}&limit=${limit}`, {
            method: 'GET',
        });
    },
    deleteMypage: async (fanpal_id: number) => {
        console.log('deleteMypage', fanpal_id);
        return customFetcher<void, { fanpal_id: number }>('/api/mypage', {
            method: 'DELETE',
            body: { fanpal_id },
        });
    },
    getSelfMypage: async (page: number | null, limit: number) => {
        return customFetcher<
            SelfMypageResponse,
            { page: number | null; limit: number }
        >(`/api/myPage/self?page=${page}&limit=${limit}`, {
            method: 'GET',
        });
    },
    getQuestion: async (lastArticleId: number | null, limit: number) => {
        return customFetcher<
            QuestionListResponse,
            { lastArticleId: number | null; limit: number }
        >('/api/mypage/question', {
            method: 'POST',
            body: {
                lastArticleId,
                limit,
            },
        });
    },
    getAnswer: async (lastArticleId: number | null, limit: number) => {
        return customFetcher<
            AnswerListResponse,
            { lastArticleId: number | null; limit: number }
        >(`/api/myPage/answer?lastArticleId=${lastArticleId}&limit=${limit}`, {
            method: 'GET',
        });
    },
    cancelMypage: async (fanpal_id: number) => {
        console.log('cancelMypage', fanpal_id);
        return customFetcher<void, { fanpal_id: number }>(
            '/api/mypage/cancel',
            {
                method: 'POST',
                body: { fanpal_id },
            }
        );
    },

    changePassword: async (data: {
        currentPassword: string;
        newPassword: string;
    }) => {
        return customFetcher<
            void,
            { currentPassword: string; newPassword: string }
        >('/api/mypage/password', { method: 'POST', body: data });
    },
    changeProfile: async (data: ProfileEditRequest) => {
        return customFetcher<void, ProfileEditRequest>('/api/myPage', {
            method: 'PATCH',
            body: data,
        });
    },

    postProfileImage: async (profileImage: File) => {
        return customFetcher<
            {
                statusCode: number;
                message: string;
                data: { preSignedUrl: string; key: string };
            },
            { fileName: string }
        >(`/api/images/postImage?fileName=${profileImage.name}`, {
            method: 'GET',
        });
    },
    putProfileImage: async (profileImage: File, url: string) => {
        return customFetcher<void, File>(`${url}`, {
            method: 'PUT',
            body: profileImage,
        });
    },
};
