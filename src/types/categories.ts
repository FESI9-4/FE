export type Categories = {
    id: string;
    title: string;
    smallCategory: {
        id: string;
        name: string;
    }[];
};
//박스 셀렉트에 들어강 카테고리 정보
// 🎯 박스 셀렉터용 카테고리 데이터
export const CATEGORY_DATA: Categories[] = [
    {
        id: 'GO_TYPE',
        title: '같이 가요',
        smallCategory: [
            { id: 'BUSRENTAL_TYPE', name: '버스 대절' },
            { id: 'COMPANION_TYPE', name: '동행' },
            { id: 'AFTERPARTY_TYPE', name: '뒤풀이' },
        ],
    },
    {
        id: 'DOING_TYPE',
        title: '같이 해요',
        smallCategory: [
            { id: 'TOGETHER_TYPE', name: '팝업' },
            { id: 'BIRTHDAY_TYPE', name: '생일카페' },
            { id: 'ONLINE_TYPE', name: '온라인콘서트' },
            { id: 'TOUR_TYPE', name: '덕질투어' },
        ],
    },
];
