'use client';

import { CalendarDay, DayPicker, Modifiers } from 'react-day-picker';
import { ko } from 'date-fns/locale';

export default function Calenadar() {
    // 🔥 더미 데이터, 날짜 형식을 다르게 하면 오차 범위(month 부분에서 +- 1) 가 생길 수 있습니다.
    const answeredDays = [
        new Date('2025-04-08'),
        new Date('2025-04-09'),
        new Date('2025-04-11'),
    ];

    return (
        <DayPicker
            navLayout="after"
            locale={ko}
            formatters={{
                formatYearDropdown: (year) => `${year.getFullYear()}년`,
            }}
            mode="single" // 🔥 요게 없으면 표시가 안 되네요 ㅎㅎㅎ
            modifiers={{ answered: answeredDays }} // 🔥
            components={{
                DayButton: (
                    props: {
                        day: CalendarDay;
                        modifiers: Modifiers;
                    } & React.HTMLAttributes<HTMLButtonElement>
                ) => {
                    const { day, modifiers, ...rest } = props;

                    return (
                        <button
                            className={`w-full h-full text-center flex flex-col items-center justify-start p-2`}
                            {...rest}
                        >
                            <div>{day.date.getDate()}</div>
                            {modifiers.answered && (
                                <div className="w-3 h-3 bg-white rounded-full mt-1" />
                            )}
                        </button>
                    );
                },
            }} // 🔥조건을 반영한 커스텀 버튼
            classNames={{
                root: ` w-[300px] md:w-[400px] h-[400px] shadow-lg p-5 bg-pink-200 rounded-lg`,
                day: `text-center w-[100px] h-[50px]`,
                selected: `bg-pink-400`,
                caption_label: `text-xl font-bold text-center text-gray-800 mb-2`,
                dropdowns: `h-9 flex flex-row-reverse gap-2 `,
                years_dropdown: `text-center bg-pink-300 rounded-lg`,
                months_dropdown: `text-center bg-pink-300 rounded-lg`,
            }}
        />
    );
}
