import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { InputHTMLAttributes, forwardRef, useRef, useState } from 'react';
import { VisibilityOffIcon, VisibilityOnIcon } from '@/assets';

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
    VariantProps<typeof InputVariants> & {};
/*내부에서만 사용할 확장 타입 정의 (isControlled 값은 상위에서 value 값의 유무로 정해지는거라
부모 컴포넌트에서 전달할수 없어야함)*/
interface InnerInputProps extends InputProps {
    isControlled?: boolean;
}
//https://developer.mozilla.org/ko/docs/Web/HTML/Reference/Attributes/autocomplete
const BASE_STYLE = `rounded-xl font-medium w-full
    hover:border-2 hover:border-green-900 hover:text-white
    bg-gray-900 outline-none placeholder:text-gray-600 caret-white
    transition-border-color duration-300 font-Pretendard
    text-sm leading-5 px-4 py-2 leading-5
    sm:text-base sm:leading-6 sm:px-3 sm:py-[10px] sm:leading-6
    [&:is(:-webkit-autofill,:autofill)]:!shadow-[0_0_0px_1000px_rgb(26,27,31)_inset]
    [&:is(:-webkit-autofill,:autofill)]:![-webkit-text-fill-color:rgb(255,255,255)]
    [&:is(:-webkit-autofill,:autofill)]:!rounded-xl`;

// 인풋 스타일
export const InputVariants = cva(BASE_STYLE, {
    variants: {
        variant: {
            default: `border-2 border-transparent text-white`,
            done: `border-2 border-gray-900 text-white`,
            typing: `border-2 border-green-400 text-white`,
            error: `border-2 border-red-500 text-white`,
        },
        password: {
            true: `pr-12`,
            false: ``,
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

/* forwardRef을 사용하면
 부모 컴포넌트가 자식 컴포넌트의 DOM 요소에 직접 접근할 수 있습니다.*/
const Input = forwardRef<HTMLInputElement, InnerInputProps>(
    function Input(props, ref) {
        const [showPassword, setShowPassword] = useState(false);
        // 패스워드 버튼 클릭 이벤트
        function togglePassword() {
            setShowPassword(!showPassword);
        }
        const {
            value,
            defaultValue,
            variant,
            className,
            isControlled,
            autoComplete = 'off', // 자동 완성 기능 비활성화
            type,
            ...rest
        } = props;
        // 비제어 컴포넌트에서 사용할 내부 ref
        const innerRef = useRef<HTMLInputElement>(null);
        // 실제로 사용할 ref (외부에서 전달받은 ref가 있으면 사용, 없으면 내부 ref 사용)
        const inputRef = ref || innerRef;
        // 파일 커스텀 업로드 버튼 스타일
        const fileCustomButtonClasses = `bg-gray-850 text-green-400
        border border-green-400 rounded-xl px-2 flex items-center justify-center whitespace-nowrap
        cursor-pointer font-medium text-sm md:text-base rounded-full h-[38px] sm:h-[42px]`;

        return (
            <div className={`w-full ${type === 'password' ? 'relative' : ''}`}>
                {/* File 인풋일 경우 */}
                {type === 'file' ? (
                    <div className="flex gap-3 h-full">
                        <input
                            autoComplete={autoComplete}
                            type={type}
                            ref={inputRef}
                            className="hidden"
                            {...rest} // 파일 입력에 필요한 속성 전달
                        />
                        <div
                            className={cn(
                                'flex-8',
                                InputVariants({
                                    variant: variant,
                                }),
                                className
                            )}
                        >
                            {rest.placeholder || '이미지를 첨부해주세요'}
                        </div>
                        <label
                            htmlFor={rest.id}
                            className={cn('flex-2', fileCustomButtonClasses)}
                        >
                            파일 찾기
                        </label>
                    </div>
                ) : (
                    <input
                        autoComplete={autoComplete}
                        type={showPassword ? 'text' : type}
                        className={cn(
                            InputVariants({
                                variant: variant,
                                password: type === 'password',
                            }),
                            className
                        )}
                        /* isControlled는 이미 분리했으므로 여기서 조건부로 처리 */
                        {...(isControlled ? { value } : { defaultValue })}
                        ref={inputRef}
                        {...rest}
                    />
                )}
                {/* password 타입일 경우 숨기기 표시 */}
                {type === 'password' && (
                    <button
                        type="button"
                        className="absolute h-[80%] right-3 top-1/2 -translate-y-1/2 cursor-pointer px-1 hover:bg-gray-800 rounded"
                        onClick={togglePassword}
                    >
                        {showPassword ? (
                            <VisibilityOnIcon
                                width={24}
                                height={24}
                                className="text-gray-500"
                            />
                        ) : (
                            <VisibilityOffIcon
                                width={24}
                                height={24}
                                className="text-gray-500"
                            />
                        )}
                    </button>
                )}
            </div>
        );
    }
);

export default Input;
