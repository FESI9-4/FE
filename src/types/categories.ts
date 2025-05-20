export type Categories = {
    id: string;
    title: string;
    subTitle: string;
    bigCategory: string;
    smallCategory: string;
};
//박스 셀렉트에 들어강 카테고리 정보
export const categories: Categories[] = [
    {
        id: 'A01',
        title: '같이 가요',
        subTitle: '버스 대절',
        bigCategory: 'go',
        smallCategory: 'rentBus',
    },
    {
        id: 'A02',
        title: '같이 가요',
        subTitle: '동행',
        bigCategory: 'go',
        smallCategory: 'accompany',
    },
    {
        id: 'A03',
        title: '같이 가요',
        subTitle: '뒤풀이',
        bigCategory: 'go',
        smallCategory: 'afterParty',
    },
    {
        id: 'A04',
        title: '같이 해요',
        subTitle: '팝업',
        bigCategory: 'go',
        smallCategory: 'popup',
    },
    {
        id: 'A05',
        title: '같이 해요',
        subTitle: '생일 카페',
        bigCategory: 'go',
        smallCategory: 'birthdayCafe',
    },
    {
        id: 'A06',
        title: '같이 해요',
        subTitle: '온라인 콘서트',
        bigCategory: 'go',
        smallCategory: 'onlineConcert',
    },
    {
        id: 'A07',
        title: '같이 해요',
        subTitle: '덕질 투어',
        bigCategory: 'go',
        smallCategory: 'fandomTour',
    },
];
