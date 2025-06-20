import type { Meta, StoryObj } from '@storybook/nextjs';
import ContainerProgress from '@/components/ui/ContainerProgress';

const meta: Meta<typeof ContainerProgress> = {
    title: 'UI/ContainerProgress',
    component: ContainerProgress,
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
                    '팬팔 모집 진행률을 표시하는 프로그레스 바 컴포넌트입니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        max: {
            control: { type: 'number', min: 1, max: 100 },
            description: '최대 인원',
        },
        current: {
            control: { type: 'number', min: 0, max: 100 },
            description: '현재 참여 인원',
        },
        openStatus: {
            control: { type: 'select' },
            options: ['waiting', 'progressing', 'finished'],
            description: '모집 상태',
        },
        deadLine: {
            control: { type: 'text' },
            description: '마감 시간 (선택사항)',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <div className="w-96 p-6 rounded-lg">
            <ContainerProgress {...args} />
        </div>
    ),
    args: {
        max: 10,
        current: 7,
        openStatus: 'progressing',
        deadLine: '12시간 후',
    },
};

export const AllStates: Story = {
    render: () => (
        <div className="p-8 space-y-6">
            <div className="max-w-2xl space-y-6">
                {/* 모집 대기 */}
                <div className="space-y-3">
                    <h3 className="text-white text-base font-medium">
                        모집 대기 (waiting)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg">
                            <p className="text-gray-400 text-xs mb-3">
                                30% 진행 - 마감시간 있음
                            </p>
                            <ContainerProgress
                                max={10}
                                current={3}
                                openStatus="waiting"
                                deadLine="2일 후"
                            />
                        </div>
                        <div className="p-4 rounded-lg">
                            <p className="text-gray-400 text-xs mb-3">
                                20% 진행 - 마감시간 없음
                            </p>
                            <ContainerProgress
                                max={15}
                                current={3}
                                openStatus="waiting"
                            />
                        </div>
                    </div>
                </div>

                {/* 진행 중 */}
                <div className="space-y-3">
                    <h3 className="text-white text-base font-medium">
                        진행 중 (progressing)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg">
                            <p className="text-gray-400 text-xs mb-3">
                                70% 진행 - 개설확정
                            </p>
                            <ContainerProgress
                                max={10}
                                current={7}
                                openStatus="progressing"
                                deadLine="12시간 후"
                            />
                        </div>
                        <div className="p-4 rounded-lg">
                            <p className="text-gray-400 text-xs mb-3">
                                90% 진행 - 거의 마감
                            </p>
                            <ContainerProgress
                                max={20}
                                current={18}
                                openStatus="progressing"
                                deadLine="3시간 후"
                            />
                        </div>
                    </div>
                </div>

                {/* 모집 완료 */}
                <div className="space-y-3">
                    <h3 className="text-white text-base font-medium">
                        모집 완료 (finished)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg">
                            <p className="text-gray-400 text-xs mb-3">
                                100% 달성 - 모집마감
                            </p>
                            <ContainerProgress
                                max={12}
                                current={12}
                                openStatus="finished"
                            />
                        </div>
                        <div className="p-4 rounded-lg">
                            <p className="text-gray-400 text-xs mb-3">
                                80% 진행 - 시간마감
                            </p>
                            <ContainerProgress
                                max={25}
                                current={20}
                                openStatus="finished"
                            />
                        </div>
                    </div>
                </div>

                {/* 다양한 규모 */}
                <div className="space-y-3">
                    <h3 className="text-white text-base font-medium">
                        다양한 규모
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg">
                            <p className="text-gray-400 text-xs mb-3">
                                소규모 모임 (2/4명)
                            </p>
                            <ContainerProgress
                                max={4}
                                current={2}
                                openStatus="progressing"
                                deadLine="6시간 후"
                            />
                        </div>
                        <div className="p-4 rounded-lg">
                            <p className="text-gray-400 text-xs mb-3">
                                대규모 모임 (350/500명)
                            </p>
                            <ContainerProgress
                                max={500}
                                current={350}
                                openStatus="progressing"
                                deadLine="2일 후"
                            />
                        </div>
                    </div>
                </div>

                {/* 극단적인 케이스 */}
                <div className="space-y-3">
                    <h3 className="text-white text-base font-medium">
                        특수 케이스
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg">
                            <p className="text-gray-400 text-xs mb-3">
                                시작 단계 (5%)
                            </p>
                            <ContainerProgress
                                max={100}
                                current={5}
                                openStatus="waiting"
                                deadLine="1주일 후"
                            />
                        </div>
                        <div className="p-4 rounded-lg">
                            <p className="text-gray-400 text-xs mb-3">
                                마감 임박 (95%)
                            </p>
                            <ContainerProgress
                                max={20}
                                current={19}
                                openStatus="progressing"
                                deadLine="30분 후"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
};
