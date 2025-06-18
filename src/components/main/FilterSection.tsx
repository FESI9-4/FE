'use client';

import Dropdown from '../ui/Dropdown';

const regions = [
    '전체',
    '서울',
    '경기',
    '인천',
    '강원',
    '충북',
    '충남',
    '세종',
    '대전',
    '경북',
    '경남',
    '대구',
    '울산',
    '부산',
    '전북',
    '전남',
    '광주',
    '제주',
];

const sortOptions = [
    { label: '시작일', value: 'recent' },
    { label: '마감일', value: 'deadLine' },
    { label: '참여인원', value: 'person' },
];

interface FilterSectionProps {
    selectedRegion: string;
    setSelectedRegion: (value: string) => void;
    selectedDate: Date | null;
    setSelectedDate: (value: Date | null) => void;
    selectedSortOption: 'recent' | 'deadLine' | 'person';
    setSelectedSortOption: (value: 'recent' | 'deadLine' | 'person') => void;
    setSortAsc: (asc: boolean) => void;
    sortAsc: boolean;
}

export default function FilterSection({
    selectedRegion,
    setSelectedRegion,
    selectedDate,
    setSelectedDate,
    selectedSortOption,
    setSelectedSortOption,
    setSortAsc,
    sortAsc,
}: FilterSectionProps) {
    const today = new Date();
    const maxDate = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 30);

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
        <div className="w-full h-10 flex justify-between">
            <div className="flex gap-4">
                <Dropdown
                    options={regions}
                    selected={selectedRegion}
                    onSelect={setSelectedRegion}
                    iconType="arrow"
                    showPlaceholderInMenu={false}
                />
                <Dropdown
                    options={[]}
                    placeholder="날짜 선택"
                    iconType="date"
                    selectedDate={selectedDate}
                    onDateChange={(date) => {
                        setSelectedDate(date);
                        console.log('선택된 날짜:', date);
                    }}
                    minDate={today}
                    maxDate={maxDate}
                />
            </div>
            <div>
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
    );
}
