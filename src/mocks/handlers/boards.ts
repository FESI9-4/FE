import { http, HttpResponse } from 'msw';
import { Card } from '@/types/card';

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

const goTypeArticlesMap: Record<string, Card[]> = {
    BUSRENTAL_TYPE: [
        {
            articleId: 1,
            createUser: '김민수',
            createUserProfileImg:
                'https://randomuser.me/api/portraits/women/35.jpg',
            title: '버스 대절해서 부산 가요~',
            location: '서울 강남구',
            date: getDateAfterDays(10),
            deadLine: getDateAfterDays(15),
            createdAt: getDateBeforeDays(2),
            currentPerson: 3,
            maxPerson: 5,
            openStatus: 'finished',
            wishList: false,
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            useStatus: '모임 예정',
        },
        {
            articleId: 4,
            createUser: '박지훈',
            createUserProfileImg:
                'https://randomuser.me/api/portraits/men/40.jpg',
            title: '경기에서 버스 대절해요, 같이 가요!',
            location: '경기 수원시',
            date: getDateAfterDays(8),
            deadLine: getDateAfterDays(14),
            createdAt: getDateBeforeDays(1),
            currentPerson: 2,
            maxPerson: 6,
            openStatus: 'waiting',
            wishList: true,
            image: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
            useStatus: '모임 예정',
        },
    ],
    COMPANION_TYPE: [
        {
            articleId: 2,
            createUser: '이수진',
            createUserProfileImg:
                'https://randomuser.me/api/portraits/women/35.jpg',
            title: '서울 근교 등산 동행 구해요',
            location: '서울 강서구',
            date: getDateAfterDays(20),
            deadLine: getDateAfterDays(25),
            createdAt: getDateBeforeDays(1),
            currentPerson: 2,
            maxPerson: 7,
            openStatus: 'waiting',
            wishList: true,
            image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
            useStatus: '모임 예정',
        },
        {
            articleId: 5,
            createUser: '최수진',
            createUserProfileImg:
                'https://randomuser.me/api/portraits/women/45.jpg',
            title: '경기 가평 등산 함께하실 분~',
            location: '경기 가평군',
            date: getDateAfterDays(18),
            deadLine: getDateAfterDays(23),
            createdAt: getDateBeforeDays(2),
            currentPerson: 3,
            maxPerson: 8,
            openStatus: 'waiting',
            wishList: false,
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
            useStatus: '모임 예정',
        },
    ],
    AFTERPARTY_TYPE: [
        {
            articleId: 3,
            createUser: '홍길동',
            createUserProfileImg:
                'https://randomuser.me/api/portraits/women/35.jpg',
            title: '콘서트 뒤풀이 같이 가요!',
            location: '서울 중구',
            date: getDateAfterDays(30),
            deadLine: getDateAfterDays(35),
            createdAt: getDateBeforeDays(3),
            currentPerson: 5,
            maxPerson: 10,
            openStatus: 'waiting',
            wishList: false,
            image: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56',
            useStatus: '모임 예정',
        },
        {
            articleId: 6,
            createUser: '이민호',
            createUserProfileImg:
                'https://randomuser.me/api/portraits/men/42.jpg',
            title: '부산 뒤풀이 갈 사람 모여요',
            location: '부산 해운대구',
            date: getDateAfterDays(28),
            deadLine: getDateAfterDays(33),
            createdAt: getDateBeforeDays(4),
            currentPerson: 4,
            maxPerson: 9,
            openStatus: 'waiting',
            wishList: true,
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
            useStatus: '모임 예정',
        },
    ],
};

