import { ChipInfo, ChipState, ChipTime, Chip, IcCheck } from '@/components/ui';

export default function Home() {
    return (
        <div className="flex flex-col gap-2 p-10 bg-black">
            <div className="flex gap-2 p-10 bg-red-500">
                <Chip size="large" status="active">
                    전체
                </Chip>
                <Chip size="large" status="default">
                    전체
                </Chip>
                <Chip size="small" status="active">
                    전체
                </Chip>
                <Chip size="small" status="default">
                    전체
                </Chip>
                <ChipInfo>1월 7일</ChipInfo>
                <ChipInfo variant>1월 7일</ChipInfo>
                <ChipTime status="active">13:00</ChipTime>
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
                <IcCheck />
            </div>
        </div>
    );
}
