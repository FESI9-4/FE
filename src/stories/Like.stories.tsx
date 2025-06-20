import type { Meta, StoryObj } from '@storybook/nextjs';
import Like from '@/components/ui/Like';
import { useState } from 'react';

// 상태 관리를 위한 래퍼 컴포넌트
const LikeWithState = ({ initialLike = false }: { initialLike?: boolean }) => {
    const [liked, setLiked] = useState(initialLike);

    return (
        <Like
            like={liked}
            onClick={() => {
                setLiked(!liked);
                console.log(`좋아요 ${!liked ? '추가' : '제거'}`);
            }}
        />
    );
};

const meta: Meta<typeof Like> = {
    title: 'UI/Like',
    component: Like,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark',
            values: [
                { name: 'dark', value: '#1a1a1a' },
                { name: 'light', value: '#ffffff' },
            ],
        },
        docs: {
            description: {
                component:
                    '찜하기 기능을 위한 하트 아이콘 버튼 컴포넌트입니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        like: {
            control: { type: 'boolean' },
            description: '찜하기 상태',
        },
        onClick: {
            description: '찜목록에 추가되는 함수',
            action: 'clicked',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => <LikeWithState initialLike={args.like} />,
    args: {
        like: false,
    },
};

export const AllStates: Story = {
    render: () => (
        <div className="p-8 space-y-8">
            <div className="max-w-2xl space-y-8">
                {/* 인터랙티브 예시 */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-8">
                        <LikeWithState initialLike={false} />
                        <LikeWithState initialLike={true} />
                    </div>
                </div>
            </div>
        </div>
    ),
};
