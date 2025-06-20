import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProgressChip from '@/components/ui/ProgressChip';

const meta: Meta<typeof ProgressChip> = {
    title: 'UI/ProgressChip',
    component: ProgressChip,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'QuestionCard의 진행 상태를 표시하는 칩 컴포넌트입니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        openStatus: {
            control: { type: 'select' },
            options: ['waiting', 'finished', 'progressing', 'canceled'],
        },
        children: {
            control: { type: 'text' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        openStatus: 'waiting',
        children: '답변 대기',
    },
};

export const AllStates: Story = {
    render: () => (
        <div className="p-8 bg-gray-900 min-h-screen">
            <div className="grid grid-cols-2 gap-8 max-w-4xl">
                {/* Waiting 상태 */}
                <div>
                    <h3 className="text-white text-lg mb-4">답변 대기</h3>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <ProgressChip openStatus="waiting">
                            답변 대기
                        </ProgressChip>
                    </div>
                </div>

                {/* Finished 상태 */}
                <div>
                    <h3 className="text-white text-lg mb-4">답변 완료</h3>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <ProgressChip openStatus="finished">
                            답변 완료
                        </ProgressChip>
                    </div>
                </div>

                {/* Progressing 상태 */}
                <div>
                    <h3 className="text-white text-lg mb-4">진행 중</h3>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <ProgressChip openStatus="progressing">
                            진행 중
                        </ProgressChip>
                    </div>
                </div>

                {/* Canceled 상태 */}
                <div>
                    <h3 className="text-white text-lg mb-4">취소됨 (숨김)</h3>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <ProgressChip openStatus="canceled">
                            취소됨
                        </ProgressChip>
                        <p className="text-gray-400 text-sm mt-2">
                            canceled 상태는 숨김 처리됩니다
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ),
};
