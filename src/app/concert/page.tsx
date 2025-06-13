'use client';
import Dropdown from '@/components/ui/Dropdown';
import CardContainer from '@/components/concert/CardContainer';
import { useState } from 'react';

export default function ConcertPage() {
    const [selectedOption, setSelectedOption] = useState('지역');
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const today = new Date();
    const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
    );
    const [endDate, setEndDate] = useState<Date | null>(lastDayOfMonth);

    const handleDateRangeChange = (start: Date | null, end: Date | null) => {
        if (start === null && end === null) {
            setStartDate(today);
            setEndDate(lastDayOfMonth);
        } else {
            setStartDate(start);
            setEndDate(end);
        }
    };

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
        <div className="flex justify-center items-center pt-25 w-full px-4">
            <div className="flex flex-col gap-5 max-w-[1122px]">
                <div className="text-2xl text-white font-semibold p-3">
                    공연 목록
                </div>
                <div className="flex ">
                    <div>
                        <Dropdown
                            options={options}
                            selected={selectedOption}
                            onSelect={setSelectedOption}
                            placeholder="지역"
                        />
                    </div>
                    <div>
                        <Dropdown
                            options={[]}
                            placeholder="공연 기간"
                            iconType="date"
                            range={true}
                            startDate={startDate}
                            endDate={endDate}
                            onRangeChange={handleDateRangeChange}
                        />
                    </div>
                </div>
                <CardContainer
                    startDate={
                        startDate
                            ? startDate
                                  .toISOString()
                                  .split('T')[0]
                                  .replace(/-/g, '')
                            : '20250601'
                    }
                    endDate={
                        endDate
                            ? endDate
                                  .toISOString()
                                  .split('T')[0]
                                  .replace(/-/g, '')
                            : '20250630'
                    }
                    location={selectedOption}
                />
            </div>
        </div>
    );
}
