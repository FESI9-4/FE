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
    openStatus: 'waiting' | 'finished' | 'progressing';
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
