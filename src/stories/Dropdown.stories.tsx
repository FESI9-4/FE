import type { Meta, StoryObj } from '@storybook/nextjs';
import Dropdown from '@/components/ui/Dropdown';
import { useState } from 'react';

const meta: Meta<typeof Dropdown> = {
    title: 'UI/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
        background: {
            default: 'dark-light',
        },
        viewport: {
            defaultViewport: 'mobile',
        },
        docs: {
            description: {
                component:
                    '공용 컴포넌트 드롭다운입니다. 정렬, 날짜 선택, 댓글 메뉴 등 다양한 용도로 사용할 수 있습니다.',
            },
        },
        backgrounds: {
            default: 'dark',
        },
    },
    tags: ['autodocs'],
    argTypes: {
        options: {
            control: { type: 'object' },
            description: '드롭다운 옵션 목록',
        },
        selected: {
            control: { type: 'text' },
            description: '선택된 값',
        },
        placeholder: {
            control: { type: 'text' },
            description: '플레이스홀더 텍스트',
        },
        iconType: {
            control: { type: 'select' },
            options: ['sort', 'arrow', 'date', 'comment'],
            description: '아이콘 타입',
        },
        showPlaceholderInMenu: {
            control: { type: 'boolean' },
            description: '메뉴에 플레이스홀더 표시 여부',
        },
        range: {
            control: { type: 'boolean' },
            description: '날짜 범위 선택 모드 (date 타입에서만 사용)',
        },
        onSelect: { action: 'selected' },
        onDateChange: { action: 'date changed' },
        onRangeChange: { action: 'range changed' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 드롭다운
export const Default: Story = {
    render: () => {
        const [selected, setSelected] = useState('모집중');
        return (
            <Dropdown
                options={['전체', '모집중', '진행중', '완료']}
                selected={selected}
                iconType="arrow"
                showPlaceholderInMenu={false}
                onSelect={(value) => setSelected(value)}
            />
        );
    },
    args: {
        options: ['전체', '모집중', '진행중', '완료'],
        selected: '모집중',
        placeholder: '상태 선택',
        iconType: 'arrow',
        showPlaceholderInMenu: true,
    },
};

// 정렬 드롭다운
export const SortDropdown: Story = {
    render: () => {
        const [selectedSortOption, setSelectedSortOption] = useState('recent');
        const [sortAsc, setSortAsc] = useState(false);
        const handleSortSelect = (label: string) => {
            const option = sortOptions.find((opt) => opt.label === label);
            if (option) {
                const newSortOption = option.value as
                    | 'recent'
                    | 'deadLine'
                    | 'person';

                if (selectedSortOption === newSortOption) {
                    setSortAsc(!sortAsc);
                } else {
                    setSelectedSortOption(newSortOption);
                    setSortAsc(false);
                }
            }
        };
        const sortOptions = [
            { label: '시작일', value: 'recent' },
            { label: '마감일', value: 'deadLine' },
            { label: '참여인원', value: 'person' },
        ];
        return (
            <Dropdown
                options={sortOptions.map((opt) => opt.label)}
                selected={
                    sortOptions.find((opt) => opt.value === selectedSortOption)
                        ?.label
                }
                onSelect={handleSortSelect}
                iconType="sort"
                showPlaceholderInMenu={false}
            />
        );
    },
    args: {
        options: ['시작일', '마감일', '참여인원'], // 정렬 기준만
        selected: '시작일',
        placeholder: '정렬기준',
        iconType: 'sort', // 클릭할 때마다 ASC/DESC 토글
        showPlaceholderInMenu: false,
    },
};

// 날짜 선택 드롭다운
export const DateDropdown: Story = {
    render: () => {
        const today = new Date();
        const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
        const [selectedDate, setSelectedDate] = useState<Date | null>(null);
        return (
            <Dropdown
                options={[]}
                placeholder="날짜 선택"
                iconType="date"
                selectedDate={selectedDate}
                onDateChange={(date) => {
                    setSelectedDate(date);
                }}
                minDate={today}
                maxDate={maxDate}
                range={false}
            />
        );
    },
};

// 날짜 범위 선택
export const DateRangeDropdown: Story = {
    render: () => {
        const [startDate, setStartDate] = useState<Date | null>(null);
        const [endDate, setEndDate] = useState<Date | null>(null);
        const handleDateRangeChange = (
            start: Date | null,
            end: Date | null
        ) => {
            setStartDate(start);
            setEndDate(end);
        };

        return (
            <Dropdown
                options={[]}
                placeholder="공연 기간"
                iconType="date"
                range={true}
                startDate={startDate}
                endDate={endDate}
                onRangeChange={handleDateRangeChange}
            />
        );
    },
};

// 댓글 메뉴 드롭다운
export const CommentMenu: Story = {
    args: {
        options: ['수정', '삭제', '신고'],
        placeholder: '메뉴',
        iconType: 'comment',
        showPlaceholderInMenu: false,
    },
};

export const AllStates: Story = {
    render: () => {
        // 상태 관리
        const [selectedStatus, setSelectedStatus] = useState('모집중');
        const [selectedSortOption, setSelectedSortOption] = useState('recent');
        const [sortAsc, setSortAsc] = useState(false);
        const [selectedDate, setSelectedDate] = useState(new Date());
        const [startDate, setStartDate] = useState(new Date());
        const [endDate, setEndDate] = useState(
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        );

        const sortOptions = [
            { label: '시작일', value: 'recent' },
            { label: '마감일', value: 'deadLine' },
            { label: '참여인원', value: 'person' },
        ];

        const handleSortSelect = (label: string) => {
            const option = sortOptions.find((opt) => opt.label === label);
            if (option) {
                const newSortOption = option.value as
                    | 'recent'
                    | 'deadLine'
                    | 'person';
                if (selectedSortOption === newSortOption) {
                    setSortAsc(!sortAsc);
                } else {
                    setSelectedSortOption(newSortOption);
                    setSortAsc(false);
                }
            }
        };

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
                <div className="space-y-4">
                    <h3 className="text-white text-lg font-semibold">
                        상태 선택
                    </h3>
                    <Dropdown
                        options={['전체', '모집중', '진행중', '완료']}
                        selected={selectedStatus}
                        iconType="arrow"
                        showPlaceholderInMenu={false}
                        onSelect={(value) => setSelectedStatus(value)}
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-white text-lg font-semibold">
                        정렬 (클릭시 ASC/DESC 토글)
                    </h3>
                    <div className="w-fit min-w-32">
                        <Dropdown
                            options={sortOptions.map((opt) => opt.label)}
                            selected={
                                sortOptions.find(
                                    (opt) => opt.value === selectedSortOption
                                )?.label
                            }
                            onSelect={handleSortSelect}
                            iconType="sort"
                            showPlaceholderInMenu={false}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-white text-lg font-semibold">
                        댓글 메뉴
                    </h3>
                    <div className="w-fit">
                        <Dropdown
                            options={['수정', '삭제', '신고']}
                            placeholder="메뉴"
                            iconType="comment"
                            showPlaceholderInMenu={false}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-white text-lg font-semibold">
                        날짜 선택
                    </h3>
                    <Dropdown
                        options={[]}
                        placeholder="날짜 선택"
                        iconType="date"
                        selectedDate={selectedDate}
                        onDateChange={(date) =>
                            setSelectedDate(date || new Date())
                        }
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-white text-lg font-semibold">
                        날짜 범위 선택
                    </h3>
                    <Dropdown
                        options={[]}
                        placeholder="기간 선택"
                        iconType="date"
                        range={true}
                        startDate={startDate}
                        endDate={endDate}
                        onRangeChange={(start, end) => {
                            setStartDate(start || new Date());
                            setEndDate(end || new Date());
                        }}
                    />
                </div>
            </div>
        );
    },
};
