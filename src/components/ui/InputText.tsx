import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { InputSize } from './Input';
import React, { TextareaHTMLAttributes } from 'react';
import {
    FieldError,
    FieldValues,
    RegisterOptions,
    UseFormRegister,
    Path,
} from 'react-hook-form';

interface InputTextProps<TFormValues extends FieldValues = FieldValues>
    extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'name'> {
    name: Path<TFormValues>;
    label?: string;
    register: UseFormRegister<TFormValues>;
    rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
    error?: FieldError;
    dirtyFields?: FieldValues;
    touchedFields?: FieldValues;
    labelClassName?: string; //라벨 클래스
    errorMessageClass?: string; //에러 메시지 클래스
    size?: InputSize;
}

//Textarea 클래스
const inputTextVariants = cva([
    'w-full h-[86px] tracking-normal',
    'outline-none',
    'border-gray-900 border-r-10',
    'font-pretendard tracking-normal',
    'text-base leading-base',
    'font-weight-medium rounded-lg',
    'bg-gray-900 text-white placeholder:text-gray-600 placeholder:text-sm',
    'py-3 pl-4 pr-[6px] overflow-y-auto',
    'resize-none break-words',
    'custom-textarea-scrollbar',
]);
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
export default function InputText<
    TFormValues extends FieldValues = FieldValues,
>({
    name,
    register,
    rules,
    className,
    autoComplete = 'off', //자동완성 옵션
    labelClassName,
    size,
    label,
     placeholder,
}: InputTextProps<TFormValues>) {
    /**
     * @description 댓글 작성시 헬퍼텍스트는 필요하지 않을것 같아서 추가하지 않았습니다.
     * 만약 댓글 작성시 글자수 제한이 필요한 경우에 상위에서 error를 받아 처리해주세요. (Input컴포넌트 참고)
     */
    return (
        <div className="w-full">
            <label
                className={cn(
                    labelVariants({ labelSize: size }),
                    labelClassName
                )}
                htmlFor={name as string}
            >
                {label}
            </label>
            <textarea
                {...register(name, rules)}
                autoComplete={autoComplete}
                className={cn(inputTextVariants(), className)}
                 placeholder={placeholder} 
                name={name as string}
                id={name as string}
            />
        </div>
    );
}
