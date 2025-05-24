import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { InputHTMLAttributes, forwardRef } from 'react';
import { ValidationResult } from './TextField';
import { useTextFieldStore } from '@/store/textfieldStore';
import PasswordButton from './PasswordButton';
import { InputValue } from '@/store/textfieldStore';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'done' | 'typing' | 'error';
    fieldName?: string;
    onValidate?: (value: InputValue) => ValidationResult;
    inputSize?: 'small' | 'large';
}
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
/* forwardRef을 사용하면
부모 컴포넌트가 자식 컴포넌트의 DOM 요소에 직접 접근할 수 있습니다.*/
function Input(props: InputProps, ref: React.Ref<HTMLInputElement>) {
    const {
        value,
        defaultValue,
        variant,
        className,
        autoComplete = 'off', // 자동 완성 기능 비활성화
        type,
        fieldName: fieldName,
        inputSize,
        onFocus,
        onChange,
        onBlur,
        onValidate,
        ...rest
    } = props;
    // 스토어 연결
    const fieldState = useTextFieldStore((state) =>
        fieldName ? state.fields[fieldName] : null
    );
    // 스토어에서 관리되는 UI 상태 업데이트 함수들
    const { setVariant, validate, setShowHelperText, setValidatedMessage } =
        useTextFieldStore();
    //제어,비제어 유무
    const isControlled = value !== undefined;
    // 이벤트 핸들러
    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
        onFocus?.(e);
    }
    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        onBlur?.(e);
        //비제어일 경우
        if (!isControlled && fieldName) {
            // 유효성 검증 함수가 있을 경우
            if (onValidate) {
                // 유효성 검증 함수 실행 및 결과 반환
                const result = validate(
                    fieldName,
                    value || e.target.value,
                    onValidate
                );
                setVariant(fieldName, result.isValid ? 'done' : 'error');
                setShowHelperText(fieldName, !result.isValid);
                setValidatedMessage(fieldName, result.message);
            }
            // 유효성 검증이 필요 없을 경우
            setVariant(fieldName, 'done');
        }
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onChange?.(e);
        // 체인지 이벤트시 기본 상태 변경
        if (fieldName) setVariant(fieldName, 'typing');
        if (fieldName && onValidate) {
            const result = onValidate(value || e.target.value);
            setVariant(fieldName, result.isValid ? 'done' : 'error');
            setShowHelperText(fieldName, !result.isValid);
            setValidatedMessage(fieldName, result.message);
        }
    }
    return (
        <div className={`w-full ${type === 'password' ? 'relative' : ''}`}>
            <input
                ref={ref}
                type={fieldState?.showPassword ? 'text' : type}
                className={cn(
                    inputVariants({
                        variant: variant || fieldState?.variant,
                        size: inputSize,
                        password: type === 'password',
                    }),
                    className
                )}
                autoComplete={autoComplete}
                name={fieldName}
                id={fieldName}
                onFocus={handleFocus}
                onChange={handleChange}
                onBlur={handleBlur}
                {...(isControlled ? { value } : { defaultValue })}
                {...rest}
            />
            {type === 'password' && <PasswordButton fieldName={fieldName} />}
        </div>
    );
}

export default forwardRef(Input);
