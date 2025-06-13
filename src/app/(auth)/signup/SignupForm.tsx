'use client';
import Link from 'next/link';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input } from '@/components/ui';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useSignup } from '@/hooks/queries/useAuth';
import { useRouter } from 'next/navigation';
import { SignupFormData } from '@/types/form';
import { ApiResponse } from '@/types/auth';
import { useEffect, useState } from 'react';

export default function SignupForm() {
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [isDuplicateUserId, setIsDuplicateUserId] = useState(false);
    const { mutate: signup } = useSignup();
    const { register, handleSubmit, formState, setError, watch } =
        useForm<SignupFormData>({
            mode: 'onBlur',
            reValidateMode: 'onBlur',
        });
    const onSubmit: SubmitHandler<SignupFormData> = (data) => {
        signup(
            {
                userId: data.userId,
                password: data.password,
                nickName: data.nickName,
            },
            {
                //
                onSuccess: (response: ApiResponse<void>) => {
                    if (response.statusCode === 104) {
                        setError('userId', {
                            message: response.message,
                        });
                        setIsDuplicateUserId(true);
                    } else {
                        setIsDuplicateUserId(false);
                        router.push('/login');
                    }
                },
            }
        );
    };
    const watchedUserId = watch('userId');
    // 이메일이 변경될 때마다 중복 상태 초기화
    useEffect(() => {
        if (isDuplicateUserId) {
            setIsDuplicateUserId(false);
        }
    }, [watchedUserId, isDuplicateUserId]);
    return (
        <div className="flex flex-col justify-center items-center gap-[14px] px-4 py-8 sm:py-8 sm:px-[54px] sm:mt-0 mt-[50px]">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[311px] sm:w-[500px] xl:w-[402px] h-auto"
            >
                <div>
                    <h1 className="text-white text-xl sm:text-2xl font-semibold leading-7 xl:leading-8 text-center sm:mb-8 mb-12">
                        회원가입
                    </h1>
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-6">
                            <Input
                                type="text"
                                placeholder="닉네임을 입력해주세요"
                                label="닉네임"
                                name="nickName"
                                labelClassName="text-sm mb-2 w-fit font-semibold leading-5"
                                size={!isMobile ? 'large' : 'small'}
                                register={register}
                                error={formState.errors.nickName as FieldError}
                                rules={{
                                    required: '닉네임을 입력해주세요',
                                    pattern: {
                                        value: /^[a-zA-Z0-9]+$/,
                                        message:
                                            '닉네임은 영문 또는 숫자만 입력해주세요.',
                                    },
                                    minLength: {
                                        value: 3,
                                        message:
                                            '닉네임은 3자 이상 10자 이하이어야 합니다.',
                                    },
                                    maxLength: {
                                        value: 10,
                                        message:
                                            '닉네임은 3자 이상 10자 이하이어야 합니다.',
                                    },
                                }}
                            />
                            <Input
                                type="text"
                                placeholder="이메일을 입력해주세요"
                                label="아이디"
                                name="userId"
                                labelClassName="text-sm mb-2 w-fit font-semibold leading-5"
                                size={!isMobile ? 'large' : 'small'}
                                register={register}
                                error={formState.errors.userId as FieldError}
                                rules={{
                                    required: '이메일을 입력해주세요',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: '이메일 형식에 맞지 않습니다.',
                                    },
                                    validate: {
                                        duplicateUserId: () =>
                                            isDuplicateUserId
                                                ? '이미 사용중인 이메일입니다.'
                                                : true,
                                    },
                                }}
                            />
                            <Input
                                type="password"
                                placeholder="비밀번호를 입력해주세요"
                                label="비밀번호"
                                name="password"
                                labelClassName="text-sm mb-2 w-fit font-semibold leading-5"
                                size={!isMobile ? 'large' : 'small'}
                                register={register}
                                error={formState.errors.password as FieldError}
                                rules={{
                                    required: '비밀번호를 입력해주세요',
                                    pattern: {
                                        value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$]).{8,16}$/,
                                        message:
                                            '비밀번호는 영문, 숫자, 특수문자(!@#$)를 포함해야 합니다.',
                                    },
                                    minLength: {
                                        value: 8,
                                        message:
                                            '비밀번호는 8자 이상 16자 이하이어야 합니다.',
                                    },
                                    maxLength: {
                                        value: 16,
                                        message:
                                            '비밀번호는 8자 이상 16자 이하이어야 합니다.',
                                    },
                                }}
                            />
                            <Input
                                type="password"
                                placeholder="비밀번호를 다시 한 번 입력해주세요"
                                label="비밀번호 확인"
                                name="passwordCheck"
                                labelClassName="text-sm mb-2 w-fit font-semibold leading-5"
                                size={!isMobile ? 'large' : 'small'}
                                register={register}
                                error={
                                    formState.errors.passwordCheck as FieldError
                                }
                                rules={{
                                    required: '비밀번호을 한번 더 입력해주세요',
                                    validate: {
                                        passwordCheck: (value) =>
                                            value === watch('password') ||
                                            '비밀번호가 일치하지 않습니다.',
                                    },
                                }}
                            />
                        </div>
                        <div>
                            <Button
                                type="submit"
                                className="w-full mb-6"
                                disabled={!formState.isValid}
                            >
                                확인
                            </Button>
                            <div className="flex gap-1 justify-center items-center">
                                <span className="text-gray-400 text-sm font-medium leading-5">
                                    이미 회원이신가요?
                                </span>
                                <Link
                                    href="/login"
                                    className="text-green-700 text-sm font-medium underline underline-offset-2"
                                >
                                    로그인
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
