'use client';
import TextField from '@/components/ui/TextField';
import { useState } from 'react';
import { validators } from '@/utils/validators';
interface InputState {
    value: string;
    variant: 'default' | 'done' | 'typing' | 'error';
    helperText: string;
    showHelper: boolean;
    //파일명 표시용
    fileName?: string;
}
type FormStates = { [key: string]: InputState };
function Text() {
    //제어 컴포넌트
    const [formState, setFormState] = useState<FormStates>({
        name: {
            value: '',
            variant: 'default',
            helperText: '',
            showHelper: false,
        },
        file: {
            value: '',
            variant: 'default',
            helperText: '',
            showHelper: false,
            fileName: '',
        },
    });
    //제어 컴포넌트 유효성 검증 관련 이벤트 핸들러
    function handleBlur(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        let result;
        //제어 컴포넌트 같은 경우에는 유효성 검증 결과 메시지 자유롭게 바꿀수있음
        switch (name) {
            case 'name':
                result = validators.validateNickname(value);
                if (result?.isValid) {
                    setFormState({
                        ...formState,
                        name: {
                            ...formState.name,
                            variant: 'done',
                            helperText: result.message,
                            showHelper: false,
                        },
                    });
                } else {
                    setFormState({
                        ...formState,
                        name: {
                            ...formState.name,
                            variant: 'error',
                            helperText: result.message,
                            showHelper: true,
                        },
                    });
                }
                break;
        }
    }
    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
        const { name } = e.target;
        setFormState({
            ...formState,
            [name]: {
                ...formState[name],
                variant: 'typing',
            },
        });
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        //typing 상태로 변경
        setFormState({
            ...formState,
            [name]: {
                ...formState.name,
                variant: 'typing',
            },
        });
        switch (name) {
            case 'file':
                setFormState({
                    ...formState,
                    file: {
                        ...formState.file,
                        value: value,
                    },
                });
                const selectedFileName = e.target.files?.[0]?.name;
                const result = validators.validateImage(value);
                if (result.isValid) {
                    setFormState({
                        ...formState,
                        file: {
                            ...formState.file,
                            variant: 'done',
                            helperText: result.message,
                            showHelper: false,
                            fileName: selectedFileName ?? '',
                        },
                    });
                } else {
                    setFormState({
                        ...formState,
                        file: {
                            ...formState.file,
                            value: '',
                            variant: 'error',
                            helperText: result.message,
                            showHelper: true,
                            fileName: result.message,
                        },
                    });
                }
                break;
            default:
                setFormState({
                    ...formState,
                    [name]: {
                        ...formState[name],
                        value: value,
                    },
                });
                break;
        }
    }

    return (
        <div className="flex flex-col w-full p-10 gap-10 bg-gray-700">
            <div>
                <h1 className="text-white text-2xl font-bold mb-5">
                    제어 컴포넌트
                </h1>
                <TextField
                    id="name"
                    label="이름"
                    helperText={formState.name.helperText}
                    value={formState.name.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    type="text"
                    placeholder="이름을 입력해주세요."
                    name="name"
                    variant={formState.name.variant}
                    slotProps={{
                        inputLabel: {
                            labelSize: 'large',
                            htmlFor: 'name',
                        },
                        helperText: {
                            isShow: formState.name.showHelper,
                        },
                    }}
                />
                <TextField
                    label="제어 이미지"
                    type="file"
                    id="file"
                    name="file"
                    value={formState.file.value}
                    displayFileName={formState.file.fileName}
                    helperText={formState.file.helperText}
                    onChange={handleChange}
                    variant={formState.file.variant}
                    slotProps={{
                        inputLabel: {
                            className: 'text-green-800',
                            htmlFor: 'file',
                        },
                        helperText: {
                            isShow: formState.file.showHelper,
                        },
                    }}
                />
            </div>
            <div>
                <h1 className="text-white text-2xl font-bold mb-5">
                    비제어 컴포넌트
                </h1>
                <TextField
                    label="비밀번호"
                    helperText="비밀번호는 8자 이상 입력해주세요."
                    placeholder="비밀번호를 입력해주세요."
                    defaultValue="12345678"
                    type="password"
                    name="password"
                    onValidate={validators.validatePassword}
                    slotProps={{
                        inputLabel: {
                            labelSize: 'large',
                            htmlFor: 'password',
                        },
                    }}
                />
                <TextField
                    label="이메일"
                    helperText="올바른 이메일 형식을 입력해주세요.."
                    placeholder="이메일을 입력해주세요."
                    name="email"
                    autoComplete="on"
                    id="email"
                    onValidate={validators.validateEmail}
                    slotProps={{
                        inputLabel: {
                            className: 'text-green-800',
                            htmlFor: 'email',
                        },
                    }}
                />
                <TextField
                    label="비제어 이미지"
                    type="file"
                    id="image"
                    name="file"
                    onValidate={validators.validateImage}
                    slotProps={{
                        inputLabel: {
                            className: 'text-emerald-800',
                            htmlFor: 'image',
                        },
                    }}
                />
                <TextField
                    label="숫자"
                    type="number"
                    name="number"
                    onValidate={validators.validateNumber}
                    slotProps={{
                        inputLabel: {
                            className: 'text-emerald-800',
                            htmlFor: 'number',
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default Text;
