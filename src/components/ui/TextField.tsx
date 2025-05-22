'use client';
import { InputHTMLAttributes, forwardRef, useState } from 'react';
import Label, { LabelProps } from './Label';
import Input, { InputProps } from './Input';
import HelperText, { HelperTextProps } from './HelperText';
// 컴포넌트의 Props 타입 정의
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    value?: string; // 인풋 값
    label?: string; // 레이블 텍스트
    helperText?: string; // 오류 메시지
    slotProps?: {
        // 라벨, 인풋, 헬퍼 텍스트 관련 프롭스
        input?: InputProps;
        inputLabel?: LabelProps;
        helperText?: HelperTextProps;
    };
}

// forwardRef를 사용하여 외부에서 ref를 받을 수 있도록 수정
export default forwardRef<HTMLInputElement, TextFieldProps>(
    function TextField(props, ref) {
        const {
            value,
            defaultValue,
            label,
            helperText,
            slotProps,
            onFocus: onFocusProp,
            onBlur: onBlurProp,
            ...rest
        } = props;

        // value가 있으면 제어 컴포넌트, 없으면 비제어 컴포넌트
        const isControlled = value !== undefined;
        //외부에서 전달받은 Variant
        const outerVariant = slotProps?.input?.variant;
        //나중에 훅으로 따로 분리 할 예정
        const [ShowHelperText, setShowHelperText] = useState(false);
        const [InnerVariant, setInnerVariant] = useState<
            'default' | 'done' | 'typing' | 'error'
        >('default');

        const isVariantControlled = outerVariant !== undefined;
        const currentVariant = isVariantControlled
            ? outerVariant
            : InnerVariant;

        // 포커스 이벤트 핸들러
        function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
            //제어 * 상위 컴포넌트 이벤트 먼저 실행
            onFocusProp?.(e);
            //비제어
            if (!isControlled) {
                setInnerVariant('typing');
            }
        }
        // 블러 이벤트 핸들러
        function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
            const { name, value } = e.target;
            // 상위 컴포넌트의 onBlur 호출 (있다면)
            if (onBlurProp) {
                onBlurProp(e);
                return;
            }
            console.log('UnControlled handleBlur');

            // name에 따라 입력 유효성 검사 (type으로 검사하는 것보다 더 유연할것 같슴다)
            switch (name) {
                case 'email':
                    if (value.includes('@')) {
                        setInnerVariant('done');
                        setShowHelperText(false);
                    } else {
                        setInnerVariant('error');
                        setShowHelperText(true);
                    }
                    break;
                case 'name':
                    if (value.length > 10) {
                        console.log('done');
                        setInnerVariant('done');
                        setShowHelperText(false);
                    } else {
                        console.log('error');
                        setInnerVariant('error');
                        setShowHelperText(true);
                    }
                    break;
                default:
                    setInnerVariant('done');
                // setShowHelperText(false);
            }
            //setInputVariant('done');
        }

        // value와 defaultValue가 모두 있을 경우 경고 (둘 중 하나만 선택해야함)
        if (process.env.NODE_ENV !== 'production') {
            if (isControlled && defaultValue !== undefined) {
                console.warn(
                    'TextField는 제어 컴포넌트로 사용될 때(value 속성 제공) defaultValue를 무시합니다.'
                );
            }
        }
        //인풋 관련 프룹스
        const inputProps = {
            variant: currentVariant,
            isControlled: isControlled,
            // 제어/비제어 모드에 따라 value 또는 defaultValue 전달
            ...(isControlled
                ? { value }
                : { defaultValue: defaultValue || '' }),
            ref: ref, // 외부에서 전달받은 ref를 Input에 전달
            onFocus: handleFocus,
            onBlur: handleBlur,
            ...rest,
        };
        //라벨 관련 프룹스
        const labelProps = {
            children: label,
            labelSize: slotProps?.inputLabel?.labelSize,
            ...slotProps?.inputLabel,
        };
        //헬퍼 텍스트 관련 프룹스
        const helperTextProps = {
            children: helperText,
            className: slotProps?.helperText?.className,
            isShow: slotProps?.helperText?.isShow || ShowHelperText,
            ...slotProps?.helperText,
        };

        return (
            <div className="flex flex-col w-full">
                <Label {...labelProps} />
                <Input {...inputProps} />
                <HelperText {...helperTextProps} />
            </div>
        );
    }
);
