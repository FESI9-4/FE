import type { Meta, StoryObj } from '@storybook/nextjs';
import EditButton from '@/components/ui/EditButton';

const meta: Meta<typeof EditButton> = {
    title: 'UI/EditButton',
    component: EditButton,
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
                    '프로필 편집 기능을 위한 아이콘 버튼 컴포넌트입니다. Profile에서 사용됩니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['small', 'large'],
            description: '버튼 크기',
        },
        color: {
            control: { type: 'select' },
            options: ['green', 'gray'],
            description: '버튼 색상',
        },
        onClick: {
            description: '클릭 시 실행되는 함수',
            action: 'clicked',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 'large',
        color: 'gray',
        onClick: () => console.log('편집 버튼 클릭'),
    },
};

export const AllStates: Story = {
    render: () => (
        <div className="p-8 space-y-8">
            <div className="max-w-2xl space-y-8">
                {/* 크기별 비교 */}
                <div className="space-y-4">
                    <h3 className="text-white text-base font-medium">
                        크기별 비교
                    </h3>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-gray-400 text-sm">
                                Large 크기
                            </h4>
                            <div className="flex items-center gap-6 p-4 bg-gray-800 rounded-lg">
                                <div className="text-center">
                                    <p className="text-gray-400 text-xs mb-2">
                                        Green
                                    </p>
                                    <EditButton
                                        size="large"
                                        color="green"
                                        onClick={() =>
                                            console.log('Large Green 클릭')
                                        }
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-400 text-xs mb-2">
                                        Gray
                                    </p>
                                    <EditButton
                                        size="large"
                                        color="gray"
                                        onClick={() =>
                                            console.log('Large Gray 클릭')
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-gray-400 text-sm">
                                Small 크기
                            </h4>
                            <div className="flex items-center gap-6 p-4 bg-gray-800 rounded-lg">
                                <div className="text-center">
                                    <p className="text-gray-400 text-xs mb-2">
                                        Green
                                    </p>
                                    <EditButton
                                        size="small"
                                        color="green"
                                        onClick={() =>
                                            console.log('Small Green 클릭')
                                        }
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-400 text-xs mb-2">
                                        Gray
                                    </p>
                                    <EditButton
                                        size="small"
                                        color="gray"
                                        onClick={() =>
                                            console.log('Small Gray 클릭')
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
};
