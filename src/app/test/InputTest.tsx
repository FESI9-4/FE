'use client';

import Input from '@/components/ui/Input';
import InputFile from '@/components/ui/InputFile';
import InputNumber from '@/components/ui/InputNumber';
import InputText from '@/components/ui/InputText';
import DateInput from '@/components/ui/DateInput';
import { FieldError, FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

export default function TextPage() {
    const { register, handleSubmit, formState, control, setError, watch } =
        useForm<FieldValues>({
            mode: 'onBlur',
        });
    //모집 날짜 인풋값
    const startDate = watch('startDate');
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log('제출할 데이터', data);
        // 🎯 submit에서만 날짜 범위 검증
        if (data.startDate && data.endDate) {
            /* 날짜 같은 경우는 블러 후 유효성 검증 처리를 하려니
            복잡해져서 제출전에 검사하는게 제일 깔끔한것 같습니다! */
            const start = new Date(data.startDate);
            const end = new Date(data.endDate);

            if (start >= end) {
                // 🎯 양쪽 다 에러 표시할 수도 있어요
                setError('startDate', {
                    message: '시작 시간은 마감 시간보다 빨라야 합니다.',
                });
                setError('endDate', {
                    message: '마감 시간은 시작 시간보다 늦어야 합니다.',
                });
                return;
            }
            console.log('날짜 검증 통과 데이터', data);
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-600 p-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    name="email"
                    label="이메일"
                    register={register}
                    rules={{
                        required: '필수 입력값 입니다.',
                        pattern: {
                            value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                            message: '올바른 이메일 형식을 입력해주세요.',
                        },
                    }}
                    error={formState.errors.email as FieldError}
                />
                <Input
                    type="password"
                    name="password"
                    label="비밀번호"
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
                    error={formState.errors.password as FieldError}
                />
                <InputText
                    name="comment"
                    label="댓글"
                    register={register}
                    rules={{
                        minLength: {
                            value: 5,
                            message: '3글자 이상 입력하세요',
                        },
                        maxLength: {
                            value: 100,
                            message: '100글자 이하로 입력하세요',
                        },
                    }}
                />
                <InputFile
                    name="file"
                    accept="image/*"
                    label="파일"
                    register={register}
                    rules={{
                        validate: {
                            fileSize: (files) => {
                                // 🎯 파일이 없으면 validation 통과
                                if (!files || files.length === 0) return true;
                                const maxSize = 5 * 1024 * 1024; // 5MB
                                return files?.[0]?.size <= maxSize
                                    ? true
                                    : '파일 크기는 5MB 이하여야 합니다';
                            },
                        },
                    }}
                />
                <InputNumber
                    name="number"
                    label="숫자"
                    control={control}
                    rules={{
                        required: '필수 입력값 입니다.',
                        validate: {
                            isNumber: (value) => {
                                const num = Number(value);
                                return (
                                    Number.isInteger(num) || '숫자만 입력하세요'
                                );
                            },
                        },
                    }}
                />
                <div className="flex gap-4">
                    <DateInput
                        name="startDate"
                        label="시작 날짜"
                        control={control}
                        type="datetime-local"
                        minDate={new Date()} // 진행날짜 최소 오늘 이후
                        isStartDate={true}
                        error={formState.errors.startDate as FieldError}
                        placeholder="시작 날짜를 선택해주세요"
                    />
                    <DateInput
                        name="endDate"
                        label="종료 날짜"
                        control={control}
                        type="datetime-local"
                        minDate={startDate ? new Date(startDate) : new Date()} // 종료날짜 최소 시작날짜 이후
                        isStartDate={false}
                        error={formState.errors.endDate as FieldError}
                        placeholder="마감 날짜를 선택해주세요"
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
