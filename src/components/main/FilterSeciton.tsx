'use client';

import Dropdown from '../ui/Dropdown';
import { useState } from 'react';

const regions = [
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

const sortOptions = ['참여인원', '생성일'];

export default function FilterSection() {
    const [selectedRegion, setSelectedRegion] = useState<string | undefined>();
    const [selectedSortOption, setSelectedSortOption] = useState<
        string | undefined
    >();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const today = new Date();
    const maxDate = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 30);

    const handleSortSelect = (value: string, order?: 'asc' | 'desc') => {
        console.log('선택된 정렬:', value, '순서:', order);
        setSelectedSortOption(value);
    };

    return (
        <div className="w-full h-10 flex justify-between">
            <div className="flex gap-4">
                <Dropdown
                    options={regions}
                    selected={selectedRegion}
                    onSelect={setSelectedRegion}
                    placeholder="지역 전체"
                    iconType="arrow"
                    showPlaceholderInMenu
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
                    options={sortOptions}
                    selected={selectedSortOption}
                    onSelect={handleSortSelect}
                    placeholder="마감임박"
                    iconType="sort"
                    showPlaceholderInMenu
                />
            </div>
        </div>
    );
}
