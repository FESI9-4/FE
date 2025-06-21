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
            profile_image_url: string;
            nickname: string;
        }[];
        wishList: boolean;
        articleImageUrl: string;
        openStatus: 'CONFIRMED_STATUS' | 'PENDING_STATUS' | 'CANCELED_STATUS'; 
        useStatus: 'UPCOMING_STATUS' | 'COMPLETED_STATUS';
    };
}
