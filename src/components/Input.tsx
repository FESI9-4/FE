import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps
    extends InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof InputVariants> {
    isError?: boolean | null;
}

const BASE_STYLE = `rounded-xl font-medium mb-2
    bg-gray-900 outline-none placeholder:text-gray-600
    transition-border-color duration-300 font-Pretendard
    [&:is(:-webkit-autofill,:autofill)]:!bg-gray-800
    [&:is(:-webkit-autofill,:autofill)]:!text-gray-400
    [&:is(:-webkit-autofill,:autofill)]:!shadow-[0_0_0_1000px_rgb(43,44,48)_inset]
    [&:is(:-webkit-autofill,:autofill)]:![-webkit-text-fill-color:rgb(107,114,128)]`;
// 인풋 스타일
export const InputVariants = cva(BASE_STYLE, {
    variants: {
        variant: {
            default: `border-2 border-transparent text-white`,
            hover: `border-2 border-green-900 text-white`,
            done: `border-2 border-gray-900 text-white`,
            typing: `border-2 border-green-400 text-white`,
            error: `border-2 border-red-500 text-white`,
        },
        inputSize: {
            small: `text-sm leading-5 px-4 py-2 leading-5`,
            large: `text-base leading-6 px-3 py-[10px] leading-6`,
        },
    },
    defaultVariants: {
        variant: 'default',
        inputSize: 'small',
    },
});

/* forwardRef을 사용하면
 부모 컴포넌트가 자식 컴포넌트의 DOM 요소에 직접 접근할 수 있습니다.*/
const Input = forwardRef<HTMLInputElement, InputProps>(
    function Input(props, ref) {
        const {
            value,
            defaultValue,
            variant,
            inputSize,
            className,
            isError,
            onChange,
            ...rest
        } = props;
        // 에러 상태라면 에러 스타일 적용
        const inputVariant = isError ? 'error' : variant;

        return (
            <input
                className={cn(
                    InputVariants({ variant: inputVariant, inputSize }),
                    className
                )}
                onChange={onChange}
                // value가 제공되면 제어 컴포넌트로, 제공되지 않으면 비제어 컴포넌트로 동작
                value={value !== undefined ? value : undefined} // 제어 컴포넌트
                defaultValue={value === undefined ? defaultValue : undefined} // 비제어 컴포넌트                {...rest}
                ref={ref}
            />
        );
    }
);

export default Input;
