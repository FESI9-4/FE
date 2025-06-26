import type { Meta, StoryObj } from '@storybook/nextjs';
import Chip from '@/components/ui/Chip';

const meta: Meta<typeof Chip> = {
    title: 'UI/Chip',
    component: Chip,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    '칩 컴포넌트입니다. 다양한 크기와 스타일을 지원합니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: { type: 'text' },
            description: '칩 내용',
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'large'],
            description: '칩 크기',
        },
        styled: {
            control: { type: 'select' },
            options: ['default', 'secondary', 'outline', 'none'],
            description: '칩 스타일',
        },
        onClick: {
            action: 'clicked',
            description: '클릭 이벤트',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
    args: {
        children: '기본 칩',
        size: 'small',
        styled: 'default',
    },
};

// 모든 스타일 비교
export const AllStyles: Story = {
    render: () => (
        <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex gap-2">
                <Chip styled="default">Default</Chip>
                <Chip styled="secondary">Secondary</Chip>
                <Chip styled="outline">Outline</Chip>
                <Chip styled="none">None</Chip>
            </div>
            <div className="flex gap-2">
                <Chip styled="default" size="large">
                    Default
                </Chip>
                <Chip styled="secondary" size="large">
                    Secondary
                </Chip>
                <Chip styled="outline" size="large">
                    Outline
                </Chip>
                <Chip styled="none" size="large">
                    None
                </Chip>
            </div>
        </div>
    ),
};
