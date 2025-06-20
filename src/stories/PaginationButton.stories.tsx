import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import PaginationButton from '@/components/ui/PaginationButton';

const meta: Meta<typeof PaginationButton> = {
    title: 'UI/PaginationButton',
    component: PaginationButton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: '페이지네이션을 위한 버튼 컴포넌트입니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['small', 'large'],
        },
        currentPage: {
            control: { type: 'number', min: 1 },
        },
        totalPages: {
            control: { type: 'number', min: 1 },
        },
        onPageChange: {
            description: '페이지 변경 시 실행되는 함수',
            action: 'pageChanged',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 상태 관리를 위한 래퍼 컴포넌트
const PaginationWithState = ({
    size = 'large',
    totalPages = 10,
    initialPage = 1,
}: {
    size?: 'small' | 'large';
    totalPages?: number;
    initialPage?: number;
}) => {
    const [currentPage, setCurrentPage] = useState(initialPage);

    return (
        <PaginationButton
            size={size}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
                setCurrentPage(page);
                console.log('Page changed to:', page);
            }}
        />
    );
};

export const Default: Story = {
    render: (args) => (
        <PaginationWithState
            size={args.size}
            totalPages={args.totalPages}
            initialPage={args.currentPage}
        />
    ),
};

export const AllStates: Story = {
    render: () => (
        <div className="p-8 min-h-screen space-y-8">
            <div className="max-w-4xl space-y-8">
                {/* 크기별 페이지네이션 */}
                <div>
                    <h3 className="text-white text-lg mb-4">
                        크기별 페이지네이션
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <p className="text-gray-400 text-sm mb-2">
                                Small 크기
                            </p>
                            <PaginationWithState
                                size="small"
                                totalPages={10}
                                initialPage={5}
                            />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm mb-2">
                                Large 크기
                            </p>
                            <PaginationWithState
                                size="large"
                                totalPages={10}
                                initialPage={5}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
};
