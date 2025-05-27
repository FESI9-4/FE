'use client';
import TextField from '@/components/ui/TextField';
import { useState } from 'react';
function Text() {
    const [name, setName] = useState('');
    const [showHelperText, setShowHelperText] = useState(false);
    const [inputVariant, setInputVariant] = useState<
        'default' | 'done' | 'typing' | 'error'
    >('default');
    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }
    function handleBlur(e: React.ChangeEvent<HTMLInputElement>) {
        console.log('Controlled handleBlur');
        const { name, value } = e.target;

        switch (name) {
            case 'name':
                if (value.length > 3) {
                    setInputVariant('done');
                    setShowHelperText(false);
                } else {
                    setInputVariant('error');
                    setShowHelperText(true);
                }
                break;
        }
    }
    function handleFocus() {
        setInputVariant('typing');
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
                    helperText="이름은 3글자 이상 입력해주세요."
                    value={name}
                    onChange={handleNameChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    type="text"
                    placeholder="이름을 입력해주세요."
                    name="name"
                    slotProps={{
                        input: {
                            variant: inputVariant,
                        },
                        inputLabel: {
                            labelSize: 'large',
                            htmlFor: 'name',
                        },
                        helperText: {
                            isShow: showHelperText,
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
                    helperText="비밀번호를 입력해주세요."
                    defaultValue="12345678"
                    type="password"
                    slotProps={{
                        input: {
                            placeholder: '비밀번호를 입력해주세요.',
                        },
                        inputLabel: {
                            labelSize: 'large',
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
                    defaultValue="test@test.com"
                    slotProps={{
                        inputLabel: {
                            className: 'text-green-800',
                            htmlFor: 'email',
                        },
                    }}
                />
                <TextField
                    label="파일"
                    type="file"
                    id="file"
                    name="file"
                    slotProps={{
                        inputLabel: {
                            className: 'text-green-800',
                            htmlFor: 'file',
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default Text;
