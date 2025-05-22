'use client';

import {
    Button,
    Chip,
    ChipInfo,
    ChipState,
    ChipTime,
    ContainerProgress,
    Tab,
    Tag,
} from '@/components/ui';
import { UserIcon } from '@/assets';
import { useState } from 'react';

export default function Home() {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div className="text-3xl font-bold bg-black h-screen flex flex-col gap-4 p-10">
            <Tab
                icon={<UserIcon width={24} height={24} />}
                active={activeTab === 0}
                onClick={() => setActiveTab(0)}
            >
                텝
            </Tab>
            <Tab
                icon={<UserIcon width={24} height={24} />}
                active={activeTab === 1}
                onClick={() => setActiveTab(1)}
            >
                텝2
            </Tab>
            <Tag>오늘 12시 마감</Tag>
            <ContainerProgress
                max={10}
                current={3}
                openStatus="waiting"
                deadline="1월 5일 12:00"
            />
            <ContainerProgress
                max={10}
                current={5}
                openStatus="progressing"
                deadline="1월 5일 12:00"
            />
            <ContainerProgress
                max={10}
                current={10}
                openStatus="finished"
                deadline="1월 5일 12:00"
            />
            <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                    <Button size="large" onClick={() => console.log('클릭')}>
                        버튼
                    </Button>
                    <Button
                        size="large"
                        disabled
                        onClick={() => console.log('클릭')}
                    >
                        버튼
                    </Button>
                    <Button
                        size="large"
                        styled="outline"
                        onClick={() => console.log('클릭')}
                    >
                        버튼
                    </Button>
                    <Button
                        size="large"
                        styled="outline"
                        disabled
                        onClick={() => console.log('클릭')}
                    >
                        버튼
                    </Button>
                </div>
                <div className="flex flex-col gap-2">
                    <Button size="small">버튼</Button>
                    <Button size="small" disabled>
                        버튼
                    </Button>
                    <Button size="small" styled="outline">
                        버튼
                    </Button>
                    <Button size="small" styled="outline" disabled>
                        버튼
                    </Button>
                </div>
            </div>

            <Chip>칩</Chip>
            <ChipTime>칩타임</ChipTime>
            <ChipInfo>칩정보</ChipInfo>
            <ChipState>칩상태</ChipState>
        </div>
    );
}
