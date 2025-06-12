export type BoardParams = {
  bigCategory: string;
  smallCategory?: string;
  location?: string;
  date?: number;
  sort: 'recent' | 'deadline' | 'person';
  sortAsc: boolean;
  lastArticleId: number;
  limit: number;
};

export type Article = { 
    article_id: number;
    title: string;
    location: string;
    date: number;
    deadline: number;
    current_person: number;
    max_person: number;
    openStatus: 'waiting' | 'finished' | 'progressing'; // API 명세서에는 개설 확정, 개설 대기, 개설 취소 인데 ? 우선 카드 섹션 로직에 이렇게 잡혀있어서..
    wish_list: boolean;
    image: string;
    create_user: string;
    create_user_profile_img: string;
    useStatus: '모임 예정' | '모임 완료';
    created_at: number;
};


export type BoardApiResponse = {
  statusCode: number;
  message: string;
  data: Article[];
};
