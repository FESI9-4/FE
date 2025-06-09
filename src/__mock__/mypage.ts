export const MyCardListMok = {
    totalPage: 10,
    currentPage: 1,
    data: [
        {
            fanpal_id: 1,
            title: '서울 맛집 투어',
            location: '서울 강남구',
            date: 1748933344, // 2025년 5월 1일
            currentPerson: 3,
            maxPerson: 6,
            openStatus: 'waiting',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
            createdUser: 'foodie123',
            createdUserProfileImg:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
            useStatus: 'schedule',
        },
        {
            fanpal_id: 2,
            title: '부산 해운대 여행',
            location: '부산 해운대구',
            date: 1748846944, // 2025년 4월 30일
            currentPerson: 5,
            maxPerson: 8,
            openStatus: 'finished',
            image: 'https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7',
            createdUser: 'traveler456',
            createdUserProfileImg:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
            useStatus: 'done',
        },
        {
            fanpal_id: 3,
            title: '제주도 한라산 등반',
            location: '제주 제주시',
            date: 1748760544, // 2025년 4월 29일
            currentPerson: 7,
            maxPerson: 10,
            openStatus: 'progressing',
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
            createdUser: 'hiker789',
            createdUserProfileImg:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            useStatus: 'schedule',
        },
        {
            fanpal_id: 4,
            title: '인천 차이나타운 투어',
            location: '인천 중구',
            date: 1748674144, // 2025년 4월 28일
            currentPerson: 10,
            maxPerson: 12,
            openStatus: 'canceled',
            image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b',
            createdUser: 'explorer101',
            createdUserProfileImg:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            useStatus: 'schedule',
        },
    ],
};

export const CardListMok = {
    totalPage: 10,
    currentPage: 1,
    data: [
        {
            fanpal_id: 1,
            title: '서울 맛집 투어',
            location: '서울 강남구',
            date: 1748933344, // 2025년 5월 1일
            deadline: 1748846944, // 2025년 4월 30일
            currentPerson: 3,
            maxPerson: 6,
            openStatus: 'waiting',
            wishList: true,
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
            createdUser: 'foodie123',
            createdUserProfileImg:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        },
        {
            fanpal_id: 2,
            title: '부산 해운대 여행',
            location: '부산 해운대구',
            date: 1748846944, // 2025년 4월 30일
            deadline: 1748760544, // 2025년 4월 29일
            currentPerson: 5,
            maxPerson: 8,
            openStatus: 'finished',
            wishList: false,
            image: 'https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7',
            createdUser: 'traveler456',
            createdUserProfileImg:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        },
        {
            fanpal_id: 3,
            title: '제주도 한라산 등반',
            location: '제주 제주시',
            date: 1748760544, // 2025년 4월 29일
            deadline: 1748674144, // 2025년 4월 28일
            currentPerson: 7,
            maxPerson: 10,
            openStatus: 'progressing',
            wishList: true,
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
            createdUser: 'hiker789',
            createdUserProfileImg:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        },
        {
            fanpal_id: 4,
            title: '인천 차이나타운 투어',
            location: '인천 중구',
            date: 1748674144, // 2025년 4월 28일
            deadline: 1748587744, // 2025년 4월 27일
            currentPerson: 10,
            maxPerson: 12,
            openStatus: 'progressing',
            wishList: false,
            image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b',
            createdUser: 'explorer101',
            createdUserProfileImg:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        },
    ],
};

export const QuestionListMok = {
    totalPage: 10,
    currentPage: 1,
    data: [
        {
            comment_id: 1,
            title: '서울 맛집 투어',
            location: '서울 강남구',
            createdAt: 1748933344,
            comment: '식사 시간은 언제인가요?',
            answer: {
                nickname: 'foodie123',
                profileImage:
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
                content: '오후 12시에 만나서 점심 식사를 할 예정입니다.',
                createdAt: 1748933344,
            },
        },
        {
            comment_id: 2,
            title: '부산 해운대 여행',
            location: '부산 해운대구',
            createdAt: 1748846944,
            comment: '숙소는 어떻게 되나요?',
            answer: {
                nickname: 'traveler456',
                profileImage:
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
                content: '해운대 근처 호텔에서 1박 2일로 진행됩니다.',
                createdAt: 1748846944,
            },
        },
        {
            comment_id: 3,
            title: '제주도 한라산 등반',
            location: '제주 제주시',
            createdAt: 1748760544,
            comment: '등산 장비는 준비해야 하나요?',
            answer: {
                nickname: 'hiker789',
                profileImage:
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
                content: '네, 등산화와 등산 스틱은 필수입니다.',
                createdAt: 1748760544,
            },
        },
        {
            comment_id: 4,
            title: '인천 차이나타운 투어',
            location: '인천 중구',
            createdAt: 1748674144,
            comment: '식사는 포함인가요?',
            answer: {
                nickname: 'explorer101',
                profileImage:
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
                content: '네, 점심 식사가 포함되어 있습니다.',
                createdAt: 1748674144,
            },
        },
        {
            comment_id: 5,
            title: '서울 맛집 투어',
            location: '서울 강남구',
            createdAt: 1748587744,
            comment: '예약은 어떻게 하나요?',
            answer: {
                nickname: 'foodie123',
                profileImage:
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
                content: '참여하기 버튼을 눌러주시면 됩니다.',
                createdAt: 1748587744,
            },
        },
        {
            comment_id: 6,
            title: '부산 해운대 여행',
            location: '부산 해운대구',
            createdAt: 1748501344,
            comment: '해수욕장 이용 시간은 어떻게 되나요?',
        },
        {
            comment_id: 7,
            title: '제주도 한라산 등반',
            location: '제주 제주시',
            createdAt: 1748414944,
            comment: '등반 코스는 어떤 것이 있나요?',
        },
        {
            comment_id: 8,
            title: '인천 차이나타운 투어',
            location: '인천 중구',
            createdAt: 1748328544,
            comment: '투어 시간은 얼마나 걸리나요?',
        },
        {
            comment_id: 9,
            title: '서울 맛집 투어',
            location: '서울 강남구',
            createdAt: 1748242144,
            comment: '식사 메뉴는 어떻게 되나요?',
        },
        {
            comment_id: 10,
            title: '부산 해운대 여행',
            location: '부산 해운대구',
            createdAt: 1748155744,
            comment: '교통편은 어떻게 되나요?',
        },
    ],
};

export const AnswerListMok = {
    totalPage: 10,
    currentPage: 1,
    data: [
        {
            fanpal_id: 1,
            title: '서울 맛집 투어',
            location: '서울 강남구',
            createdAt: 1748933344,
            comment: '식사 시간은 언제인가요?',
            answer: true,
        },
        {
            fanpal_id: 2,
            title: '부산 해운대 여행',
            location: '부산 해운대구',
            createdAt: 1749389854,
            comment: '숙소는 어떻게 되나요?',
            answer: false,
        },
        {
            fanpal_id: 3,
            title: '제주도 한라산 등반',
            location: '제주 제주시',
            createdAt: 1748760544,
            comment: '등산 장비는 준비해야 하나요?',
            answer: true,
        },
        {
            fanpal_id: 4,
            title: '인천 차이나타운 투어',
            location: '인천 중구',
            createdAt: 1749449854,
            comment: '식사는 포함인가요?',
            answer: false,
        },
        {
            fanpal_id: 5,
            title: '서울 맛집 투어',
            location: '서울 강남구',
            createdAt: 1748587744,
            comment: '예약은 어떻게 하나요?',
            answer: true,
        },
    ],
};
