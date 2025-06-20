import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Button from '@/components/ui/Button';

const meta: Meta<typeof Button> = {
    title: 'UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: '공용 버튼 컴포넌트입니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['small', 'large'],
        },
        styled: {
            control: { type: 'select' },
            options: ['solid', 'outline'],
        },
        disabled: {
            control: { type: 'boolean' },
        },
        children: {
            control: { type: 'text' },
        },
        onClick: { action: 'clicked' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
    args: {
        children: 'Button',
        size: 'large',
        styled: 'outline',
        disabled: false,
    },
};

// 모든 조합을 보여주는 스토리
export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex gap-4">
                <Button size="small" styled="solid">
                    Small
                </Button>
                <Button size="small" styled="outline">
                    Small
                </Button>
            </div>
            <div className="flex gap-4">
                <Button size="large" styled="solid">
                    Large
                </Button>
                <Button size="large" styled="outline">
                    Large
                </Button>
            </div>
            <div className="flex gap-4">
                <Button size="small" styled="solid" disabled>
                    Small
                </Button>
                <Button size="small" styled="outline" disabled>
                    Small
                </Button>
            </div>
            <div className="flex gap-4">
                <Button size="large" styled="solid" disabled>
                    Large
                </Button>
                <Button size="large" styled="outline" disabled>
                    Large
                </Button>
            </div>
        </div>
    ),
};
