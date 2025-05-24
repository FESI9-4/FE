'use client';

import { TextField } from '@/components/ui';
import InputText from '@/components/ui/InputText';
import { validators } from '@/utils/validators';
import { useState } from 'react';
export default function Test() {
    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        password: '',
    });
    const { validateEmail, validateNickname, validatePassword } = validators;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('formData', formData);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        let result;
        switch (name) {
            case 'email':
                result = validateEmail(value);
                break;
            case 'nickname':
                result = validateNickname(value);
                break;
            case 'password':
                result = validatePassword(value);
                break;
        }
        console.log(result);
    };
    return (
        <div className="w-full h-screen bg-red-400 flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="w-1/2 flex flex-col gap-2 bg-blue-500 p-4"
            >
                <h1 className="text-2xl mb-4 font-bold text-center">
                    제어 컴포넌트
                </h1>
                <TextField fieldName="nickname" className="w-full">
                    <TextField.Label labelSize="small">닉네임</TextField.Label>
                    <TextField.Input
                        type="text"
                        placeholder="닉네임을 입력해주세요."
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                nickname: e.target.value,
                            })
                        }
                        onValidate={validators.validateNickname}
                        inputSize="small"
                        required
                    />
                    <TextField.HelperText />
                </TextField>
                <TextField fieldName="email" className="w-full">
                    <TextField.Label labelSize="small">이메일</TextField.Label>
                    <TextField.Input
                        type="email"
                        placeholder="이메일을 입력해주세요."
                        onValidate={validators.validateEmail}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        required
                    />
                    <TextField.HelperText />
                </TextField>
                <TextField fieldName="password" className="w-full">
                    <TextField.Label>비밀번호</TextField.Label>
                    <TextField.Input
                        type="password"
                        inputSize="small"
                        placeholder="비밀번호를 입력해주세요."
                        onValidate={validators.validatePassword}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        required
                    />
                    <TextField.HelperText />
                </TextField>
                <button
                    type="submit"
                    className=" bg-green-500 text-green-900 font-bold p-2 rounded-md"
                >
                    로그인
                </button>
            </form>
            <form className="w-1/2 flex flex-col gap-2 bg-blue-500 p-4">
                <h1 className="text-2xl mb-4 font-bold text-center">
                    비제어 컴포넌트
                </h1>
                <TextField fieldName="image" className="w-full">
                    <TextField.Label labelSize="small">닉네임</TextField.Label>
                    <TextField.FileInput
                        type="file"
                        placeholder="닉네임을 입력해주세요."
                        onChange={handleChange}
                        inputSize="small"
                    />
                    <TextField.HelperText />
                </TextField>
                <InputText label="게시글" name="content" />
            </form>
        </div>
    );
}
