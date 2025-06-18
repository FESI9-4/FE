import { http, HttpResponse } from 'msw';

const today = new Date();

const getDateAfterDays = (days: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    return date.getTime() / 1000;
};

const getDateBeforeDays = (days: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() - days);
    return date.getTime() / 1000;
};

export const detailHandlers = [
    http.get('http://localhost:3000/api/board/:articleId', ({ params }) => {
        const { articleId } = params;

        return HttpResponse.json({
            statusCode: 200,
            message: '성공',
            data: {
                articleId,
                createUser: '오용자', // createUser는 결국사용자nickname임,
                createUserProfileImgUrl: 'https://picsum.photos/40?random=4',
                title: `게시글 ${articleId}`,
                location: '건대입구',
                latitude: 37.540705, // 예: 서울시 좌표
                longitude: 127.077538,
                description: '같이 콘서트 가실분',
                date: getDateAfterDays(5),
                deadLine: getDateAfterDays(10),
                createdAt: getDateBeforeDays(4),
                minPerson: 5,
                currentPerson: 5,
                maxPerson: 10,
                participants: [
                    {
                        name: '홍길동',
                        image: 'https://picsum.photos/40?random=4',
                    },
                    {
                        name: '이순신',
                        image: 'https://picsum.photos/40?random=5',
                    },
                ],
                wishList: true,
                articleImageUrl: 'https://picsum.photos/400/300?random=11',
                openStatus: 'finished',
                useStatus: 'COMPLETED',
            },
        });
    }),
];
