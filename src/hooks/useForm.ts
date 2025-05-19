import { useState } from 'react';

// 만약 에러 상태로 나타내고 싶다면 유효성 검사를 통해 업데이트 되는 상태값을 넘겨줘야함
export default function useForm(
    initialForm: { [key: string]: string },
    initialIsValid: { [key: string]: boolean }
) {
    // 입력 값
    const [form, setForm] = useState<{ [key: string]: string }>(initialForm);
    const [isValid, setIsValid] = useState<{ [key: string]: boolean }>(
        initialIsValid
    );
    return {
        isValid,
        form,
        setIsValid,
        setForm,
    };
}
