'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { LeftArrowIcon } from '@/assets';
import { ko } from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@/components/ui/Button';

interface CalendarOnlyProps {
    selectedDate: Date | null;
    onChange: (date: Date | null) => void;
    onConfirm?: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
    className?: string;
}

const customKorean = {
    ...ko,
    localize: {
        ...ko.localize,
        dayPeriod: (period: string) => {
            switch (period) {
                case 'am':
                    return 'AM';
                case 'pm':
                    return 'PM';
                default:
                    return period;
            }
        },
    },
};

export default function CalendarOnly({
    selectedDate,
    onChange,
    onConfirm,
    minDate,
    maxDate,
}: CalendarOnlyProps) {
    const [tempDate, setTempDate] = useState<Date | null>(selectedDate ?? null);

    const handleReset = () => {
        setTempDate(null);
        onChange(null);
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm(tempDate);
        } else {
            onChange(tempDate);
        }
    };

    return (
        <div className="calendar-v2-wrapper bg-gray-800 rounded-xl p-4 w-[300px] ">
            <DatePicker
                selected={tempDate}
                onChange={(date) => setTempDate(date)}
                inline
                locale={customKorean}
                minDate={minDate}
                maxDate={maxDate}
                formatWeekDay={(day) => day.charAt(0)}
                calendarClassName="custom-calendar-v2"
                renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div className=" text-white mb-2 w-62.5">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={decreaseMonth}
                                disabled={prevMonthButtonDisabled}
                                className="hover:text-green-400 text-xl font-bold disabled:opacity-50"
                            >
                                <LeftArrowIcon
                                    width={24}
                                    height={24}
                                    className="text-white"
                                />
                            </button>
                            <span className="text-lg font-normal text-center text-white">
                                {date.getFullYear()}년 {date.getMonth() + 1}월
                            </span>
                            <button
                                onClick={increaseMonth}
                                disabled={nextMonthButtonDisabled}
                                className="hover:text-green-400 text-xl font-bold disabled:opacity-50"
                            >
                                <LeftArrowIcon
                                    width={24}
                                    height={24}
                                    className="text-white rotate-180"
                                />
                            </button>
                        </div>
                    </div>
                )}
            />

            <div className="w-full h-10 flex gap-3">
                <Button
                    onClick={handleReset}
                    className="bg-transparent text-white"
                >
                    초기화
                </Button>
                <Button onClick={handleConfirm}>확인</Button>
            </div>
        </div>
    );
}
