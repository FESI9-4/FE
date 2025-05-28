'use client';

import Input from '@/components/ui/Input';
import { FieldError, FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

export default function TextPage() {
    const { register, handleSubmit, formState } = useForm<FieldValues>({
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    return (
        <div className="h-screen w-screen bg-gray-600 p-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="password"
                    name="name"
                    label="이름"
                    register={register}
                    rules={{
                        required: '필수 입력값 입니다.',
                        minLength: {
                            value: 3,
                            message: '3글자 이상 입력하세요',
                        },
                        maxLength: {
                            value: 10,
                            message: '10글자 이하로 입력하세요',
                        },
                    }}
                    error={formState.errors.name as FieldError}
                    dirtyFields={formState.dirtyFields}
                    touchedFields={formState.touchedFields}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
