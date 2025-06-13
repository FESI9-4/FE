'use client';

import { useState } from 'react';
import { Button, InputText, Profile, Dropdown } from '../ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import CommentList from './CommentList';

interface FormData {
    comment: string;
}

interface DetailPageCommentProps {
    id: number | string; // 혹은 id 타입에 맞게 조정
}

//데이터에서 커멘트 받아오는게 아니라 여기서 따로 해당 id 만 받아서 api요청해서 조회해야함.

const apiResponse = {
    statusCode: 200,
    message: '댓글 리스트 호출 성공',
    data: [],
};

export default function DetailPageComment({ id }: DetailPageCommentProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const [secret, setSecret] = useState(false);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(' 제출된 댓글:', data.comment);
        console.log(id); // api 사용할때 ,,
    };

    return (
        <div className="flex flex-col">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-72 sm:h-61.25 mt-10 sm:mt-12 px-4 sm:px-6 flex flex-col gap-3 sm:gap-5 "
            >
                <p className="text-lg font-semibold text-white">Q&A</p>
                <div className="w-full h-55.5 sm:h-45.5 flex flex-col sm:flex-row items-end sm:items-center sm:gap-5">
                    <div className="h-45.5 w-full  flex flex-col justify-between">
                        <div className="h-6 w-full   flex justify-between">
                            <div className="h-full gap-2 flex items-center">
                                <Profile size="small" />
                                <p className="text-sm font-normal text-gray-300">
                                    재형이
                                </p>
                            </div>
                            <p className="text-sm font-medium text-gray-600 h-5">
                                2025. 01. 01.
                            </p>
                        </div>
                        <InputText
                            name="comment"
                            register={register}
                            rules={{
                                minLength: {
                                    value: 3,
                                    message: '3글자 이상 입력하세요',
                                },
                                maxLength: {
                                    value: 100,
                                    message: '100글자 이하로 입력하세요',
                                },
                            }}
                            className="h-27.5"
                            placeholder="내용을 입력해주세요"
                        />
                        <div className="h-6 w-23.25 flex justify-between items-center">
                            <input
                                type="checkbox"
                                checked={secret}
                                onChange={(e) => setSecret(e.target.checked)}
                                className="appearance-none w-4.5 h-4.5 rounded-md bg-gray-800 checked:bg-green-500 checked:ring-1 checked:ring-offset-1 checked:shadow-[inset_0_0_0_4px_white]"
                            />
                            <span className="text-xs font-normal text-gray-100">
                                비밀글로 등록
                            </span>
                        </div>
                    </div>

                    <div className="w-26.25 h-10 sm:mb-15 ">
                        <Button
                            styled="outline"
                            type="submit"
                            size="small"
                            className="h-full truncate "
                        >
                            문의하기
                        </Button>
                    </div>
                </div>
                {errors.comment && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.comment.message}
                    </p>
                )}
            </form>
            <div className="px-4 w-full  h-6">
                <div className="border-t border-gray-800 h-1"></div>
            </div>

            <div className="flex flex-col gap-5 pb-17 sm:pb-10">
                <div className="min-h-32 border-b border-gray-800 px-4 py-6">
                    {apiResponse.data.length > 0 ? (
                        <CommentList
                            comments={apiResponse.data}
                            currentUserId={1231414314}
                            dropdown={
                                <Dropdown
                                    options={['수정하기', '삭제하기']}
                                    placeholder="메뉴"
                                    showPlaceholderInMenu={false}
                                    iconType="comment"
                                    onSelect={(value) => {
                                        console.log('선택된 메뉴:', value);
                                    }}
                                />
                            }
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-40 sm:h-52.5 font-medium text-gray-500 text-sm">
                            <p>아직 올라온 질문이 없어요.</p>
                            <p>궁금한 게 있다면 가장 먼저 물어보세요!.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
