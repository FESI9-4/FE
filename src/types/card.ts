export type Card = {
    articleId: number;
    title: string;
    location: string;
    date: number;
    deadLine: number;
    currentPerson: number;
    maxPerson: number;
    openStatus: 'CONFIRMED_STATUS' | 'PENDING_STATUS' | 'CANCELED_STATUS';
    wish: boolean;
    image: string;
    createUser: string;
    createUserProfileImg: string;
    useStatus: 'UPCOMING_STATUS' | 'COMPLETED_STATUS';
    createdAt: number;
};
