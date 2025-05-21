'use client';
import TextField from '@/components/ui/TextField';
import { useState } from 'react';
function Text() {
    const [isError, setIsError] = useState(false);
    const [value, setValue] = useState('');
    return (
        <div className="flex flex-col w-full p-10 gap-10 bg-gray-700">
            <button onClick={() => setIsError(!isError)}>
                {isError ? '오류' : '정상'}
            </button>
            <TextField
                label="이름"
                helperText="이름을 입력해주세요."
                isError={isError}
                value={value}
                slotProps={{
                    input: {
                        type: 'text',
                        placeholder: '이름을 입력해주세요.',
                        onChange: (e) => setValue(e.target.value),
                    },
                }}
            />
            <TextField
                label="비밀번호"
                helperText="비밀번호를 입력해주세요."
                isError={isError}
                slotProps={{
                    input: {
                        type: 'password',
                        placeholder: '비밀번호를 입력해주세요.',
                    },
                }}
            />
            <TextField
                label="이메일"
                helperText="이메일을 입력해주세요."
                isError={isError}
                slotProps={{
                    input: {
                        type: 'email',
                        placeholder: '이메일을 입력해주세요.',
                    },
                }}
            />
            <TextField
                label="넘버"
                helperText="넘버를 입력해주세요."
                isError={isError}
                slotProps={{
                    input: {
                        type: 'number',
                        placeholder: '넘버를 입력해주세요.',
                    },
                }}
            />
        </div>
    );
}

export default Text;
