'use client';
import { InputHTMLAttributes, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon, LeftArrowIcon } from '@/assets';
import { ko } from 'date-fns/locale/ko';
import CustomTimeInput from './CustomTimePicker';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { InputSize, InputVariant } from './InputNumber';
import {
    FieldValues,
    FieldError,
    RegisterOptions,
    Control,
    Controller,
} from 'react-hook-form';
import { FocusEvent } from 'react';

interface DateInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'type' | 'min' | 'max' | 'defaultValue' | 'size'
    > {
    name: string;
    label?: string;
    size?: InputSize;
    type?: 'date' | 'datetime-local';
    control: Control<FieldValues>;
    rules?: RegisterOptions;
    error?: FieldError;

    showTimeSelect?: boolean;
    minDate?: Date;
    maxDate?: Date;
    placeholder?: string;
    disabled?: boolean;
    dateFormat?: string;
    timeFormat?: string;
    isStartDate?: boolean;
    labelClassName?: string;
}
// 데이트피커 클래스
const datePickerVariants = cva(
    [
        'rounded-xl font-normal w-full font-Pretendard text-sm leading-5',
        'hover:border-2 hover:border-green-900',
        'bg-gray-900 outline-none',
        'transition-border-color duration-300 font-Pretendard',
        'placeholder:text-gray-600',
        'pr-10', // 아이콘 공간
    ],
    {
        variants: {
            variant: {
                default: 'border-2 border-transparent',
                done: 'border-2 border-gray-900',
                typing: 'border-2 border-green-400',
                error: 'border-2 border-red-500',
            },
            size: {
                small: 'text-sm leading-5 !px-4 !py-2',
                large: 'text-base leading-6 !px-3 !py-[10px]',
            },
            selected: {
                true: 'text-white',
                false: 'text-gray-600',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'large',
        },
    }
);
//라벨 클래스
const labelVariants = cva('whitespace-nowrap block', {
    variants: {
        labelSize: {
            small: 'text-sm leading-5 text-white mb-2',
            large: 'text-base leading-6 text-white mb-3',
        },
    },
    defaultVariants: {
        labelSize: 'large',
    },
});
export default function DateInput({
    type = 'date',
    name,
    size,
    minDate,
    maxDate,
    placeholder = '날짜를 선택해주세요',
    disabled,
    dateFormat,
    timeFormat,
    isStartDate,
    control,
    onFocus,
    error,
    labelClassName,
    label,
    autoComplete = 'off',
    rules,
}: DateInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    /**
     * @description 인풋 상태에 따라 variant 반환 함수
     */
    function getVariant(): InputVariant {
        if (isFocused) return 'typing';
        if (error) return 'error';
        return 'done';
    }
    /**
     * @description 커스텀 로케일 만들기 (date-fns/locale/ko 라이브러리 사용해서 한글로 변환 및 시간대 대문자로 변환)
     */
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

    // 🎯 모달 닫는 핸들러
    const handleCloseModal = () => {
        setIsDatePickerOpen(false);
    };
    const handleMoveToNext = () => {
        setIsDatePickerOpen(false); // 현재 닫기

        setTimeout(() => {
            const nextInput = document.querySelector(
                'input[name="endDate"]'
            ) as HTMLInputElement;
            nextInput?.click();
        }, 200);
    };

    return (
        <div className="relative w-full">
            <label
                className={cn(
                    labelVariants({ labelSize: size }),
                    labelClassName
                )}
                htmlFor={name}
            >
                {label}
            </label>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field }) => {
                    function handleFocus(e: FocusEvent<HTMLInputElement>) {
                        onFocus?.(e);
                        setIsFocused(true); // 🟢 포커스 상태로 변경
                    }
                    function handleBlur() {
                        //field.onBlur();
                        setIsFocused(false); // 🔴 포커스 해제
                    }
                    return (
                        <DatePicker
                            {...field}
                            id={name}
                            autoComplete={autoComplete}
                            open={isDatePickerOpen} // 🎯 상태로 제어
                            onInputClick={() => setIsDatePickerOpen(true)} // 🎯 열기
                            onClickOutside={() => setIsDatePickerOpen(false)} // 🎯 닫기
                            selected={field.value}
                            onChange={field.onChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            showTimeSelect={
                                type === 'datetime-local' ? true : false
                            }
                            showTimeInput={
                                type === 'datetime-local' ? true : false
                            }
                            timeIntervals={15}
                            dateFormat={
                                dateFormat ||
                                (type === 'datetime-local'
                                    ? 'yyyy-MM-dd h:mm aa'
                                    : 'yyyy-MM-dd')
                            } // h = 12시간, aa = AM/PM
                            timeFormat={
                                timeFormat ||
                                (type === 'datetime-local' ? 'h:mm aa' : 'h:mm')
                            }
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText={placeholder}
                            disabled={disabled}
                            className={cn(
                                datePickerVariants({
                                    variant: getVariant(),
                                    size: size,
                                    selected: true,
                                }),
                                'w-full'
                            )}
                            wrapperClassName="w-full"
                            showIcon
                            icon={
                                <CalendarIcon
                                    className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2"
                                    width={18}
                                    height={20}
                                />
                            }
                            disabledKeyboardNavigation={true}
                            renderCustomHeader={({
                                date,
                                decreaseMonth,
                                increaseMonth,
                                prevMonthButtonDisabled,
                                nextMonthButtonDisabled,
                            }) => (
                                <div className="bg-gray-800 md:bg-gray-900 text-white">
                                    <div className="md:hidden text-start leading-6 text-base font-semibold text-white mb-4">
                                        {isStartDate
                                            ? '진행 날짜'
                                            : '모집 마감날짜'}
                                    </div>
                                    <div className="mb-3 flex md:justify-between justify-evenly items-center md:gap-3">
                                        <button
                                            onClick={decreaseMonth}
                                            disabled={prevMonthButtonDisabled}
                                            className="text-white hover:text-green-400 text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <LeftArrowIcon
                                                width={24}
                                                height={24}
                                                className="text-white"
                                            />
                                        </button>

                                        <span className="md:text-sm text-lg font-normal md:leading-5 leading-7 min-w-[120px] text-center md:text-gray-100 text-white">
                                            {date.getFullYear()}년{' '}
                                            {date.getMonth() + 1}월{' '}
                                            {/* 👈 한국어 형식 */}
                                        </span>

                                        <button
                                            onClick={increaseMonth}
                                            disabled={nextMonthButtonDisabled}
                                            className="text-white hover:text-green-400 text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
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
                            locale={customKorean}
                            formatWeekDay={(day) => day.charAt(0)}
                            customTimeInput={
                                <CustomTimeInput
                                    isStartDate={isStartDate}
                                    onClose={handleCloseModal}
                                    onMoveNext={handleMoveToNext}
                                />
                            }
                        />
                    );
                }}
            />
        </div>
    );
}