const doingTypeArticlesMap: Record<string, Card[]> = {
    TOGETHER_TYPE: [
        {
            articleId: 101,
            createUser: '박지훈',
            createUserProfileImg:
                'https://randomuser.me/api/portraits/women/35.jpg',
            title: '팝업스토어 같이 가실 분~',
            location: '서울 마포구',
            date: getDateAfterDays(5),
            deadLine: getDateAfterDays(10),
            createdAt: getDateBeforeDays(4),
            currentPerson: 1,
            maxPerson: 3,
            openStatus: 'progressing',
            wishList: false,
            image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
            useStatus: '모임 예정',
        },
        {
            articleId: 107,
            createUser: '김하늘',
            createUserProfileImg:
                'https://randomuser.me/api/portraits/women/44.jpg',
            title: '경기 용인 팝업스토어 같이 가요',
            location: '경기 용인시',
            date: getDateAfterDays(7),
            deadLine: getDateAfterDays(12),
            createdAt: getDateBeforeDays(5),
            currentPerson: 2,
            maxPerson: 4,
            openStatus: 'progressing',
            wishList: true,
            image: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
            useStatus: '모임 예정',
        },
    ],
    BIRTHDAY_TYPE: [
        {
            articleId: 102,
            createUser: '최은영',
            createUserProfileImg:
                'https://randomuser.me/api/portraits/women/35.jpg',
            title: '생일 카페 같이 가요!',
            location: '서울 송파구',
            date: getDateAfterDays(15),
            deadLine: getDateAfterDays(20),
            createdAt: getDateBeforeDays(1),
            currentPerson: 2,
            maxPerson: 4,
            openStatus: 'progressing',
            wishList: true,
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            useStatus: '모임 예정',
        },
    ],
    ONLINE_TYPE: [
        {
            articleId: 103,
            createUser: '유재석',
            createUserProfileImg:
                'https://randomuser.me/api/portraits/men/50.jpg',
            title: '온라인 콘서트 같이 보실래요?',
            location: '서울 은평구',
            date: getDateAfterDays(12),
            deadLine: getDateAfterDays(17),
            createdAt: getDateBeforeDays(2),
            currentPerson: 4,
            maxPerson: 5,
            openStatus: 'waiting',
            wishList: false,
            image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6',
            useStatus: '모임 예정',
        },
    ],
    TOUR_TYPE: [
        {
            articleId: 104,
            createUser: '장보리',
            createUserProfileImg:
                'https://randomuser.me/api/portraits/women/35.jpg',
            title: '덕질 투어 계획중~ 관심있는 분!',
            location: '서울 종로구',
            date: getDateAfterDays(25),
            deadLine: getDateAfterDays(30),
            createdAt: getDateBeforeDays(3),
            currentPerson: 6,
            maxPerson: 8,
            openStatus: 'waiting',
            wishList: true,
            image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
            useStatus: '모임 예정',
        },
    ],
};

export const boardHandlers = [
    http.get('http://localhost:3000/api/board', async ({ request }) => {
        const url = new URL(request.url);
        const bigCategory = url.searchParams.get('bigCategory');
        const smallCategory = url.searchParams.get('smallCategory');
        const location = url.searchParams.get('location');
        const date = url.searchParams.get('date');
        const sort = url.searchParams.get('sort');
        const sortAsc = url.searchParams.get('sortAsc') === 'true';
        const lastArticleId = parseInt(
            url.searchParams.get('lastArticleId') || '0'
        );
        const limit = parseInt(url.searchParams.get('limit') || '10');

        let articles: Card[] = [];

        if (bigCategory === 'GO_TYPE') {
            if (
                smallCategory &&
                smallCategory !== 'ALL' &&
                goTypeArticlesMap[smallCategory]
            ) {
                articles = goTypeArticlesMap[smallCategory];
            } else {
                articles = Object.values(goTypeArticlesMap).flat();
            }
        } else if (bigCategory === 'DOING_TYPE') {
            if (
                smallCategory &&
                smallCategory !== 'ALL' &&
                doingTypeArticlesMap[smallCategory]
            ) {
                articles = doingTypeArticlesMap[smallCategory];
            } else {
                articles = Object.values(doingTypeArticlesMap).flat();
            }
        }

        articles = articles.filter(
            (article) => article.articleId > lastArticleId
        );

        if (location && location !== '') {
            articles = articles.filter((article) =>
                article.location.includes(location)
            );
        }

        if (date) {
            const filterDate = parseInt(date);
            articles = articles.filter((article) => article.date >= filterDate);
        }

        if (sort) {
            articles.sort((a, b) => {
                let comp = 0;
                if (sort === 'recent') {
                    comp = a.createdAt - b.createdAt;
                } else if (sort === 'deadLine') {
                    comp = a.deadLine - b.deadLine;
                } else if (sort === 'person') {
                    comp = a.currentPerson - b.currentPerson;
                }
                return sortAsc ? comp : -comp;
            });
        }

        articles = articles.slice(0, limit);

        return HttpResponse.json({
            statusCode: 200,
            message: '게시글 조회 성공',
            data: articles,
        });
    }),
];
