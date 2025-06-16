export interface DetailApiResponse {
    statusCode: number;
    message: string;
    data: {
        createUser: string;
        createUserProfileImgUrl: string;
        title: string;
        location: string;
        latitude: number;
        longitude: number;
        description: string;
        date: number;
        deadLine: number;
        createdAt: number;
        minPerson: number;
        currentPerson: number;
        maxPerson: number;
        participants: {
            name: string;
            image: string;
        }[];
        wishList: boolean;
        articleImageUrl: string;
        openStatus: 'waiting' | 'finished' | 'progressing' | 'canceled';
        useStatus: 'UPCOMING' | 'COMPLETED';
    };
}
