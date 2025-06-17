export type Card = {
    fanpal_id: number;
    title: string;
    location: string;
    date: number; // api 명세서 ...
    deadLine: number;
    currentPerson: number;
    maxPerson: number;
    openStatus: 'waiting' | 'finished' | 'progressing';
    wishList: boolean;
    image: string;
    createUser: string;
    createUserProfileImg: string;
    useStatus: 'UPCOMING' | 'COMPLETED';
    createdAt: number;
};

export type SelfCard = {
    fanpal_id: number;
    title: string;
    location: string;
    date: number;
    deadline: number;
    createdAt: number;
    currentPerson: number;
    maxPerson: number;
    openStatus: 'waiting' | 'finished' | 'progressing';
    wishList: boolean;
    image: string;
    useStatus: 'UPCOMING' | 'COMPLETED';
    createUser: string;
    createUserProfileImg: string;
    totalPage: number;
};

export type Question = {
    comment_id: number;
    title: string;
    location: string;
    createdAt: number;
    comment: string;
    answer?: {
        nickname: string;
        profileImage: string;
        content: string;
        createdAt: number;
    };
};

export type Answer = {
    fanpal_id: number;
    title: string;
    location: string;
    createdAt: number;
    comment: string;
    answer: boolean;
};

export interface MyPageResponse {
    totalPage: number;
    data: Card[];
}

export interface SelfMypageResponse {
    totalPage: number;
    data: SelfCard[];
}

export interface QuestionListResponse {
    totalCount: number;
    data: Question[];
}

export interface AnswerListResponse {
    totalCount: number;
    data: Answer[];
}
