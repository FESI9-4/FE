'use client';
import { InputHTMLAttributes, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon, LeftArrowIcon } from '@/assets';
import { ko } from 'date-fns/locale/ko';
import CustomTimeInput from './CustomTimePicker';
import {
    InputVariant,
    InputSize,
    InputValue,
    useTextFieldStore,
} from '@/store/textfieldStore';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

interface DateInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'value' | 'onChange' | 'type' | 'min' | 'max' | 'defaultValue'
    > {
    type?: 'date' | 'datetime-local';
    value: InputValue;
    onChange: (value: InputValue) => void;
    variant?: InputVariant;
    name?: string;
    inputSize?: InputSize;

    showTimeSelect?: boolean;
    minDate?: Date;
    maxDate?: Date;
    placeholder?: string;
    disabled?: boolean;
    dateFormat?: string;
    timeFormat?: string;
    isStartDate?: boolean;
}
// cva 스타일 variants
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

export default function DateInput(props: DateInputProps) {
    const {
        value,
        type = 'date',
        onChange,
        name,
        inputSize,
        minDate,
        maxDate,
        placeholder = '날짜를 선택해주세요',
        disabled,
        dateFormat,
        timeFormat,
        isStartDate,
    } = props;

    // 스토어 연결
    const fieldState = useTextFieldStore((state) =>
        name ? state.fields[name] : null
    );
    const { setVariant } = useTextFieldStore();
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    // InputValue를 Date로 변환
    const inputValueToDate = (inputValue: InputValue): Date | null => {
        if (!inputValue) return null;
        if (inputValue instanceof Date) return inputValue;
        if (typeof inputValue === 'string') {
            const date = new Date(inputValue);
            return isNaN(date.getTime()) ? null : date;
        }
        return null;
    };
    // 내려받는 value 없으면 오늘 날짜로 사용
    const selectedValue = inputValueToDate(value); //사용자가 날짜를 선택했는지 여부
    const [selected, setSelected] = useState(false);

    // 날짜 변경 핸들러
    const handleDateChange = (date: Date | null) => {
        // 날짜 선택 시 인풋창 색상 변경
        setSelected(true);
        // 부모에게 전달
        onChange?.(date as InputValue);
        if (name) {
            setVariant(name, 'done');
            //날짜 선택 같은 경우에는 헬퍼텍스트나 유혀성 검증 메시지가 필요없을거 같아요
        }
    };
    const handleFocus = () => {
        if (name) {
            setVariant(name, 'typing');
        }
    };

    // 커스텀 로케일 만들기
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
            <DatePicker
                open={isDatePickerOpen} // 🎯 상태로 제어
                onInputClick={() => setIsDatePickerOpen(true)} // 🎯 열기
                onClickOutside={() => setIsDatePickerOpen(false)} // 🎯 닫기
                name={name}
                selected={selectedValue}
                onChange={handleDateChange}
                onFocus={handleFocus}
                showTimeSelect={type === 'datetime-local' ? true : false}
                showTimeInput={type === 'datetime-local' ? true : false}
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
                        variant: fieldState?.variant || 'default',
                        size: inputSize,
                        selected: selected ? true : false,
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
                            {isStartDate ? '진행 날짜' : '모집 마감날짜'}
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
                                {date.getFullYear()}년 {date.getMonth() + 1}월{' '}
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
        </div>
    );
}
