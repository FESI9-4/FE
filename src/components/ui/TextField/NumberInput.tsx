// TextField/NumberInput.tsx (깔끔 정리 버전)
'use client';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { InputHTMLAttributes, useState } from 'react';
import {
    useTextFieldStore,
    InputValue,
    ValidationResult,
    InputVariant,
    InputSize,
} from '@/store/textfieldStore';
import { DecrementIcon, IncrementIcon } from '@/assets';
interface NumberInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'onChange' | 'type' | 'defaultValue'
    > {
    value: number;
    onChange: (value: number) => void;
    variant?: InputVariant;
    name?: string;
    inputSize?: InputSize;
    onValidate?: (value: InputValue) => ValidationResult;
    min?: number;
    max?: number;
    step?: number;
}

// 버튼 스타일
const buttonVariants = cva(
    [
        'w-6 h-6 rounded-full flex items-center justify-center',
        'transition-colors duration-100 cursor-pointer select-none',
        'border flex-shrink-0',
    ],
    {
        variants: {
            state: {
                disabled: ['border-gray-700 cursor-not-allowed opacity-50'],
                active: [
                    'border-green-400',
                    'hover:border-green-400',
                    'active:border-green-700',
                ],
                pressed: ['border-green-700'],
            },
        },
        defaultVariants: {
            state: 'active',
        },
    }
);
// 아이콘 색상 스타일
const iconVariants = cva('transition-colors duration-100', {
    variants: {
        state: {
            disabled: 'text-gray-300',
            active: 'text-green-400',
            pressed: 'text-green-700',
        },
    },
    defaultVariants: {
        state: 'active',
    },
});
// 인풋 스타일
const numberInputVariants = cva(
    [
        'rounded-xl font-medium w-full bg-gray-900 outline-none',
        'placeholder:text-gray-600 font-Pretendard caret-white text-center',
        'transition-border-color duration-300',
        'hover:border-2 hover:border-green-900 hover:text-white',
        '[&::-webkit-inner-spin-button]:appearance-none',
        '[&::-webkit-outer-spin-button]:appearance-none',
    ],
    {
        variants: {
            variant: {
                default: 'border-2 border-transparent text-white',
                done: 'border-2 border-gray-900 text-white',
                typing: 'border-2 border-green-400 text-white',
                error: 'border-2 border-red-500 text-white',
            },
            size: {
                small: 'text-sm px-3 py-2',
                large: 'text-base px-2 py-[10px]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'large',
        },
    }
);

export default function NumberInput(props: NumberInputProps) {
    const {
        value,
        onChange,
        variant,
        className,
        name,
        inputSize,
        onFocus,
        onBlur,
        onValidate,
        min = 0,
        max = 20,
        step = 1,
        disabled,
        ...rest
    } = props;

    // 버튼 눌림 상태
    const [isIncrementPressed, setIsIncrementPressed] = useState(false);
    const [isDecrementPressed, setIsDecrementPressed] = useState(false);

    // 스토어 연결
    const fieldState = useTextFieldStore((state) =>
        name ? state.fields[name] : null
    );
    const { setVariant, validate, setShowHelperText, setValidatedMessage } =
        useTextFieldStore();

    // 증가
    const handleIncrement = () => {
        if (disabled || value >= max) return;
        const newValue = Math.min(value + step, max);
        onChange(newValue);
    };
    // 감소
    const handleDecrement = () => {
        if (disabled || value <= min) return;
        const newValue = Math.max(value - step, min);
        onChange(newValue);
    };
    // 키보드 이벤트
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowKeys = [
            'Backspace',
            'Delete',
            'Tab',
            'Enter',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
        ];
        const isNumber = /^[0-9]$/.test(e.key);
        const isAllowed = allowKeys.includes(e.key);
        const isCtrl = e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key);

        if (!isNumber && !isAllowed && !isCtrl) {
            e.preventDefault();
        }

        // 화살표 키로 증감
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            handleIncrement();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            handleDecrement();
        }
    };
    // 입력 처리
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (name) setVariant(name, 'typing');

        const inputValue = e.target.value;
        // 값 검증 및 변환
        let newValue;
        if (!inputValue || !/\d/.test(inputValue)) {
            newValue = 0;
        } else {
            const numericValue = inputValue.replace(/[^\d]/g, '');
            const num = parseInt(numericValue, 10);
            newValue = Math.max(min, Math.min(max, num));
        }
        onChange(newValue);
    };
    // 🎯 포커스/블러 이벤트
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        onFocus?.(e);
        if (name) setVariant(name, 'typing');
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(e);

        // 빈 값이면 최솟값으로 설정
        if (e.target.value === '') {
            onChange(min);
        }

        if (name) {
            if (onValidate) {
                // 현재 값(빈 값이면 min)으로 유효성 검사
                const currentValue = e.target.value === '' ? min : value;
                const result = validate(name, currentValue, onValidate);
                setVariant(name, result.isValid ? 'done' : 'error');
                setShowHelperText(name, !result.isValid);
                setValidatedMessage(name, result.message);
            } else {
                setVariant(name, 'done');
            }
        }
    };

    // 버튼 상태 계산
    const isCanIncrement = !disabled && value < max;
    const isCanDecrement = !disabled && value > min;

    // 상태별 스타일 결정
    function getButtonState(canClick: boolean, isPressed: boolean) {
        if (!canClick) return 'disabled';
        if (isPressed) return 'pressed';
        return 'active';
    }
    const incrementState = getButtonState(isCanIncrement, isIncrementPressed);
    const decrementState = getButtonState(isCanDecrement, isDecrementPressed);

    return (
        <div className="flex items-center gap-3">
            {/*  - 버튼 */}
            <button
                type="button"
                onClick={handleDecrement}
                disabled={!isCanDecrement}
                onMouseDown={() => setIsDecrementPressed(true)}
                onMouseUp={() => setIsDecrementPressed(false)}
                onMouseLeave={() => setIsDecrementPressed(false)}
                className={cn(buttonVariants({ state: decrementState }))}
            >
                <DecrementIcon
                    width={16}
                    height={16}
                    className={cn(iconVariants({ state: decrementState }))}
                />
            </button>

            {/* 숫자 입력 필드 */}
            <input
                type="number"
                className={cn(
                    numberInputVariants({
                        variant: variant || fieldState?.variant,
                        size: inputSize,
                    }),
                    className
                )}
                name={name}
                id={name}
                value={value}
                min={min}
                max={max}
                step={step}
                onFocus={handleFocus}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                disabled={disabled}
                {...rest}
            />

            {/* + 버튼 */}
            <button
                type="button"
                onClick={handleIncrement}
                disabled={!isCanIncrement}
                onMouseDown={() => setIsIncrementPressed(true)}
                onMouseUp={() => setIsIncrementPressed(false)}
                onMouseLeave={() => setIsIncrementPressed(false)}
                className={cn(buttonVariants({ state: incrementState }))}
            >
                <IncrementIcon
                    width={16}
                    height={16}
                    className={cn(iconVariants({ state: incrementState }))}
                />
            </button>
        </div>
    );
}
