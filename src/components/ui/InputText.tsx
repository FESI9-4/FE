'use client';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';

interface InputTextProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string; // 라벨 메시지
    name?: string; // 라벨 htmlFor 속성 과 textarea id 속성 값
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function InputText({
    label,
    name,
    onChange,
    ...props
}: InputTextProps) {
    const inputTextVariants = cva(
        [
            'w-full h-30 mt-4 tracking-normal',
            'outline-none border-10',
            'border-gray-50',
            'font-pretendard tracking-normal',
            'font-weight-medium rounded-xl',
            'bg-gray-50 text-gray-800',
            'py-1 px-2 overflow-y-auto line-height-base',
            'resize-none whitespace-normal break-words',
            ' [&::-webkit-scrollbar]:w-[4px]',
            ' [&::-webkit-scrollbar-track]:w-10',
            ' [&::-webkit-scrollbar-track]:bg-transparent',
            ' [&::-webkit-scrollbar-thumb]:bg-gray-200',
            ' [&::-webkit-scrollbar-thumb]:min-h-7',
            ' [&::-webkit-scrollbar-thumb]:rounded-lg',
        ],
        {
            variants: {
                size: {
                    sm: 'h-10',
                    md: 'h-20',
                    lg: 'h-30',
                },
            },
            defaultVariants: {
                size: 'md',
            },
        }
    );
    return (
        <div className="flex flex-col">
            <label
                htmlFor={name}
                className="font-semibold text-sm leading-5 md:h-[44px] md:text-base md:leading-6"
            >
                {label}
            </label>
            <textarea
                id={name}
                onChange={onChange}
                className={cn(inputTextVariants({ size: 'md' }))}
                {...props}
            />
        </div>
    );
}
