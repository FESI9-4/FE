'use client';
import Link from 'next/link';
import {
    FieldError,
    FieldValues,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import { Button, Input } from '@/components/ui';
import useMediaQuery from '@/hooks/useMediaQuery';

function LoginForm() {
    const { register, handleSubmit, formState } = useForm<FieldValues>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className="flex flex-col justify-center items-center gap-[14px] px-4 pb-8 md:py-8 md:px-[54px]">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[311px] md:w-[500px] xl:w-[402px] h-auto"
            >
                <div>
                    <h1 className="text-white text-xl md:text-2xl font-semibold leading-7 xl:leading-8 text-center mb-8">
                        로그인
                    </h1>
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
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
                            <Link
                                href="/signup"
                                className="text-center text-gray-400 text-sm not-italic font-medium leading-5 underline underline-offset-2"
                            >
                                비밀번호를 잊으셨나요?
                            </Link>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                className="w-full mb-6"
                                disabled={true}
                            >
                                로그인
                            </Button>
                            <div className="flex gap-1 justify-center items-center">
                                <span className="text-gray-400 text-sm font-medium leading-5">
                                    팬팔이 처음이신가요?
                                </span>
                                <Link
                                    href="/signup"
                                    className="text-green-700 text-sm font-medium underline underline-offset-2"
                                >
                                    회원가입
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
