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
    placeholder = '게시글을 작성해주세요.',
    name,
    onChange,
    className,
    ...props
}: InputTextProps) {
    const inputTextVariants = cva([
        'w-full h-[86px] tracking-normal',
        'outline-none',
        'border-gray-900 border-r-10',
        'font-pretendard tracking-normal',
        'text-base leading-base',
        'font-weight-medium rounded-xl',
        'bg-gray-900 text-white placeholder:text-gray-600',
        'py-3 pl-4 pr-[6px] overflow-y-auto',
        'resize-none break-words',
        ' [&::-webkit-scrollbar]:w-[6px]',
        ' [&::-webkit-scrollbar-track]:bg-transparent',
        ' [&::-webkit-scrollbar-thumb]:bg-gray-600',
        '[&::-webkit-scrollbar-thumb]:min-h-[45px]',
        '[&::-webkit-scrollbar-thumb]:max-h-[45px]',
        ' [&::-webkit-scrollbar-thumb]:rounded-lg',
        ' [&::-webkit-scrollbar-track]:mt-3', // 트랙 상단 여백
        ' [&::-webkit-scrollbar-track]:mb-3',
        '[&::-webkit-scrollbar]:appearance-none',
        '[&::-webkit-scrollbar-thumb]:flex-shrink-0',
        '[&::-webkit-scrollbar-thumb]:background-clip-padding-box',
    ]);
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
