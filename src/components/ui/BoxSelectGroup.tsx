'use client';
import BoxSelect from './BoxSelect';
export type Categories = {
    id: string;
    title: string;
    subTitle: string;
    bigCategory: string;
    smallCategory: string;
};
//박스 셀렉트에 들어강 카테고리 정보
const categories: Categories[] = [
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
function BoxSelectGroup() {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        console.log(id, checked);
    };
    return (
        <div className="flex flex-col w-full ">
            <label className="mb-4 font-semibold text-sm leading-5 text-gray-900">
                선택 서비스
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {categories.map((category) => (
                    <BoxSelect
                        key={category.id}
                        category={category}
                        onChange={handleChange}
                    />
                ))}
            </div>
        </div>
    );
}

export default BoxSelectGroup;
