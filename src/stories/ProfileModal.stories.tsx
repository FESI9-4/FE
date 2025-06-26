import type { Meta, StoryObj } from '@storybook/nextjs';
import { useRef, useEffect } from 'react';
import { useForm, FieldValues, FieldError } from 'react-hook-form';

import BaseModal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Profile from '@/components/ui/Profile';
import InputText from '@/components/ui/InputText';

// ProfileModal과 똑같은 구조의 컴포넌트 (useGetUser 없이)
const MockEditProfileModal = ({
    onClose,
    onSubmit,
    hasImage = false,
    hasDescription = false,
}: {
    onClose: () => void;
    onSubmit: (data: {
        nickname: string;
        profileImage?: File;
        description?: string;
    }) => void;
    hasImage?: boolean;
    hasDescription?: boolean;
}) => {
    // 가짜 사용자 데이터
    const user = {
        nickname: '김팬팔',
        description: hasDescription
            ? '안녕하세요! 콘서트를 좋아하는 팬팔입니다.'
            : null,
        profileImage: hasImage
            ? 'https://randomuser.me/api/portraits/men/1.jpg'
            : null,
    };

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({ mode: 'onBlur' });

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // file 필드 수동 등록
    useEffect(() => {
        register('file', {
            validate: {
                fileSize: (files) => {
                    if (!files || files.length === 0) return true;
                    const maxSize = 5 * 1024 * 1024; // 5MB
                    return (
                        files[0].size <= maxSize ||
                        '파일 크기는 5MB 이하여야 합니다'
                    );
                },
            },
        });
    }, [register]);

    const file = watch('file');
    const previewImage = file?.[0]
        ? URL.createObjectURL(file[0])
        : user?.profileImage || '';

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setValue('file', e.target.files, { shouldValidate: true });
        }
    };

    const handleFormSubmit = (data: FieldValues) => {
        console.log('폼 제출 데이터:', {
            nickname: data.nickname,
            profileImage: data.file?.[0],
            description: data.description,
        });
        onSubmit({
            nickname: data.nickname,
            profileImage: data.file?.[0],
            description: data.description,
        });
    };

    return (
        <BaseModal onClose={onClose}>
            <div className="w-85.75 md:w-130 flex items-center justify-center py-6">
                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="w-73.75 md:w-118 flex flex-col gap-6"
                >
                    <div className="flex justify-between w-full items-center">
                        <p className="text-lg font-semibold">프로필 수정하기</p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <Profile
                            size="large"
                            edit={true}
                            image={previewImage}
                            editButtonOnClick={handleImageClick}
                            editButtonClassName="cursor-pointer"
                        />

                        <input
                            type="file"
                            name="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        {errors.file && (
                            <span className="text-red-500 text-sm">
                                {(errors.file as FieldError).message}
                            </span>
                        )}

                        {/* 닉네임 입력 */}
                        <div className=" flex flex-col justify-between">
                            <p className="text-sm md:text-base font-semibold">
                                닉네임
                            </p>
                            <Input
                                type="text"
                                name="nickname"
                                placeholder={user?.nickname || ''}
                                value={user?.nickname || ''}
                                register={register}
                                className="placeholder:text-white"
                                rules={{
                                    minLength: {
                                        value: 2,
                                        message: '2글자 이상 입력해주세요.',
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: '10글자 이하로 입력해주세요.',
                                    },
                                }}
                                error={errors.nickname as FieldError}
                                size="small"
                            />
                        </div>
                        <div className="flex flex-col justify-between">
                            <p className="text-sm md:text-base font-semibold">
                                소개
                            </p>
                            <InputText
                                name="description"
                                placeholder={user?.description || ''}
                                className="h-27 placeholder:text-white"
                                register={register}
                                error={errors.description as FieldError}
                                size="small"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            size="large"
                            type="button"
                            onClick={onClose}
                            styled="outline"
                        >
                            취소
                        </Button>
                        <Button size="large" type="submit" styled="solid">
                            수정하기
                        </Button>
                    </div>
                </form>
            </div>
        </BaseModal>
    );
};

// ProfileModal을 위한 래퍼
const ProfileModalWrapper = ({
    hasImage = false,
    hasDescription = false,
}: {
    hasImage?: boolean;
    hasDescription?: boolean;
}) => {
    useEffect(() => {
        // 모달 루트가 없으면 생성
        if (!document.getElementById('modal-root')) {
            const modalRoot = document.createElement('div');
            modalRoot.id = 'modal-root';
            document.body.appendChild(modalRoot);
        }

        return () => {
            // 클린업
            const modalRoot = document.getElementById('modal-root');
            if (modalRoot) {
                modalRoot.remove();
            }
        };
    }, []);

    return (
        <MockEditProfileModal
            onClose={() => console.log('모달 닫기')}
            onSubmit={(data) => console.log('프로필 수정:', data)}
            hasImage={hasImage}
            hasDescription={hasDescription}
        />
    );
};

const meta: Meta<typeof ProfileModalWrapper> = {
    title: 'UI/Modal/ProfileModal',
    component: ProfileModalWrapper,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    '사용자 프로필을 수정할 수 있는 모달 컴포넌트입니다. 프로필 이미지, 닉네임, 소개글을 수정할 수 있습니다.',
            },
            story: {
                inline: false,
                iframeHeight: 800,
            },
        },
        backgrounds: {
            default: 'light',
        },
        nextjs: {
            appDirectory: true,
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
    render: () => <ProfileModalWrapper hasDescription={false} />,
};

// 이미지가 있는 경우
export const WithImage: Story = {
    render: () => <ProfileModalWrapper hasImage={true} />,
};
