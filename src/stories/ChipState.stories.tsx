import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ChipState from '@/components/ui/ChipState';

const meta: Meta<typeof ChipState> = {
    title: 'UI/ChipState',
    component: ChipState,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    '상태를 나타내는 칩 컴포넌트입니다. 일정과 완료 상태를 표시합니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: { type: 'text' },
            description: '칩 내용',
        },
        status: {
            control: { type: 'select' },
            options: ['schedule', 'done'],
            description: '상태',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (일정)
export const Default: Story = {
    args: {
        children: '오늘 12시 마감',
        status: 'schedule',
    },
};

// 모든 상태 비교
export const AllStates: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <ChipState status="schedule">오늘 12시 마감</ChipState>
            <ChipState status="done">모집 완료</ChipState>
        </div>
    ),
};
