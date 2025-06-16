import { http, HttpResponse } from 'msw';

let isParticipated = false;

export const fanfalPartHandlers = [
    http.post('http://localhost:3000/api/board/:articleId/fanFal', () => {
        isParticipated = true;
        return HttpResponse.json({
            statusCode: 200,
            message: '참여 완료',
            data: '참여 되었습니다',
            isParticipated,
        });
    }),

    http.delete('http://localhost:3000/api/board/:articleId/fanFal', () => {
        isParticipated = false;
        return HttpResponse.json({
            statusCode: 200,
            message: '참여 취소 완료',
            data: '참여가 취소되었습니다',
            isParticipated,
        });
    }),
];
