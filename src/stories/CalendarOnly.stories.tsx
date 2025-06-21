import type { Meta, StoryObj } from '@storybook/nextjs';
import CalendarOnly from '@/components/ui/CalendarOnly';
import { useState } from 'react';

// CalendarOnly 컴포넌트를 래핑하는 컴포넌트
const CalendarOnlyWrapper = ({
    range = false,
    minDate,
    maxDate,
}: {
    range?: boolean;
    minDate?: Date;
    maxDate?: Date;
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    if (range) {
        return (
            <div className="space-y-4">
                <CalendarOnly
                    selectedDate={null}
                    onChange={() => {}}
                    range={true}
                    startDate={startDate}
                    endDate={endDate}
                    onRangeChange={(start, end) => {
                        setStartDate(start);
                        setEndDate(end);
                    }}
                    minDate={minDate}
                    maxDate={maxDate}
                />
                <div className="text-white text-sm text-center">
                    <p>
                        시작 날짜:{' '}
                        {startDate
                            ? startDate.toLocaleDateString('ko-KR')
                            : '선택되지 않음'}
                    </p>
                    <p>
                        종료 날짜:{' '}
                        {endDate
                            ? endDate.toLocaleDateString('ko-KR')
                            : '선택되지 않음'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <CalendarOnly
                selectedDate={selectedDate}
                onChange={setSelectedDate}
                minDate={minDate}
                maxDate={maxDate}
            />
            <div className="text-white text-sm text-center">
                <p>
                    선택된 날짜:{' '}
                    {selectedDate
                        ? selectedDate.toLocaleDateString('ko-KR')
                        : '선택되지 않음'}
                </p>
            </div>
        </div>
    );
};

const meta: Meta<typeof CalendarOnlyWrapper> = {
    title: 'UI/CalendarOnly',
    component: CalendarOnlyWrapper,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    '단독으로 사용할 수 있는 캘린더 컴포넌트입니다. 단일 날짜 선택과 날짜 범위 선택을 지원합니다.',
            },
        },
        backgrounds: {
            default: 'dark',
        },
    },
    tags: ['autodocs'],
    argTypes: {
        range: {
            control: 'boolean',
            description:
                '날짜 범위 선택 모드를 활성화합니다. true: 범위 선택, false: 단일 날짜 선택',
            defaultValue: false,
        },
        minDate: {
            control: 'date',
            description: '선택 가능한 최소 날짜를 설정합니다',
        },
        maxDate: {
            control: 'date',
            description: '선택 가능한 최대 날짜를 설정합니다',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 단일 날짜 선택
export const Default: Story = {
    args: {
        range: false,
    },
};

// 날짜 범위 선택
export const RangeSelection: Story = {
    args: {
        range: true,
    },
};

// 모든 상태를 한번에 보기
export const AllStates: Story = {
    render: () => (
        <div className="space-y-8">
            <div>
                <h1 className="text-lg font-semibold mb-4 text-white">
                    기본 단일 날짜 선택
                </h1>
                <CalendarOnlyWrapper range={false} />
            </div>
            <div>
                <h1 className="text-lg font-semibold mb-4 text-white">
                    날짜 범위 선택
                </h1>
                <CalendarOnlyWrapper range={true} />
            </div>
        </div>
    ),
};
