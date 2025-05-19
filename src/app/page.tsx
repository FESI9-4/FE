'use client';

import {
    ChipInfo,
    ChipState,
    ChipTime,
    Chip,
    Tab,
    Tag,
    ContainerProgress,
    PaginationButton,
    Button,
} from '@/components/ui';
import { useState } from 'react';

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    function handleClick() {
        console.log('click');
    }
    return (
        <div className="flex flex-col gap-2 p-10 bg-black">
            <div className="flex gap-2 p-10 bg-red-500">
                <Chip size="large">전체</Chip>
                <Chip size="small">전체</Chip>
                <Chip size="large" status="active">
                    전체
                </Chip>
                <Chip size="small" status="active">
                    전체
                </Chip>
                <ChipInfo>1월 7일</ChipInfo>
                <ChipInfo variant>1월 7일</ChipInfo>
                <ChipTime status="active">15:00</ChipTime>
                <ChipTime status="inactive">15:00</ChipTime>
                <ChipTime status="disabled">15:00</ChipTime>
            </div>
            <div className="flex gap-2 p-10 bg-blue-500">
                <ChipState status="schedule">개설확정</ChipState>
                <ChipState status="done">이용 완료</ChipState>
                <ChipState status="complete" check>
                    개설확정
                </ChipState>
                <ChipState status="waiting" check>
                    개설대기
                </ChipState>
            </div>
            <div className="flex gap-2 p-10 bg-orange-500">
                <Tab active icon="do">
                    <div>같이 가요</div>
                </Tab>
                <Tab icon="go">
                    <div>같이 해요</div>
                </Tab>
            </div>
            <div className="flex gap-2 p-10 bg-green-500">
                <Tag size="large">내일 20시 마감</Tag>
                <Tag size="small">오늘 21시 마감</Tag>
            </div>
            <div className="flex flex-col gap-2 p-10 bg-purple-500">
                <ContainerProgress max={100} current={50} openStatus={true} />
                <ContainerProgress max={11} current={7} openStatus={false} />
            </div>
            <div className="flex gap-2 p-10 bg-yellow-500 flex-col">
                <PaginationButton
                    currentPage={1}
                    totalPages={10}
                    size="large"
                    onClick={() => setCurrentPage(1)}
                />
                <PaginationButton
                    currentPage={1}
                    totalPages={10}
                    size="small"
                    onClick={() => setCurrentPage(1)}
                />
                <div>{currentPage}</div>
            </div>
            <div className="flex gap-2 p-10 bg-black">
                <Button size="large" onClick={handleClick}>
                    생성하기
                </Button>
                <Button
                    disabled
                    size="large"
                    styled="outline"
                    onClick={handleClick}
                >
                    생성하기
                </Button>
                <Button
                    disabled
                    styled="solid"
                    size="small"
                    onClick={handleClick}
                >
                    생성하기
                </Button>
                <Button styled="outline" size="small" onClick={handleClick}>
                    생성하기
                </Button>
            </div>
        </div>
    );
}
