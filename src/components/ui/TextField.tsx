'use client';
import { InputHTMLAttributes, HTMLAttributes, useRef, useState } from 'react';
import { type VariantProps } from 'class-variance-authority';
import Label from './Label';
import { LabelVariants } from './Label';
import Input, { InputVariants } from '../Input';
import HelperText, { HelperTextVariants } from './HelperText';
// 컴포넌트의 Props 타입 정의
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    value?: string; // 인풋 값
    label?: string; // 레이블 텍스트
    isError?: boolean; // 오류 상태
    helperText?: string; // 오류 메시지
    slotProps?: {
        //라벨,인풋,헬퍼 텍스트 관련 프롭스
        input?: InputHTMLAttributes<HTMLInputElement> &
            VariantProps<typeof InputVariants>; // HTML input 속성
        inputLabel?: HTMLAttributes<HTMLLabelElement> &
            VariantProps<typeof LabelVariants>; // HTMLLabelElement 속성으로 변경
        helperText?: HTMLAttributes<HTMLSpanElement> &
            VariantProps<typeof HelperTextVariants>; // HTMLSpanElement 속성으로 변경
    };
}

export default function TextField(props: TextFieldProps) {
    const {
        value, //제어 컴포넌트 일 경우 사용,
        onChange, //제어 컴포넌트 일 경우 사용
        isError = false, // 오류 상태
        label, // 라벨안 내용
        helperText, // 헬퍼 텍스트
        slotProps, // 라벨,인풋,헬퍼 텍스트 관련 프롭스
        ...rest
    } = props;
    //라벨 관련 프룹스
    const labelProps = {
        htmlFor: slotProps?.inputLabel?.id,
        labelSize: slotProps?.inputLabel?.labelSize,
        children: label,
        className: slotProps?.inputLabel?.className,
    };

    // 비제어 컴포넌트를 위한 ref
    const inputRef = useRef<HTMLInputElement>(null);
    // 비제어 컴포넌트에서 사용할 isError 상태
    const [uncontrolError, setUncontrolError] = useState(false);
    // 비제어 컴포넌트에서 사용되는 changeHandler
    function uncontrolledHandleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value, type } = e.target;
        if (onChange) onChange(e); // 제어일경우 상위에서 제공한 onChange 사용

        if (inputRef.current) {
            switch (type) {
                case 'file':
                    const file = e.target.files?.[0]; // 선택된 파일 가져오기
                    if (file) {
                        const validImageTypes = [
                            'image/jpeg',
                            'image/png',
                            'image/gif',
                        ]; // 허용할 이미지 타입
                        if (!validImageTypes.includes(file.type)) {
                            setUncontrolError(true); // 이미지가 아닐 경우 오류 상태 설정
                            inputRef.current.value = ''; // 입력 필드 초기화
                        } else {
                            setUncontrolError(false); // 유효한 이미지 파일일 경우 오류 상태 해제
                        }
                    }
                    break;
                case 'number':
                    // 숫자 타입일 경우 0~9의 문자만 허용
                    if (!/^\d*$/.test(value)) {
                        // 정규 표현식으로 숫자만 허용
                        setUncontrolError(true); // 숫자가 아닐 경우 오류 상태 설정
                        inputRef.current.value = ''; // 입력 필드 초기화
                    } else {
                        setUncontrolError(false); // 유효한 숫자일 경우 오류 상태 해제
                        inputRef.current.value = value; // 유효한 숫자일 경우 값 설정
                    }
                    break;
                default:
                    inputRef.current.value = value;
                    break;
            }
        }
    }
    //인풋 관련 프룹스
    const inputProps = {
        id: slotProps?.input?.id,
        type: slotProps?.input?.type,
        placeholder: slotProps?.input?.placeholder,
        className: slotProps?.input?.className,
        // 제어일 경우 위에서 제공한 isError 사용
        // 비제어일 경우 uncontrolError 사용
        isError: value === undefined ? uncontrolError : isError,
        // value가 있을 경우에만 설정 (상위에서 값을 줄 경우 제어 안주면 비제어)
        defaultValue: value === undefined ? '' : value,
        // 상위에서 onChange 핸들러를 제공한다면 해당 헨들러 사용
        // 제공하지 않는다면 inputRef를 통해 비제어 컴포넌트로 처리
        onChange: uncontrolledHandleChange,
        ref: inputRef, // ref를 인풋에 전달
        ...rest,
    };
    //헬퍼 텍스트 관련 프룹스
    const helperTextProps = {
        className: slotProps?.helperText?.className,
        ...rest,
    };
    return (
        <div className="flex flex-col w-full ">
            <Label {...labelProps}>{label}</Label>
            <Input {...inputProps} isError={isError} value={value} />
            <HelperText {...helperTextProps} isError={isError}>
                {helperText}
            </HelperText>
        </div>
    );
}
