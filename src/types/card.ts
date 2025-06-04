export type Card = {
    id: number;
    title: string;
    location: string;
    date: string;
    deadline: string;
    currentPerson: number;
    maxPerson: number;
    openStatus: 'waiting' | 'finished' | 'progressing';
    wishList: boolean;
    image: string;
    createdUser: string;
    createdUserProfileImg: string;
};
