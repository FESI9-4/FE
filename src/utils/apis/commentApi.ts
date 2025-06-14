import { customFetcher } from '@/utils/apis/customFetcher';

interface PostCommentRequest {
    parentCommentId: number | null;
    secret: boolean;
    content: string;
}

interface PostCommentResponse {
    statusCode: number;
    message: string;
    data: string;
}

export const commentApi = {
    postCommentByArticleId: async (
        articleId: number,
        body: PostCommentRequest
    ): Promise<PostCommentResponse> => {
        return customFetcher<PostCommentResponse, PostCommentRequest>(
            `/api/board/${articleId}/comment`,
            {
                method: 'POST',
                body,
                auth: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    },

    patchCommentByArticleId: async (
        articleId: number,
        body: { commentID: number; secret: boolean; content: string }
    ): Promise<PostCommentResponse> => {
        return customFetcher<PostCommentResponse, typeof body>(
            `/api/board/${articleId}/comment`,
            {
                method: 'PATCH',
                body,
                auth: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    },
};
