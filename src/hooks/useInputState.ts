import { useState } from 'react';

type InputState = 'default' | 'hover' | 'typing' | 'done' | 'error';

export default function useInputState() {
    // 패스워드 타입일때 눈모양 버튼을 통해 관리되는 비밀번호 숨기기 보이기 상태
    const [isVisible, setIsVisible] = useState(false);
    // 인풋 상태
    const [inputState, setInputState] = useState<InputState>('default');
    // 패스워드 버튼 클릭 이벤트
    function handleVisibleClick() {
        setIsVisible(!isVisible);
    }
    // 넘버 타입 +,- 버튼 클릭 이벤트
    function handleAddClick(value: string, setCount: (count: string) => void) {
        const newValue = Number(value) + 1;
        if (newValue >= 999) setCount?.(String(999));
        else setCount?.(String(newValue));
    }
    function handleSubClick(value: string, setCount: (count: string) => void) {
        const newValue = Number(value) - 1;
        if (newValue < 0) setCount?.(String(0));
        else setCount?.(String(newValue));
    }
    // 호버 이벤트
    function handleHover() {
        setInputState('hover');
    }
    // 마우스 오버 이벤트
    function handleLeave(isValid: boolean, value: string) {
        if (!isValid) setInputState('error');
        else if (value.length > 0) setInputState('done');
        else setInputState('default');
    }
    // 블러 이벤트
    function handleBlur(
        e: React.FocusEvent<HTMLInputElement>,
        isValid: boolean,
        value: string,
        onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    ) {
        onBlur?.(e);
        if (!isValid) setInputState('error');
        else if (isValid && value.length > 0) setInputState('done');
    }
    //체인지 이벤트
    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>,
        type: string,
        setCount: (count: string) => void,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    ) {
        // 넘버 타입일 경우 최대 최소 값 제한
        if (type === 'number') {
            //숫자만 입력되도록 더욱 엄격한 정규식 검사 추가
            const validValue = e.target.value.replace(/[^0-9]/g, '');
            if (validValue !== e.target.value) {
                e.target.value = validValue;
            }
            if (validValue === '') setCount?.('0');
            else if (Number(validValue) >= 999) setCount?.('999');
            else if (Number(validValue) < 0) setCount?.('0');
            else setCount?.(validValue);
        }
        setInputState('typing');
        onChange?.(e); // 값 변경은 상위에 위임
    }

    return {
        isVisible,
        inputState,
        setInputState,
        handleVisibleClick,
        handleAddClick,
        handleSubClick,
        handleHover,
        handleLeave,
        handleBlur,
        handleChange,
    };
}
