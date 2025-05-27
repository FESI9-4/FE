import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import React, {
    FocusEvent,
    InputHTMLAttributes,
    useEffect,
    useState,
} from 'react';
import {
    FieldError,
    FieldValues,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';
import PasswordButton from './PasswordButton';
import { InputSize, InputVariant } from '@/types/Input';

interface InputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    name: string;
    label?: string;
    size?: InputSize;
    register: UseFormRegister<FieldValues>;
    rules?: RegisterOptions;
    error?: FieldError;
    dirtyFields?: FieldValues;
    touchedFields?: FieldValues;
    labelClassName?: string; //라벨 클래스
    errorMessageClass?: string; //에러 메시지 클래스
}

//인풋 클래스
const inputVariants = cva(
    [
        'rounded-xl font-medium w-full',
        'hover:border-2 hover:border-green-900 hover:text-white',
        'bg-gray-900 outline-none placeholder:text-gray-600',
        'transition-border-color duration-300 font-Pretendard caret-white',
        '[&:is(:-webkit-autofill,:autofill)]:!shadow-[0_0_0px_1000px_rgb(26,27,31)_inset]',
        '[&:is(:-webkit-autofill,:autofill)]:![-webkit-text-fill-color:rgb(255,255,255)]',
        '[&:is(:-webkit-autofill,:autofill)]:![transition:background-color_5000s_ease-in-out_0s]',
        '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
        '[&:is(:-webkit-autofill,:autofill)]:!rounded-xl',
    ],
    {
        variants: {
            variant: {
                default: 'border-2 border-transparent text-white',
                done: 'border-2 border-gray-900 text-white',
                typing: 'border-2 border-green-400 text-white',
                error: 'border-2 border-red-500 text-white',
            },
            password: {
                true: 'pr-12',
                false: '',
            },
            size: {
                small: 'text-sm leading-5 px-4 py-2 leading-5',
                large: 'text-base leading-6 px-3 py-[10px] leading-6',
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
//에러 메시지 클래스
const errorMessageVariants = cva(
    [
        'pl-1 text-red-500 font-medium text-sm leading-5',
        'md:text-base md:leading-6 transition-all duration-300',
        'ease-in-out overflow-hidden mt-2',
    ],
    {
        variants: {
            animation: {
                start: 'opacity-100 max-h-[44px] translate-y-0 text-red-500',
                end: 'opacity-0 max-h-0 translate-y-[-8px]',
            },
        },
        defaultVariants: {
            animation: 'end',
        },
    }
);
export default function Input({
    type,
    label,
    name,
    register,
    rules,
    className,
    autoComplete = 'off', //자동완성 옵션
    size,
    onFocus,
    //dirtyFields,
    //touchedFields,
    error,
    labelClassName, //라벨 클래스
    errorMessageClass, //에러 메시지 클래스
}: InputProps) {
    //register
    const { onBlur, ...registerProps } = register(name, rules);
    //에러 미시지
    const errorMessage = error?.message;
    //필드를 수정했는지 mode와는 무관하게 DOM 값 기반으로 업데이트됨
    //const isDirty = dirtyFields?.[name];
    //포커스를한적 있는지
    //const isTouched = touchedFields?.[name];
    const [isFocused, setIsFocused] = useState(false);
    //비밀번호 숨기기 관련 상태
    const [showPassword, setShowPassword] = useState(false);
    // 🎯 variant 결정 로직
    function getVariant(): InputVariant {
        if (isFocused) return 'typing'; // 포커스 중이면 무조건 typing
        if (errorMessage) return 'error'; // 에러 있으면 error
        return 'done'; // 그 외는 done (블러 후 상태)
    }
    function handleFocus(e: FocusEvent<HTMLInputElement>) {
        onFocus?.(e);
        setIsFocused(true); // 🟢 포커스 상태로 변경
    }
    function handleBlur(e: FocusEvent<HTMLInputElement>) {
        onBlur?.(e);
        setIsFocused(false); // 🔴 포커스 해제
    }
    /**
     * @description 인풋 상태에 따라 variant 반환 함수
     */
    // 인풋 타입 에러 체크
    useEffect(() => {
        if (type === 'number' && type === 'file') {
            console.warn(
                'number와 file 타입은 다른 인풋 컴포넌트를 사용해주세요'
            );
        }
    }, []);

    return (
        <div className={`w-full}`}>
            <label
                className={cn(
                    labelVariants({ labelSize: size }),
                    labelClassName
                )}
                htmlFor={name}
            >
                {label}
            </label>
            <div className={`${type === 'password' ? 'relative' : ''}`}>
                <input
                    {...registerProps}
                    type={showPassword ? 'text' : type}
                    autoComplete={autoComplete}
                    className={cn(
                        inputVariants({
                            variant: getVariant(),
                            size: size,
                            password: type === 'password',
                        }),
                        className
                    )}
                    name={name}
                    id={name}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {/** @description password 타입일 경우 보이는 비밀번호 숨기기 버튼*/}
                {type === 'password' && (
                    <PasswordButton
                        showPassword={showPassword}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                )}

            </div>
            {/** @description 에러 메시지 애니메이션 효과가 필요없다면 errorMessage로 부분 렌더링 해주면 됩니다. */}
            <p
                className={cn(
                    errorMessageVariants({
                        animation: errorMessage ? 'start' : 'end',
                    }),
                    errorMessageClass
                )}
            >
                {errorMessage}
            </p>
        </div>
    );
}
