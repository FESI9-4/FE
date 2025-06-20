import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AnswerCard from '@/components/ui/AnswerCard';

const meta: Meta<typeof AnswerCard> = {
    title: 'UI/AnswerCard',
    component: AnswerCard,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    '팬팔 답변 카드 컴포넌트입니다. 답변 상태에 따라 다른 버튼을 표시합니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: { type: 'text' },
            description: '팬팔 제목',
        },
        location: {
            control: { type: 'text' },
            description: '위치',
        },
        createdAt: {
            control: { type: 'number' },
            description: '생성 시간 (timestamp)',
        },
        comment: {
            control: { type: 'text' },
            description: '댓글 내용',
        },
        answer: {
            control: { type: 'boolean' },
            description: '답변 완료 여부',
        },
        fanpalId: {
            control: { type: 'number' },
            description: '팬팔 ID',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 현재 시간을 기준으로 한 적절한 timestamp 생성 (초 단위)
const now = Math.floor(Date.now() / 1000); // 초 단위로 변환

// 기본 스토리 (답변 대기 중)
export const Default: Story = {
    args: {
        title: '아이브 콘서트',
        location: '서울',
        createdAt: now,
        comment:
            '같이 아이브 콘서트 보러 가실 분 구해요! 혼자 가기 아쉬워서 함께 즐길 수 있는 분을 찾고 있습니다.',
        answer: false,
        fanpalId: 123,
    },
};

// 답변 완료 상태
export const Answered: Story = {
    args: {
        title: '아이브 콘서트',
        location: '서울',
        createdAt: now,
        comment:
            '같이 아이브 콘서트 보러 가실 분 구해요! 혼자 가기 아쉬워서 함께 즐길 수 있는 분을 찾고 있습니다.',
        answer: true,
        fanpalId: 123,
    },
};

// 모든 상태를 보여주는 스토리
export const AllStates: Story = {
    render: () => (
        <div className="flex flex-col gap-4 justify-center items-center">
            <AnswerCard
                title="아이브 콘서트"
                location="서울"
                createdAt={now}
                comment="같이 아이브 콘서트 보러 가실 분 구해요! 혼자 가기 아쉬워서 함께 즐길 수 있는 분을 찾고 있습니다."
                answer={false}
                fanpalId={123}
            />

            <AnswerCard
                title="아이브 콘서트"
                location="서울"
                createdAt={now}
                comment="같이 아이브 콘서트 보러 가실 분 구해요! 혼자 가기 아쉬워서 함께 즐길 수 있는 분을 찾고 있습니다."
                answer={true}
                fanpalId={123}
            />
        </div>
    ),
};
