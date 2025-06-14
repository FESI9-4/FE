'use client';

import { useState } from 'react';
import { Button, InputText, Profile } from '../ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import CommentList from './CommentList';
import { commentApi } from '@/utils/apis/commentApi';
import { useMutation } from '@tanstack/react-query';
import dateConverter from '@/utils/dateConverter';

//수정하기 삭제하기 보이는거 결국 드롭다운이 열리는거 본인이어야지 이게 열려야함... 지금은 아무나 막열리지만 그로직을 추가해야할듯? 댓글아이디랑
//지금 받은 사용자아디랑 같은지

// 그리고 해당 댓글에서 작성자뜨는로직이 잘못됨 글의 작성자랑 비교를해야하는데.. Id값을

// 드롭다운을 그리고, 대댓글달기 이것도열어줘야지..
// 팬팔 참여하기 api 작성하고 상태로 관리해서 버튼ui 다르게하고 취소하기도 만들기

// 본인 아이디 즉 , 작성자면 랜더링을 다르게해야함.. 주최자페이지

interface FormData {
    comment: string;
}

interface DetailPageCommentProps {
    id: number;
    createdAt: number;
}

const apiResponse = {
    statusCode: 200,
    message: '댓글 리스트 호출 성공',
    data: [
        {
            commentId: 187060166021779456,
            content: '부모1 내용',
            parentCommentId: 187060166021779456,
            writerId: 1231414314,
            deleted: false,
            createdAt: 1764558626449,
            secret: false,
        },
        {
            commentId: 187060197298704384,
            content: '부모1 자식 내용',
            parentCommentId: 187060166021779456,
            writerId: 1231414314,
            deleted: false,
            createdAt: 1764558626449,
            secret: true,
        },
    ],
};

export default function DetailPageComment({
    id,

    createdAt,
}: DetailPageCommentProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const [secret, setSecret] = useState(false);
    const formattedDate = dateConverter(Math.floor(createdAt), 'utc');
    console.log('createdAt:', formattedDate);

    const mutation = useMutation({
        mutationFn: (body: {
            parentCommentId: number | null;
            secret: boolean;
            content: string;
        }) => commentApi.postCommentByArticleId(Number(id), body),
        onSuccess: () => {
            console.log('댓글 작성 성공');
            reset(); // 작성 후 입력 폼 초기화
            setSecret(false);
        },
        onError: (error) => {
            console.error('댓글 작성 실패:', error);
        },
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        mutation.mutate({
            parentCommentId: null,
            secret: secret,
            content: data.comment,
        });
    };
    // 이 사용자와 이미지는 얘랑 달라야할텐데?!  결국 현재로그인한 사람의 이미지와  닉네임을가져와야함..  지금 넣은 값은 현재 게시물 작성자의 이미지와 닉네임을 가져온거
    // 이거 나중에 수정   전역 상태나 API 호출로 로그인 유저 정보
    return (
        <div className="flex flex-col">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-72 sm:h-61.25 mt-10 sm:mt-12 px-4 sm:px-6 flex flex-col gap-3 sm:gap-5 "
            >
                <p className="text-lg font-semibold text-white">Q&A</p>
                <div className="w-full h-55.5 sm:h-45.5 flex flex-col sm:flex-row items-end sm:items-center sm:gap-5">
                    <div className="h-45.5 w-full flex flex-col justify-between">
                        <div className="h-6 w-full flex justify-between">
                            <div className="h-full gap-2 flex items-center">
                                <Profile size="small" />
                                <p className="text-sm font-normal text-gray-300">
                                    나중에전역에서사용자이름이랑이미지 위에넣기
                                </p>
                            </div>
                            <p className="text-sm font-medium text-gray-600 h-5">
                                {formattedDate}
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

                    <div className="w-26.25 h-10 sm:mb-15 flex gap-2">
                        <Button
                            styled="outline"
                            type="submit"
                            size="small"
                            className="h-full truncate"
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

            <div className="px-4 w-full h-6">
                <div className="border-t border-gray-800 h-1"></div>
            </div>

            <div className="flex flex-col gap-5 pb-17 sm:pb-10">
                <div className="min-h-32 border-b border-gray-800 px-4 py-6">
                    {apiResponse.data.length > 0 ? (
                        <CommentList
                            comments={apiResponse.data}
                            currentUserId={1231414314}
                            onSelectMenu={(commentId, action) => {
                                if (action === '삭제하기') {
                                    console.log(
                                        '삭제 기능 여기에 구현 예정:',
                                        commentId
                                    );
                                }
                            }}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-40 sm:h-52.5 font-medium text-gray-500 text-sm">
                            <p>아직 올라온 질문이 없어요.</p>
                            <p>궁금한 게 있다면 가장 먼저 물어보세요!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
