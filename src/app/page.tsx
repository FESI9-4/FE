'use client';

import { DoTogetherIcon, GoTogetherIcon } from '@/assets';
import {
    Button,
    Chip,
    ChipState,
    ContainerProgress,
    Tab,
    Tag,
} from '@/components/ui';
import { useState } from 'react';

export default function Home() {
    const [activeTab, setActiveTab] = useState<number>(0);
    return (
        <div className="text-3xl font-bold bg-black h-screen flex flex-col gap-4 p-4">
            <div className="flex">
                <Tab
                    icon={<GoTogetherIcon width={24} height={24} />}
                    active={activeTab === 0}
                    onClick={() => setActiveTab(0)}
                >
                    같이 가요
                </Tab>
                <Tab
                    icon={<DoTogetherIcon width={24} height={24} />}
                    active={activeTab === 1}
                    onClick={() => setActiveTab(1)}
                >
                    같이 해요
                </Tab>
            </div>
            <Tag>test</Tag>
            <div className="gap-2">
                <Chip disabled>default</Chip>
                <Chip disabled styled="secondary">
                    secondary
                </Chip>
                <Chip disabled styled="outline">
                    outline
                </Chip>
                <Chip disabled styled="none">
                    none
                </Chip>
                <Chip size="large" styled="default">
                    large
                </Chip>
                <Chip size="large" styled="secondary">
                    large
                </Chip>
                <Chip size="large" styled="outline">
                    large
                </Chip>
                <Chip size="large" styled="none">
                    large
                </Chip>
            </div>
            <div className="flex gap-2 justify-center flex-col">
                <ContainerProgress
                    max={10}
                    current={5}
                    openStatus="waiting"
                    deadline="2025-05-23"
                />
                <ContainerProgress
                    max={10}
                    current={5}
                    openStatus="progressing"
                    deadline="2025-05-23"
                />
                <ContainerProgress
                    max={10}
                    current={5}
                    openStatus="finished"
                    deadline="2025-05-23"
                />
            </div>
            <div className="flex gap-2 justify-center flex-col">
                <Button>default</Button>
                <Button disabled>disabled</Button>
                <Button size="large" styled="outline">
                    outline
                </Button>
                <Button disabled size="large" styled="outline">
                    large
                </Button>
            </div>
            <div className="flex gap-2">
                <ChipState>default</ChipState>
                <ChipState status="done">done</ChipState>
            </div>
        </div>
    );
}
