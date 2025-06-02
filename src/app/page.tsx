import TabSection from '@/components/main/TapSeciton';
import FilterSeciton from '@/components/main/FilterSeciton';
import CardSection from '@/components/main/CardSeciton';

export default function Home() {
    return (
        <div className="w-full h-411.5 sm:h-433.5 xl:h-468.25 px-4 sm:px-6  bg-yellow-300 pt-6 sm:pt-5 xl:pt-8 flex justify-center min-w-85.5">
            <div className="bg-blue-300 w-full h-362.5 sm:h-380 xl:h-394 flex flex-col gap-4 sm:gap-8 xl:gap-10 mt-13.25 sm:mt-16 xl:mt-18.25 xl:max-w-249 max-h-394 ">
                <TabSection />
                <FilterSeciton />
                <CardSection />
            </div>
        </div>
    );
}
