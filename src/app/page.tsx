import { TabSection, FilterSection, CardSection } from '@/components/main';
import { mockCards } from '@/__mock__/cards';

//TODO api 연결부 필터링, 카드 데이터, 페이지네이션,
// 우선 레이아웃 pr 먼저 -> api 작업완료 순으로 진행예정

export default function Home() {
    return (
        <div className="w-full px-4 sm:px-6 pt-6 sm:pt-5 xl:pt-8 flex justify-center min-w-93.75 min-h-screen max-w-249 m-auto ">
            <div className="w-full flex flex-col gap-4 sm:gap-8 xl:gap-10 mt-13.25 sm:mt-16 xl:mt-18.25 ">
                <TabSection />
                <FilterSection />
                <CardSection cards={mockCards} />
            </div>
        </div>
    );
}
