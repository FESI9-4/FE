import { http, HttpResponse } from 'msw';
import { Card } from '@/types/card';

const now = Date.now();
const oneDay = 1000 * 60 * 60 * 24;

// --- GO_TYPE 목데이터 (오늘 기준 + 1~60일 이내) ---
const goTypeArticlesMap: Record<string, Card[]> = {
  BUSRENTAL_TYPE: [
    {
      article_id: 1,
      create_user: '김민수',
      create_user_profile_img: 'https://randomuser.me/api/portraits/women/35.jpg',
      title: '버스 대절해서 부산 가요~',
      location: '서울 강남구',
      date: now + oneDay * 10,
      deadline: now + oneDay * 15,
      created_at: now - oneDay * 2,
      current_person: 3,
      max_person: 5,
      openStatus: 'finished',
      wish_list: false,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      useStatus: '모임 예정',
    },
    {
      article_id: 4,
      create_user: '박지훈',
      create_user_profile_img: 'https://randomuser.me/api/portraits/men/40.jpg',
      title: '경기에서 버스 대절해요, 같이 가요!',
      location: '경기 수원시',
      date: now + oneDay * 8,
      deadline: now + oneDay * 14,
      created_at: now - oneDay * 1,
      current_person: 2,
      max_person: 6,
      openStatus: 'waiting',
      wish_list: true,
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
      useStatus: '모임 예정',
    },
  ],
  COMPANION_TYPE: [
    {
      article_id: 2,
      create_user: '이수진',
      create_user_profile_img: 'https://randomuser.me/api/portraits/women/35.jpg',
      title: '서울 근교 등산 동행 구해요',
      location: '서울 강서구',
      date: now + oneDay * 20,
      deadline: now + oneDay * 25,
      created_at: now - oneDay * 1,
      current_person: 2,
      max_person: 7,
      openStatus: 'waiting',
      wish_list: true,
      image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
      useStatus: '모임 예정',
    },
    {
      article_id: 5,
      create_user: '최수진',
      create_user_profile_img: 'https://randomuser.me/api/portraits/women/45.jpg',
      title: '경기 가평 등산 함께하실 분~',
      location: '경기 가평군',
      date: now + oneDay * 18,
      deadline: now + oneDay * 23,
      created_at: now - oneDay * 2,
      current_person: 3,
      max_person: 8,
      openStatus: 'waiting',
      wish_list: false,
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
      useStatus: '모임 예정',
    },
  ],
  AFTERPARTY_TYPE: [
    {
      article_id: 3,
      create_user: '홍길동',
      create_user_profile_img: 'https://randomuser.me/api/portraits/women/35.jpg',
      title: '콘서트 뒤풀이 같이 가요!',
      location: '서울 중구',
      date: now + oneDay * 30,
      deadline: now + oneDay * 35,
      created_at: now - oneDay * 3,
      current_person: 5,
      max_person: 10,
      openStatus: 'waiting',
      wish_list: false,
      image: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56',
      useStatus: '모임 예정',
    },
    {
      article_id: 6,
      create_user: '이민호',
      create_user_profile_img: 'https://randomuser.me/api/portraits/men/42.jpg',
      title: '부산 뒤풀이 갈 사람 모여요',
      location: '부산 해운대구',
      date: now + oneDay * 28,
      deadline: now + oneDay * 33,
      created_at: now - oneDay * 4,
      current_person: 4,
      max_person: 9,
      openStatus: 'waiting',
      wish_list: true,
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
      useStatus: '모임 예정',
    },
  ],
};

// --- DOING_TYPE 목데이터 ---
const doingTypeArticlesMap: Record<string, Card[]> = {
  TOGETHER_TYPE: [
    {
      article_id: 101,
      create_user: '박지훈',
      create_user_profile_img: 'https://randomuser.me/api/portraits/women/35.jpg',
      title: '팝업스토어 같이 가실 분~',
      location: '서울 마포구',
      date: now + oneDay * 5,
      deadline: now + oneDay * 10,
      created_at: now - oneDay * 4,
      current_person: 1,
      max_person: 3,
      openStatus: 'progressing',
      wish_list: false,
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
      useStatus: '모임 예정',
    },
    {
      article_id: 107,
      create_user: '김하늘',
      create_user_profile_img: 'https://randomuser.me/api/portraits/women/44.jpg',
      title: '경기 용인 팝업스토어 같이 가요',
      location: '경기 용인시',
      date: now + oneDay * 7,
      deadline: now + oneDay * 12,
      created_at: now - oneDay * 5,
      current_person: 2,
      max_person: 4,
      openStatus: 'progressing',
      wish_list: true,
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
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
      date: now + oneDay * 15,
      deadline: now + oneDay * 20,
      created_at: now - oneDay * 1,
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
      date: now + oneDay * 12,
      deadline: now + oneDay * 17,
      created_at: now - oneDay * 2,
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
      create_user_profile_img: 'https://randomuser.me/api/portraits/women/35.jpg',
      title: '덕질 투어 계획중~ 관심있는 분!',
      location: '서울 종로구',
      date: now + oneDay * 25,
      deadline: now + oneDay * 30,
      created_at: now - oneDay * 3,
      current_person: 6,
      max_person: 8,
      openStatus: 'waiting',
      wish_list: true,
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
    const lastArticleId = parseInt(url.searchParams.get('lastArticleId') || '0');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    let articles: Card[] = [];

    if (bigCategory === 'GO_TYPE') {
      if (smallCategory && smallCategory !== 'ALL' && goTypeArticlesMap[smallCategory]) {
        articles = goTypeArticlesMap[smallCategory];
      } else {
        articles = Object.values(goTypeArticlesMap).flat();
      }
    } else if (bigCategory === 'DOING_TYPE') {
      if (smallCategory && smallCategory !== 'ALL' && doingTypeArticlesMap[smallCategory]) {
        articles = doingTypeArticlesMap[smallCategory];
      } else {
        articles = Object.values(doingTypeArticlesMap).flat();
      }
    }

    // lastArticleId 필터링
    articles = articles.filter(article => article.article_id > lastArticleId);

    // location 필터링
    if (location && location !== '') {
      articles = articles.filter(article => article.location.includes(location));
    }

    // date 필터링 (선택한 날짜 이후의 게시글만)
    if (date) {
      const filterDate = parseInt(date);
      articles = articles.filter(article => article.date >= filterDate);
    }

    // 정렬 처리
    if (sort) {
      articles.sort((a, b) => {
        let comp = 0;
        if (sort === 'recent') {
          comp = a.created_at - b.created_at;
        } else if (sort === 'deadline') {
          comp = a.deadline - b.deadline;
        } else if (sort === 'person') {
          comp = a.current_person - b.current_person;
        }
        return sortAsc ? comp : -comp;
      });
    }

    // limit 적용
    articles = articles.slice(0, limit);

    return HttpResponse.json({
      statusCode: 200,
      message: '게시글 조회 성공',
      data: articles,
    });
  }),
];
