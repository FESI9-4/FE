'use client';

import Tab from '@/components/ui/Tab';
import { DoTogetherIcon, GoTogetherIcon } from '@/assets';
import { useState } from 'react';

export default function TapSeciton() {
    const [activeTab, setActiveTab] = useState<number>(0);
    return (
        <div className='w-full h-23 bg-blue-700 sm:h-31 xl:h-53 flex justify-center'>
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
    );
}
