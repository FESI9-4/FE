'use client';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { TextareaHTMLAttributes } from 'react';

interface InputTextProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string; // 라벨 메시지
    name?: string; // 라벨 htmlFor 속성 과 textarea id 속성 값
}
const inputTextVariants = cva([
    'w-full h-[86px] tracking-normal',
    'outline-none',
    'border-gray-900 border-r-10',
    'font-pretendard tracking-normal',
    'text-base leading-base',
    'font-weight-medium rounded-lg',
    'bg-gray-900 text-white placeholder:text-gray-600',
    'py-3 pl-4 pr-[6px] overflow-y-auto',
    'resize-none break-words',
    'custom-textarea-scrollbar',
]);
export default function InputText({
    placeholder = '게시글을 작성해주세요.',
    name,
    onChange,
    className,
    ...props
}: InputTextProps) {
    return (
        <div className="flex flex-col w-full h-[86px]">
            <textarea
                placeholder={placeholder}
                id={name}
                onChange={onChange}
                className={cn(inputTextVariants(), className)}
                {...props}
            />
        </div>
    );
}
