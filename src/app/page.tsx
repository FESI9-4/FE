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
            <ContainerProgress max={100} current={50} openStatus={true} />
            <Button>버튼</Button>
            <Chip>칩</Chip>
            <ChipTime>칩타임</ChipTime>
            <ChipInfo>칩정보</ChipInfo>
            <ChipState>칩상태</ChipState>
        </div>
    );
}
