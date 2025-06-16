export type Card = {
    articleId: number;
    title: string;
    location: string;
    date: number;
    deadLine: number;
    currentPerson: number;
    maxPerson: number;
    openStatus: 'waiting' | 'finished' | 'progressing' | 'canceled';
    wishList: boolean;
    image: string;
    createUser: string;
    createUserProfileImg: string;
    useStatus: 'UPCOMING' | 'COMPLETED';
    createdAt: number;
};
