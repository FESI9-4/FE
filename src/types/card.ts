export type Card = {
    article_id: number;
    title: string;
    location: string;
    date: number; // api 명세서 ...
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

// Article이랑 중복이긴한데 나중에 하나로 묶어야할듯합니다 코드 병합되고나서
