import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import QuestionCard from '@/components/ui/QuestionCard';

const meta: Meta<typeof QuestionCard> = {
    title: 'UI/QuestionCard',
    component: QuestionCard,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    '나의 팬팔에 달린 질문과 답변을 표시하는 카드 컴포넌트입니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: { type: 'text' },
        },
        location: {
            control: { type: 'text' },
        },
        comment: {
            control: { type: 'text' },
        },
        createdAt: {
            control: { type: 'number' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: '아이돌 팬미팅',
        location: '서울',
        createdAt: Math.floor(Date.now() / 1000) - 86400, // 1일 전
        comment: '팬미팅에서 어떤 질문을 하면 좋을까요?',
    },
    render: (args) => <QuestionCard {...args} />,
};

export const AllStates: Story = {
    render: () => (
        <div className="p-8 space-y-6">
            <div className="max-w-4xl space-y-6">
                {/* 답변 대기 상태 */}
                <div>
                    <h3 className="text-white text-lg mb-4">답변 대기 상태</h3>
                    <QuestionCard
                        title="콘서트 준비"
                        location="부산"
                        createdAt={Math.floor(Date.now() / 1000) - 3600} // 1시간 전
                        comment="첫 콘서트 관람인데 어떤 준비를 해야 할까요? 응원봉이나 슬로건 같은 것들이 필요한지 궁금합니다."
                    />
                </div>

                {/* 답변 완료 상태 */}
                <div>
                    <h3 className="text-white text-lg mb-4">답변 완료 상태</h3>
                    <QuestionCard
                        title="팬사인회"
                        location="대구"
                        createdAt={Math.floor(Date.now() / 1000) - 86400 * 2} // 2일 전
                        comment="팬사인회에서 아이돌과 대화할 때 어떤 이야기를 하면 좋을까요?"
                        answer={{
                            nickname: '팬클럽회장',
                            profileImage:
                                'https://randomuser.me/api/portraits/women/80.jpg',
                            content:
                                '자연스럽게 일상 이야기나 응원 메시지를 전하시면 좋을 것 같아요! 너무 개인적인 질문보다는 음악이나 활동에 대한 이야기가 좋습니다.',
                            createdAt: Math.floor(Date.now() / 1000) - 86400, // 1일 전
                        }}
                    />
                </div>
            </div>
        </div>
    ),
};
