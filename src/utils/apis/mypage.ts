import { customFetcher } from './customFetcher';
import {
    MyPageResponse,
    SelfMypageResponse,
    QuestionListResponse,
    AnswerListResponse,
} from '@/types/myPage';

interface MypageResponse {
    nickName: string;
    img: string;
    description: string;
}

export const mypageApi = {
    getUser: async () => {
        return customFetcher<MypageResponse, void>('/api/user', {
            method: 'GET',
        });
    },
    getMypage: async (lastArticleId: number | null, limit: number) => {
        return customFetcher<
            MyPageResponse,
            { lastArticleId: number | null; limit: number }
        >('/api/mypage', {
            method: 'POST',
            body: {
                lastArticleId,
                limit,
            },
        });
    },
    deleteMypage: async (fanpal_id: number) => {
        console.log('deleteMypage', fanpal_id);
        return customFetcher<void, { fanpal_id: number }>('/api/mypage', {
            method: 'DELETE',
            body: { fanpal_id },
        });
    },
    getSelfMypage: async (lastArticleId: number | null, limit: number) => {
        return customFetcher<
            SelfMypageResponse,
            { lastArticleId: number | null; limit: number }
        >('/api/mypage/self', {
            method: 'POST',
            body: {
                lastArticleId,
                limit,
            },
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
        >('/api/mypage/answer', {
            method: 'POST',
            body: {
                lastArticleId,
                limit,
            },
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
};
