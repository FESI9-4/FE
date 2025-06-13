'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { LeftArrowIcon } from '@/assets';
import { ko } from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@/components/ui/Button';

interface CalendarOnlyProps {
    selectedDate: Date | null;
    onChange: (date: Date | null) => void;
    onConfirm?:
        | ((date: Date | null) => void)
        | ((start: Date | null, end: Date | null) => void);
    minDate?: Date;
    maxDate?: Date;
    className?: string;
    range?: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
    onRangeChange?: (start: Date | null, end: Date | null) => void;
    onReset?: () => void;
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
    range = false,
    startDate,
    endDate,
    onRangeChange,
    onReset,
}: CalendarOnlyProps) {
    const [tempDate, setTempDate] = useState<Date | null>(selectedDate ?? null);
    const [tempStartDate, setTempStartDate] = useState<Date | null>(
        startDate ?? null
    );
    const [tempEndDate, setTempEndDate] = useState<Date | null>(
        endDate ?? null
    );

    useEffect(() => {
        if (range) {
            setTempStartDate(startDate ?? null);
            setTempEndDate(endDate ?? null);
        } else {
            setTempDate(selectedDate ?? null);
        }
    }, [range, startDate, endDate, selectedDate]);

    const handleReset = () => {
        if (range) {
            setTempStartDate(null);
            setTempEndDate(null);
            onRangeChange?.(null, null);
        } else {
            setTempDate(null);
            onChange(null);
        }
        if (onReset) onReset();
    };

    const handleConfirm = () => {
        if (range) {
            if (onConfirm) {
                (onConfirm as (start: Date | null, end: Date | null) => void)(
                    tempStartDate,
                    tempEndDate
                );
            } else {
                onRangeChange?.(tempStartDate, tempEndDate);
            }
        } else {
            if (onConfirm) {
                (onConfirm as (date: Date | null) => void)(tempDate);
            } else {
                onChange(tempDate);
            }
        }
    };

    return (
        <div className="calendar-v2-wrapper bg-gray-800 rounded-xl p-4 w-[300px] ">
            <DatePicker
                selected={range ? tempStartDate : tempDate}
                onChange={(dates: Date | [Date | null, Date | null] | null) => {
                    if (range) {
                        if (Array.isArray(dates)) {
                            const [start, end] = dates;
                            setTempStartDate(start);
                            setTempEndDate(end);
                        }
                    } else {
                        setTempDate(dates as Date | null);
                    }
                }}
                startDate={range ? tempStartDate : undefined}
                endDate={range ? tempEndDate : undefined}
                selectsRange={range as true}
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
