export type Card = {
    articleId: number;
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

// Article이랑 중복이긴한데 나중에 하나로 묶어야할듯합니다 코드 병합되고나서
