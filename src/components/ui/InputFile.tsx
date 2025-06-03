'use client';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import {
    FieldError,
    FieldValues,
    RegisterOptions,
    UseFormRegister,
    Path,
} from 'react-hook-form';
import { InputSize, InputVariant } from '@/types/Input';
import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';

interface FileInputProps<TFormValues extends FieldValues = FieldValues>
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'size' | 'type' | 'name'
    > {
    name: Path<TFormValues>;
    label?: string;
    size?: InputSize;
    register: UseFormRegister<TFormValues>;
    rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
    error?: FieldError;
    dirtyFields?: FieldValues;
    touchedFields?: FieldValues;
    labelClassName?: string; //라벨 클래스
    errorMessageClass?: string; //에러 메시지 클래스
    buttonText?: string; //버튼 텍스트
}
//파일 인풋 대체 div 클래스
export const fileInputVariants = cva(
    [
        'rounded-xl font-medium w-full',
        'hover:border-2 hover:border-green-900',
        'bg-gray-900 outline-none transition-border-color duration-300',
        'font-Pretendard truncate whitespace-nowrap',
    ],
    {
        variants: {
            variant: {
                default: `border-2 border-transparent text-gray-600`,
                done: `border-2 border-gray-900 text-white`,
                typing: `border-2 border-green-400 text-white`,
                error: `border-2 border-red-500 text-white`,
            },
            size: {
                small: `text-sm leading-5 px-4 py-2 leading-5`,
                large: `text-base leading-6 px-3 py-[10px] leading-6`,
            },
            displayFileName: {
                true: `text-white`,
                false: `text-gray-400`,
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'large',
        },
    }
);
//파일 인풋 커스텀 label 버튼 클래스
export const fileCustomButtonVariants = cva(
    [
        'bg-gray-900 text-green-400 truncate',
        'border border-green-400 rounded-xl',
        'flex whitespace-nowrap',
        'cursor-pointer font-medium text-sm md:text-base',
        'rounded-full px-[28px] py-[10px] justify-center items-center',
    ],
    {
        variants: {
            size: {
                small: `text-sm leading-4.5`,
                large: `text-base leading-6`,
            },
        },
        defaultVariants: {
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
export default function FileInput<TFormValues extends FieldValues = FieldValues>({
    label,
    name,
    register,
    rules,
    className,
    autoComplete = 'off', //자동완성 옵션
    size,
    placeholder = '이미지를 선택해주세요.',
    buttonText = '파일 업로드',
    labelClassName, //라벨 클래스
    accept, //업로드 가능한 파일 타입
}: FileInputProps<TFormValues>) {
    //register
    const { onChange, ...registerProps } = register(name, rules);
    //인풋 상태 관련 variant
    const [variant, setVariant] = useState<InputVariant>('default');
    //업로드 후 화면 표시용 파일명
    const [displayFileName, setDisplayFileName] = useState('');
    //업로드 버튼 클릭 핸들러
    function handleButtonClick() {
        if (variant === 'typing') return;
        else setVariant('typing');
    }

    /**
     * @description 체인지 핸들러에 유효성 검사를 추가한 이유는
     * input 요소를 hidden으로 숨기고 선택된 파일을 div로 표시하기 때문에 블러나 포커스 이벤트를 이용하려면
     * 코드가 길어질것 같아서 이런식으로 처리 했습니다 혹시 더 좋은 방법이 있다면 알려주시면 감사합니다!!
     * 때문에 상위에서 폼 제출시 실행되는 유효성 검사도 추가를 해서 사용해주셔야 합니다!
     * 핸들러 이벤트내에 유효성 검사를 react-hooks-form 에서 감지하지 못하기 때문입니다!
     */
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        onChange?.(e);
        const file = e.target.files?.[0];
        // 이미지 파일을 허용하는 경우
        if (accept === 'image/*') {
            //파일 사이즈 검사
            if (file) {
                const maxSize = 5 * 1024 * 1024; // 5MB
                if (file.size > maxSize) {
                    setDisplayFileName('5MB 이하로 업로드 해주세요.');
                    setVariant('error');
                    return;
                } else {
                    setDisplayFileName(file.name);
                    setVariant('done');
                    return;
                }
            }
            //파일이 없으면 초기 상태로
            else if (!file) {
                setDisplayFileName('');
                setVariant('default');
            }
            /**
             * @description 혹시 이미지 파일 이외에 파일을 업로드할 경우 필요에 맞게 유효성 검사 로직 추가 필요
             */
        } else {
            console.warn(
                '이미지 파일 형식 이외에 파일을 업로드할 경우 handleChnage를 확인해주세요.'
            );
        }
    }
    return (
        <div className="">
            <label
                className={cn(
                    labelVariants({ labelSize: size }),
                    labelClassName
                )}
                htmlFor={name}
            >
                {label}
            </label>
            <div className="flex gap-3 items-center justify-center">
                <input
                    {...registerProps}
                    accept={accept}
                    name={name}
                    id={name} // label 연결용
                    autoComplete={autoComplete}
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                />
                <div
                    className={cn(
                        'flex-8',
                        fileInputVariants({
                            variant: variant,
                            size: size,
                        }),
                        className
                    )}
                >
                    {displayFileName || placeholder}
                </div>
                <label
                    onClick={handleButtonClick}
                    htmlFor={name}
                    className={cn(
                        'flex-2',
                        fileCustomButtonVariants({
                            size: size,
                        })
                    )}
                >
                    {buttonText}
                </label>
            </div>
        </div>
    );
}
