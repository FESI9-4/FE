'use client';
import { Button, InputText, Profile, Dropdown } from '../ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import CommentList from './CommentList';

interface FormData {
    comment: string;
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
            createdAt: '2025-05-31T04:30:18.995+00:00',
            secret: true,
        },
        {
            commentId: 187060197298704384,
            content: '부모1 자식 내용',
            parentCommentId: 187060166021779456,
            writerId: 1231414312,
            deleted: false,
            createdAt: '2025-05-31T04:30:26.449+00:00',
            secret: true,
        },
        {
            commentId: 117060166021779451,
            content: '부모2 내용',
            parentCommentId: 117060166021779451,
            writerId: 1231414313,
            deleted: false,
            createdAt: '2025-05-31T04:30:18.995+00:00',
            secret: false,
        },
    ],
};

export default function DetailPageComment() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(' 제출된 댓글:', data.comment);
    };

    return (
        <div className="flex flex-col ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-72 sm:h-61.25 mt-10 sm:mt-12 px-4 sm:px-6 flex flex-col gap-3 sm:gap-5 "
            >
                <p className="text-lg font-semibold text-white">Q&A</p>
                <div className="w-full h-55.5 sm:h-45.5 flex flex-col sm:flex-row items-end sm:items-center sm:gap-5">
                    <div className="h-45.5 w-full  flex flex-col justify-between">
                        <div className="h-6 w-full   flex justify-between">
                            <div className="h-full gap-2 flex items-center">
                                <Profile size="small"></Profile>
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
            <div className="flex flex-col gap-5">
                <div className="h-100  border-b border-gray-800 px-4 ">
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
                </div>
            </div>
        </div>
    );
}
