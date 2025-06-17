import { http, HttpResponse } from 'msw';

export const wishLikeHandlers = [
    http.post('http://localhost:3000/api/wishLike', async ({ request }) => {
        const body = (await request.json()) as { articleIds: number[] };

        if (!body.articleIds || !Array.isArray(body.articleIds)) {
            return HttpResponse.json(
                { statusCode: 400, message: '잘못된 요청입니다.', data: '' },
                { status: 400 }
            );
        }

        return HttpResponse.json({
            statusCode: 200,
            message: '게시물 좋아요 성공',
            data: '',
        });
    }),

    http.delete(
        'http://localhost:3000/api/wishLike/:articleId',
        ({ params }) => {
            const { articleId } = params;

            if (!articleId || isNaN(Number(articleId))) {
                return HttpResponse.json(
                    {
                        statusCode: 400,
                        message: '유효하지 않은 articleId입니다',
                        data: '',
                    },
                    { status: 400 }
                );
            }

            return HttpResponse.json({
                statusCode: 200,
                message: '성공',
                data: '',
            });
        }
    ),
];
