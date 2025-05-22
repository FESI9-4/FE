'use client';

import {
    Button,
    Chip,
    ChipInfo,
    ChipState,
    ChipTime,
    ContainerProgress,
    Tag,
} from '@/components/ui';

export default function Home() {
    return (
        <div className="text-3xl font-bold bg-black h-screen flex flex-col gap-4 p-10">
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

            <Button>버튼</Button>
            <Chip>칩</Chip>
            <ChipTime>칩타임</ChipTime>
            <ChipInfo>칩정보</ChipInfo>
            <ChipState>칩상태</ChipState>
        </div>
    );
}
