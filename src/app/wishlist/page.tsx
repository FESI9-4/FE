import { TabSection, FilterSection, CardSection } from '@/components/main';
import { mockCards } from '@/__mock__/cards';

export default function WishList() {
    return (
        <div>
            <div className="w-full px-10 h-21 hidden sm:block sm:pt-24 xl:pt-28 max-w-249 m-auto ">
                <p className='flex flex-col gap-2'>
                    <span className='text-white text-2xl font-semibold'>찜한 팬팔</span>
                    <span className='text-sm font-medium text-gray-300'>마감되기 전에 지금 바로 참여해보세요 👀</span>
                </p>
            </div>
            <div className="w-full px-4 sm:px-6 pt-6 sm:pt-25 xl:pt-18 flex justify-center min-w-98 min-h-screen max-w-249 m-auto ">
                <div className="w-full flex flex-col gap-4 sm:gap-8 xl:gap-10 mt-13.25 sm:mt-0 xl:mt-0 ">
                    <TabSection showCreateButton={false} />
                    <FilterSection />
                    <CardSection showCreateButton={false} cards={mockCards} />
                </div>
            </div>
        </div>
    );
}
