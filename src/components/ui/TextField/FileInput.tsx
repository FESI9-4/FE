'use client';
import { InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import {
    useTextFieldStore,
    InputSize,
    InputVariant,
    ValidationResult,
    InputValue,
} from '@/store/textfieldStore';
import { cva } from 'class-variance-authority';
interface FileInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    variant?: InputVariant;
    name?: string;
    inputSize?: InputSize;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onValidate?: (value: InputValue) => ValidationResult;
    // 표시 옵션
    buttonText?: string;
    emptyText?: string;
}
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
                small: `text-sm leading-5`,
                large: `text-base leading-6`,
            },
        },
        defaultVariants: {
            size: 'large',
        },
    }
);
export default function FileInput(props: FileInputProps) {
    const {
        variant,
        name,
        className,
        autoComplete = 'off',
        emptyText = '파일을 선택해주세요.',
        inputSize,
        onChange,
        onValidate,
        buttonText = '파일 찾기',
        ...rest
    } = props;

    // 스토어 연결 (다른 Input과 동일)
    const fieldState = useTextFieldStore((state) =>
        name ? state.fields[name] : null
    );
    const { setDisplayFileName, validate } = useTextFieldStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        // 파일명은 항상 스토어에 저장
        if (name) {
            setDisplayFileName(name, file?.name || '');
        }

        if (name && onValidate) {
            validate(name, file, onValidate);
        }

        onChange?.(e);
    };

    return (
        <div className="flex gap-3 items-center justify-center">
            <input
                name={name}
                id={name} // label 연결용
                autoComplete={autoComplete}
                type="file"
                className="hidden"
                onChange={handleChange}
                {...rest}
            />

            <div
                className={cn(
                    'flex-8',
                    fileInputVariants({
                        variant: variant || fieldState?.variant || 'default',
                        size: inputSize,
                    }),
                    className
                )}
            >
                {fieldState?.displayFileName || emptyText}
            </div>

            <label
                htmlFor={name}
                className={cn(
                    'flex-2',
                    fileCustomButtonVariants({
                        size: inputSize,
                    })
                )}
            >
                {buttonText}
            </label>
        </div>
    );
}
