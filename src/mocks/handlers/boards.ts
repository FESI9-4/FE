import { http, HttpResponse } from 'msw';
import { Card } from '@/types/card';

// --- GO_TYPE mock 데이터 ---
const goTypeArticlesMap: Record<string, Card[]> = {
    BUSRENTAL_TYPE: [
        {
            article_id: 1,
            create_user: '김민수',
            create_user_profile_img: 'https://randomuser.me/api/portraits/men/10.jpg',
            title: '버스 대절해서 부산 가요~',
            location: '서울 강남구',
            date: 1686600000000,
            deadline: 1686686400000,
            created_at: 1686500000000,
            current_person: 3,
            max_person: 5,
            openStatus: 'finished',
            wish_list: false,
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            useStatus: '모임 예정',
        },
    ],
    COMPANION_TYPE: [
        {
            article_id: 2,
            create_user: '이수진',
            create_user_profile_img: 'https://randomuser.me/api/portraits/women/20.jpg',
            title: '서울 근교 등산 동행 구해요',
            location: '서울 강서구',
            date: 1686700000000,
            deadline: 1686786400000,
            created_at: 1686600000000,
            current_person: 2,
            max_person: 7,
            openStatus: 'waiting',
            wish_list: true,
            image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
            useStatus: '모임 예정',
        },
    ],
    AFTERPARTY_TYPE: [
        {
            article_id: 3,
            create_user: '홍길동',
            create_user_profile_img: 'https://randomuser.me/api/portraits/men/33.jpg',
            title: '콘서트 뒤풀이 같이 가요!',
            location: '서울 중구',
            date: 1686800000000,
            deadline: 1686886400000,
            created_at: 1686700000000,
            current_person: 5,
            max_person: 10,
            openStatus: 'waiting',
            wish_list: false,
            image: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56',
            useStatus: '모임 예정',
        },
    ],
};

// --- DOING_TYPE mock 데이터 ---
const doingTypeArticlesMap: Record<string, Card[]> = {
    TOGETHER_TYPE: [
        {
            article_id: 101,
            create_user: '박지훈',
            create_user_profile_img: 'https://randomuser.me/api/portraits/men/30.jpg',
            title: '팝업스토어 같이 가실 분~',
            location: '서울 마포구',
            date: 1686605000000,
            deadline: 1686691400000,
            created_at: 1686505000000,
            current_person: 1,
            max_person: 3,
            openStatus: 'progressing',
            wish_list: false,
            image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
            useStatus: '모임 예정',
        },
    ],
    BIRTHDAY_TYPE: [
        {
            article_id: 102,
            create_user: '최은영',
            create_user_profile_img: 'https://randomuser.me/api/portraits/women/35.jpg',
            title: '생일 카페 같이 가요!',
            location: '서울 송파구',
            date: 1686705000000,
            deadline: 1686791400000,
            created_at: 1686605000000,
            current_person: 2,
            max_person: 4,
            openStatus: 'progressing',
            wish_list: true,
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            useStatus: '모임 예정',
        },
    ],
    ONLINE_TYPE: [
        {
            article_id: 103,
            create_user: '유재석',
            create_user_profile_img: 'https://randomuser.me/api/portraits/men/50.jpg',
            title: '온라인 콘서트 같이 보실래요?',
            location: '서울 은평구',
            date: 1686750000000,
            deadline: 1686836400000,
            created_at: 1686650000000,
            current_person: 4,
            max_person: 5,
            openStatus: 'waiting',
            wish_list: false,
            image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6',
            useStatus: '모임 예정',
        },
    ],
    TOUR_TYPE: [
        {
            article_id: 104,
            create_user: '장보리',
            create_user_profile_img: 'https://randomuser.me/api/portraits/women/45.jpg',
            title: '덕질 투어 계획중~ 관심있는 분!',
            location: '서울 종로구',
            date: 1686850000000,
            deadline: 1686936400000,
            created_at: 1686750000000,
            current_person: 6,
            max_person: 8,
            openStatus: 'waiting',
            wish_list: true,
            image: 'https://images.unsplash.com/photo-1512149673953-1e251807ec6f',
            useStatus: '모임 예정',
        },
    ],
};

export const boardHandlers = [
    http.get('http://localhost:3000/api/board', async ({ request }) => {
        const url = new URL(request.url);
        const bigCategory = url.searchParams.get('bigCategory');
        const smallCategory = url.searchParams.get('smallCategory');
        const lastArticleId = parseInt(url.searchParams.get('lastArticleId') || '0');
        const limit = parseInt(url.searchParams.get('limit') || '10');

        let articles: Card[] = [];

        if (bigCategory === 'GO_TYPE') {
            if (smallCategory && smallCategory !== 'ALL' && goTypeArticlesMap[smallCategory]) {
                articles = goTypeArticlesMap[smallCategory];
            } else {
                articles = Object.values(goTypeArticlesMap).flat(); // 전체 보기
            }
        } else if (bigCategory === 'DOING_TYPE') {
            if (smallCategory && smallCategory !== 'ALL' && doingTypeArticlesMap[smallCategory]) {
                articles = doingTypeArticlesMap[smallCategory];
            } else {
                articles = Object.values(doingTypeArticlesMap).flat(); // 전체 보기
            }
        }

        const filtered = articles
            .filter((article) => article.article_id > lastArticleId)
            .slice(0, limit);

        return HttpResponse.json({
            statusCode: 200,
            message: '게시글 조회 성공',
            data: filtered,
        });
    }),
];
