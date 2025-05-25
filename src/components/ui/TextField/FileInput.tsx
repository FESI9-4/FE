// 🎯 TextFieldFileInput.tsx

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import {
    useTextFieldStore,
    ValidationResult,
    InputSize,
    InputVariant,
    InputValue,
} from '@/store/textfieldStore';
import { cva } from 'class-variance-authority';
interface FileInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
    variant?: InputVariant;
    fieldName?: string;
    inputSize?: InputSize;
    onValidate?: (file: InputValue) => ValidationResult;
    // value 대신 selectedFile 사용
    selectedFile?: File | null; // value 역할
    onFileChange?: (file: File | null) => void; // onChange 역할
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
        className,
        autoComplete = 'off',
        emptyText = '파일을 선택해주세요.',
        inputSize,
        onValidate,
        onFileChange,
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

    const isControlled = selectedFile !== undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        // 파일명은 항상 스토어에 저장
        if (fieldName) {
            setDisplayFileName(fieldName, file?.name || '');
        }

        // 제어 컴포넌트면 부모에게도 알림
        if (isControlled) {
            onFileChange?.(file);
        }

        // 유효성 검사 (공통)
        if (fieldName && onValidate) {
            const result = validate(fieldName, file, onValidate);
            setVariant(fieldName, result.isValid ? 'done' : 'error');
            setShowHelperText(fieldName, !result.isValid);
            setValidatedMessage(fieldName, result.message);
        } else if (fieldName) {
            setVariant(fieldName, file ? 'done' : 'default');
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
                {fieldState?.displayFileName || emptyText}
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
