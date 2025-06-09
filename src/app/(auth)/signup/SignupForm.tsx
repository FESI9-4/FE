'use client';
import Link from 'next/link';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input } from '@/components/ui';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useCheckUserId, useSignup } from '@/hooks/queries/useAuth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignupFormData } from '@/types/form';

export default function SignupForm() {
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [isChekedUserId, setIsChekedUserId] = useState(false);
    const { register, handleSubmit, formState, setError, clearErrors } =
        useForm<SignupFormData>({
            mode: 'onBlur',
            reValidateMode: 'onBlur',
        });
    const { mutateAsync: checkUserId } = useCheckUserId();
    const { mutate: signup } = useSignup();
    const onSubmit: SubmitHandler<SignupFormData> = (data) => {
        signup({
            userId: data.userId,
            password: data.password,
            nickName: data.nickName,
        });
        router.push('/login');
    };
    //이메일 중복 확인 api 호출
    const handleCheckUserId = async (e: React.FocusEvent<HTMLInputElement>) => {
        const userId = e.target.value;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // 🎯 이메일 형식 체크 후 API 호출
        if (userId && emailRegex.test(userId)) {
            const result = await checkUserId(userId);

            if (result?.statusCode === 409) {
                setError('userId', { message: result.message });
                setIsChekedUserId(false);
            } else {
                clearErrors('userId');
                setIsChekedUserId(true);
            }
        }
    };
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
                                placeholder="닉네임"
                                label="닉네임"
                                name="nickName"
                                labelClassName="text-sm mb-2 w-fit font-semibold leading-5"
                                size={!isMobile ? 'large' : 'small'}
                                register={register}
                                error={formState.errors.nickName as FieldError}
                                rules={{
                                    required: '닉네임을 입력해주세요',
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
                                        duplicate: () => {
                                            // 🎯 상태값으로 검증
                                            return (
                                                isChekedUserId ||
                                                '이미 사용중인 이메일입니다.'
                                            );
                                        },
                                    },
                                    onBlur: handleCheckUserId,
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
                                    minLength: {
                                        value: 8,
                                        message:
                                            '비밀번호는 8자 이상이어야 합니다.',
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
                                    required: '비밀번호를 입력해주세요',
                                    minLength: {
                                        value: 8,
                                        message:
                                            '비밀번호는 8자 이상이어야 합니다.',
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
