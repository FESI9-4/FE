import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from '@/components/ui/Button';

// LoginModal의 내용만 보여주는 컴포넌트
const LoginModalContent = () => {
    return (
        <div className="fixed inset-0 bg-[#00000099] backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-xl overflow-hidden">
                <div className="w-75 h-45 md:w-105 md:h-52.5 flex items-center justify-center">
                    <div className="w-63 h-30 md:w-91 md:h-34 flex flex-col gap-6 md:gap-7">
                        <div className="flex flex-col gap-6 h-41">
                            <div className="h-14 md:h-15 flex flex-col gap-1 md:gap-2">
                                <p className="text-white text-lg font-semibold flex justify-center">
                                    로그인이 필요해요
                                </p>
                                <p className="text-gray-400 text-base font-light flex justify-center">
                                    지금 로그인하고 팬팔에 참여해보세요!
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 h-10 md:h-12">
                            <Button
                                size="large"
                                onClick={() => console.log('취소')}
                                styled="outline"
                            >
                                취소
                            </Button>
                            <Button
                                size="large"
                                onClick={() => console.log('확인')}
                            >
                                확인
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const meta: Meta<typeof LoginModalContent> = {
    title: 'UI/Modal/LoginModal',
    component: LoginModalContent,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    '로그인이 필요한 상황에서 사용자에게 로그인을 유도하는 모달 컴포넌트입니다.',
            },
            story: {
                inline: false,
                iframeHeight: 600,
            },
        },
        backgrounds: {
            default: 'light',
        },
        nextjs: {
            appDirectory: true,
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
    render: () => <LoginModalContent />,
};
