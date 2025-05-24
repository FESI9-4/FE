// 🎯 TextFieldFileInput.tsx

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { useTextFieldStore, InputValue } from '@/store/textfieldStore';
import { ValidationResult } from './TextField';
import { cva } from 'class-variance-authority';
// InputProps와 동일하게! (일관성 유지)
interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'done' | 'typing' | 'error';
    fieldName?: string;
    onValidate?: (value: InputValue) => ValidationResult;
    displayFileName?: string;
    inputSize?: 'small' | 'large';
    // 파일 전용 추가 props
    buttonText?: string;
    emptyText?: string;
    selectedFile?: File | null;
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
        'rounded-full px-[28px] py-[10px]',
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
function FileInput(props: FileInputProps, ref: React.Ref<HTMLInputElement>) {
    const {
        selectedFile,
        variant,
        fieldName,
        displayFileName,
        className,
        autoComplete = 'off',
        onChange,
        emptyText = '파일을 선택해주세요.',
        inputSize,
        onValidate,
        buttonText = '파일 찾기',
        ...rest
    } = props;

    // 스토어 연결 (다른 Input과 동일)
    const fieldState = useTextFieldStore((state) =>
        fieldName ? state.fields[fieldName] : null
    );
    const {
        setDisplayFileName,
        setVariant,
        setShowHelperText,
        setValidatedMessage,
        validate,
    } = useTextFieldStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);

        if (onValidate && fieldName) {
            const result = validate(
                fieldName,
                selectedFile?.type || e.target.files?.[0]?.type || null,
                onValidate
            );
            if (result && !result.isValid) {
                setVariant(fieldName, 'error');
                setShowHelperText(fieldName, true);
                setValidatedMessage(fieldName, result.message);
                setDisplayFileName(fieldName, '');
            } else {
                setDisplayFileName(fieldName, e.target.files?.[0]?.name || '');
                setVariant(fieldName, 'done');
            }
        }
    };

    return (
        <div className="flex gap-3 items-center justify-center">
            <input
                ref={ref}
                name={fieldName}
                id={fieldName} // label 연결용
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
                {fieldState?.displayFileName ||
                    displayFileName ||
                    rest.placeholder ||
                    emptyText}
            </div>

            <label
                htmlFor={fieldName}
                className={cn(
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

export default forwardRef(FileInput);
