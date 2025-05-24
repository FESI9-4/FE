'use client';
import { forwardRef, useEffect } from 'react';
import { useTextFieldStore } from '@/store/textfieldStore'; // ← 이거 추가!
import Label, { LabelProps } from './Label';
import Input, { InputProps } from './Input';
import HelperText, { HelperTextProps } from './HelperText';
type ValidationResult = {
    isValid: boolean;
    message: string;
};
// 컴포넌트의 Props 타입 정의
interface TextFieldProps extends InputProps {
    label?: string; // 레이블 텍스트
    helperText?: string; // 오류 메시지
    displayFileName?: string; // 파일명 표시용
    onValidate?: (value: string) => ValidationResult;
    slotProps?: {
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
            name,
            variant: propsVariant,
            displayFileName: propsDisplayFileName,
            slotProps,
            onValidate: onValidateProp,
            onFocus: onFocusProp,
            onBlur: onBlurProp,
            onChange: onChangeProp,
            ...rest
        } = props;

        // ✅ 새로운: 해당 필드의 상태만 가져오기
        const fieldState = useTextFieldStore((state) => state.fields[name]);
        const {
            initField,
            setVariant,
            setShowHelperText,
            setValidatedMessage,
            setDisplayFileName,
            setIsControlled,
        } = useTextFieldStore();
        // 필드 초기화
        useEffect(() => {
            if (!fieldState) {
                initField(name); // 해당 필드 초기화!
            }
        }, [name, fieldState, initField]);

        // 제어/비제어 설정
        useEffect(() => {
            const controlled = value !== undefined;
            console.log('🔍 value:', value);
            console.log('🔍 controlled:', controlled);
            setIsControlled(name, controlled); // ← fieldName 추가!
        }, [value, name, setIsControlled]);

        // 포커스 이벤트 핸들러
        function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
            //제어 * 상위 컴포넌트 이벤트 먼저 실행
            onFocusProp?.(e);
            //비제어
            if (!fieldState?.isControlled) {
                const file = e.target.files?.[0];
                if (file) {
                    setDisplayFileName(name, file.name);
                } else {
                    setDisplayFileName(name, '');
                }
                setVariant(name, 'typing');
            }
        }
        // 블러 이벤트 핸들러
        function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
            // 상위 컴포넌트의 onBlur 호출
            onBlurProp?.(e);
            if (!fieldState?.isControlled && onValidateProp) {
                const { value } = e.target;
                const result = onValidateProp?.(value);
                if (result.isValid) {
                    setVariant(name, 'done');
                    setShowHelperText(name, false);
                    setValidatedMessage(name, result.message);
                } else {
                    setVariant(name, 'error');
                    setShowHelperText(name, true);
                    setValidatedMessage(name, result.message);
                }
            }
        }
        function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
            onChangeProp?.(e);
            if (!fieldState?.isControlled) {
                console.log('비제어 이미지 변경');
                setVariant(name, 'typing');
                const { name, value } = e.target;
                if (name === 'file') {
                    const result = onValidateProp?.(value);
                    const selectedFileName = e.target.files?.[0]?.name;
                    if (result?.isValid) {
                        setVariant(name, 'done');
                        setShowHelperText(name, false);
                        setValidatedMessage(name, result.message);
                        setDisplayFileName(name, selectedFileName ?? '');
                    } else {
                        setVariant(name, 'error');
                        setShowHelperText(name, true);
                        setValidatedMessage(name, result?.message || '');
                        setDisplayFileName(name, result?.message || '');
                    }
                }
            }
        } //인풋 관련 프룹스
        const inputProps = {
            displayFileName:
                fieldState?.displayFileName || propsDisplayFileName,
            variant: propsVariant || fieldState?.variant,
            isControlled: fieldState?.isControlled,
            // 제어/비제어 모드에 따라 value 또는 defaultValue 전달
            ...(fieldState?.isControlled
                ? { value }
                : { defaultValue: defaultValue || '' }),
            ref: ref, // 외부에서 전달받은 ref를 Input에 전달
            onFocus: handleFocus,
            onBlur: handleBlur,
            onChange: handleChange,
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
            children:
                helperText ||
                fieldState?.validatedMessage ||
                '헬퍼 텍스트를 입력하세요.',
            className: slotProps?.helperText?.className,
            isShow: slotProps?.helperText?.isShow || fieldState?.showHelperText,
            ...slotProps?.helperText,
        };

        // value와 defaultValue가 모두 있을 경우 경고 (둘 중 하나만 선택해야함)
        if (process.env.NODE_ENV !== 'production') {
            if (fieldState?.isControlled && defaultValue !== undefined) {
                console.warn(
                    'TextField는 제어 컴포넌트로 사용될 때(value 속성 제공) defaultValue를 무시합니다.'
                );
            }
        }
        return (
            <div className="flex flex-col w-full">
                <Label {...labelProps} />
                <Input {...inputProps} />
                <HelperText {...helperTextProps} />
            </div>
        );
    }
);
