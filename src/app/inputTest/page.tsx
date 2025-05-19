'use client';
import { Input } from '@/components/ui';
import useForm from '@/hooks/useForm';

export default function Test() {
    //form은 인풋 입력값
    //isValid는 인풋 유효성 검사 결과
    const { form, setForm, isValid, setIsValid } = useForm(
        {
            email: '',
            password: '',
            text: '',
            file: '',
            count: '0',
        },
        {
            // 유효성 검사 기본값은 true로 줘야합니다!!
            email: true,
            password: true,
            text: true,
            file: true,
            count: true,
        }
    );

    // 체인지 이벤트
    // 파일 업로드 같은 경우 체인이 이벤트때 유효성 검증
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setForm({ ...form, email: value });
                break;
            case 'password':
                setForm({ ...form, password: value });
                break;
            case 'text':
                setForm({ ...form, text: value });
                break;
            case 'file':
                const { files } = e.target;
                if (files && files.length > 0 && files[0].size > 0) {
                    // 업로드한 파일 확장자 체크
                    const VALID_TYPE = [
                        'image/jpeg',
                        'image/png',
                        'image/gif',
                        'image/webp',
                        'image/svg+xml',
                    ];
                    if (VALID_TYPE.includes(files[0].type)) {
                        setIsValid({ ...isValid, file: true });
                        setForm({ ...form, file: files[0].name });
                    } else {
                        setIsValid({ ...isValid, file: false });
                        setForm({
                            ...form,
                            file: '올바른 형식의 파일을 업로드해주세요.',
                        });
                    }
                }
                break;
        }
    }
    // 블러 이벤트
    // 파일 이외에는 블러 이벤트때 유효성 검증
    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    setIsValid({ ...isValid, email: false });
                } else {
                    setIsValid({ ...isValid, email: true });
                }
                break;
            case 'password':
                if (value.length < 8) {
                    setIsValid({ ...isValid, password: false });
                } else {
                    setIsValid({ ...isValid, password: true });
                }
                break;
            case 'text':
                if (value.length < 2) {
                    setIsValid({ ...isValid, text: false });
                } else {
                    setIsValid({ ...isValid, text: true });
                }
                break;
        }
    }
    return (
        <div className="bg-[#aeb0b8] gap-5 min-h-screen flex items-center justify-center">
            <div className="flex flex-col gap-5 p-5 w-full">
                <Input
                    id="input-email"
                    label="이메일"
                    value={form.email}
                    placeholder="이메일을 입력해주세요."
                    type="email"
                    name="email"
                    isValid={isValid.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage="이메일 형식이 올바르지 않습니다."
                />
                <Input
                    id="input-text"
                    label="닉네임"
                    value={form.text}
                    placeholder="닉네임을 입력해주세요."
                    type="text"
                    name="text"
                    isValid={isValid.text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage="유효하지 않거나 이미 사용중인 닉네임입니다."
                    autoComplete="on"
                />
                <Input
                    id="input-password"
                    label="비밀번호"
                    value={form.password}
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                    name="password"
                    isValid={isValid.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage="비밀번호는 8자 이상이어야 합니다."
                />
                <Input
                    id="input-file"
                    label="파일"
                    value={form.file}
                    type="file"
                    name="file"
                    isValid={isValid.file}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    //인풋 밑에 에러 메시지 표시하려면 아래 주석 해제
                    //errorMessage="올바른 형식의 파일을 업로드해주세요."
                />
                <Input
                    id="input-count"
                    label="숫자"
                    value={form.count}
                    placeholder="0"
                    type="number"
                    name="count"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    setCount={(count) => setForm({ ...form, count })}
                />
            </div>
        </div>
    );
}
