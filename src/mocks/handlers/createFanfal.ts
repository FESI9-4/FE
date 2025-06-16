import { http, HttpResponse } from 'msw';

export const createBoardHandlers = [
    http.post('http://localhost:3000/api/board', async ({ request }) => {
        const body = (await request.json()) as {
            title: string;
            roadNameAddress: string;
            latitude: number;
            longitude: number;
            imageKey: string;
            description: string;
            smallCategory: string;
            date: number;
            deadline: number;
            minPerson: number;
            maxPerson: number;
        };

        if (!body.title || !body.roadNameAddress) {
            return HttpResponse.json(
                {
                    statusCode: 400,
                    message: '필수 입력값이 누락되었습니다.',
                    data: null,
                },
                { status: 400 }
            );
        }

        return HttpResponse.json({
            statusCode: 200,
            message: '게시글 생성 성공',
            data: 'board-id-1234',
        });
    }),
];
