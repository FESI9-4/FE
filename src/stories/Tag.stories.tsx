import type { Meta, StoryObj } from '@storybook/nextjs';
import Tag from '@/components/ui/Tag';

const meta: Meta<typeof Tag> = {
    title: 'UI/Tag',
    component: Tag,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'CardList에 표시되는 태그 컴포넌트입니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: { type: 'text' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: '마감임박',
    },
    render: (args) => (
        <div className="relative w-40 h-20 bg-gray-200 rounded-lg">
            <Tag>{args.children}</Tag>
        </div>
    ),
};
