'use client';
import Dropdown from '@/components/ui/Dropdown';
import CardContainer from '@/components/concert/CardContainer';
import { useState } from 'react';

export default function ConcertPage() {
    const [selectedOption, setSelectedOption] = useState('지역');
    const startDate = '20250601';
    const endDate = '20250630';
    const options = [
        '서울',
        '부산',
        '대구',
        '경기',
        '인천',
        '강원',
        '광주',
        '대전',
        '울산',
        '세종',
        '충남',
        '충북',
        '전남',
        '전북',
        '경남',
        '경북',
        '제주',
    ];

    return (
        <div className="flex justify-center items-center pt-25 w-full">
            <div className="flex flex-col gap-5 max-w-[1122px] w-fit">
                <div className="text-2xl text-white font-semibold p-3">
                    공연 목록
                </div>
                <div className="w-23 flex justify-end">
                    <Dropdown
                        options={options}
                        selected={selectedOption}
                        onSelect={setSelectedOption}
                        placeholder="지역"
                    />
                </div>
                <CardContainer
                    startDate={startDate}
                    endDate={endDate}
                    location={selectedOption}
                />
            </div>
        </div>
    );
}
