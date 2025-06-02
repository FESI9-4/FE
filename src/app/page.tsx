'use client';

import Tab from '@/components/ui/Tab';
import { DoTogetherIcon, GoTogetherIcon } from '@/assets';
import { useState } from 'react';

export default function Home() {
    const [activeTab, setActiveTab] = useState<number>(0);
    return (
        <div className="w-full h-411.5 sm:h-433.5 xl:h-468.25 px-4 sm:px-6  bg-yellow-300 pt-6 sm:pt-5 xl:pt-8 flex justify-center">
            <div className="bg-blue-300 w-full h-362.5 sm:h-380 xl:h-394 flex justify-center mt-13.25 sm:mt-16 xl:mt-18.25 xl:max-w-249 max-h-394 ">
                <div className="w-full h-12 flex xl:w-70 bg-amber-600">
                    <Tab
                        icon={<GoTogetherIcon width={24} height={24} />}
                        active={activeTab === 0}
                        onClick={() => setActiveTab(0)}
                        className="w-full"
                    >
                        같이 가요
                    </Tab>
                    <Tab
                        icon={<DoTogetherIcon width={24} height={24} />}
                        active={activeTab === 1}
                        onClick={() => setActiveTab(1)}
                        className="w-full"
                    >
                        같이 해요
                    </Tab>
                </div>
            </div>
        </div>
    );
}
