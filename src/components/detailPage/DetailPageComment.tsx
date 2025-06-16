'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button, InputText, Profile } from '../ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import CommentList from './CommentList';
import { commentApi } from '@/utils/apis/commentApi';
import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import dateConverter from '@/utils/dateConverter';

// 대댓글기능
//수정하기 기능
interface FormData {
    comment: string;
}

interface DetailPageCommentProps {
    id: number;
    createdAt: number;
}

// 댓글 모드 타입 정의
type CommentMode = 'new' | 'edit' | 'reply';

interface CommentModeState {
    mode: CommentMode;
    targetCommentId?: number;
    originalContent?: string;
    parentCommentId?: number;
}

export default function DetailPageComment({
    id,
    createdAt,
}: DetailPageCommentProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<FormData>();

    const [secret, setSecret] = useState(false);
    const [commentMode, setCommentMode] = useState<CommentModeState>({
        mode: 'new'
    });
    
    const formattedDate = dateConverter(Math.floor(createdAt), 'utc');
    const observerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // 무한스크롤을 위한 useInfiniteQuery (실제 API 사용)
    const {
        data: commentsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        refetch,
    } = useInfiniteQuery({
        queryKey: ['comments', id],
        queryFn: async ({
            pageParam,
        }: {
            pageParam: { lastCommentId?: number; lastParentCommentId?: number };
        }) => {
            try {
                const response = await commentApi.getCommentsByArticleId({
                    articleId: id,
                    pageSize: 3,
                    lastParentCommentId: pageParam.lastParentCommentId,
                    lastCommentId: pageParam.lastCommentId,
                });
                return response;
            } catch (error) {
                console.error('댓글 로딩 실패:', error);
                throw error;
            }
        },
        getNextPageParam: (lastPage) => {
            // 데이터가 없거나 페이지 사이즈보다 적으면 더 이상 페이지가 없음
            if (
                !lastPage.data ||
                lastPage.data.length === 0 ||
                lastPage.data.length < 3
            ) {
                return undefined;
            }

            const lastComment = lastPage.data[lastPage.data.length - 1];
            return {
                lastParentCommentId: lastComment.parentCommentId,
                lastCommentId: lastComment.commentId,
            };
        },
        initialPageParam: { lastCommentId: 0, lastParentCommentId: 0 },
        retry: 1,
        staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    });

    // 댓글 작성/수정 mutation
    const mutation = useMutation({
        mutationFn: async (body: {
            parentCommentId: number | null;
            secret: boolean;
            content: string;
        }) => {
            try {
                if (commentMode.mode === 'edit' && commentMode.targetCommentId) {
                    // 수정 API 호출
                    const response = await commentApi.patchCommentByArticleId(
                        Number(id),
                        {
                            commentID: commentMode.targetCommentId,
                            secret: body.secret,
                            content: body.content
                        }
                    );
                    return response;
                } else {
                    // 새 댓글/대댓글 작성 API 호출
                    const response = await commentApi.postCommentByArticleId(
                        Number(id),
                        body
                    );
                    return response;
                }
            } catch (error) {
                console.error('댓글 작성/수정 실패:', error);
                throw error;
            }
        },
        onSuccess: () => {
            console.log('댓글 작성/수정 성공');
            reset();
            setSecret(false);
            setCommentMode({ mode: 'new' }); // 모드 초기화
            refetch(); // 댓글 목록 새로고침
        },
        onError: (error) => {
            console.error('댓글 작성/수정 실패:', error);
            // 에러 토스트 등을 여기에 추가할 수 있습니다
        },
    });

    // 댓글 삭제 mutation
    const deleteMutation = useMutation({
        mutationFn: async (commentId: number) => {
            try {
                const response = await commentApi.deleteCommentById(
                    Number(id),
                    commentId
                );
                return response;
            } catch (error) {
                console.error('댓글 삭제 실패:', error);
                throw error;
            }
        },
        onSuccess: () => {
            console.log('댓글 삭제 성공');
            refetch(); // 댓글 목록 새로고침
        },
        onError: (error) => {
            console.error('댓글 삭제 실패:', error);
            // 에러 토스트 등을 여기에 추가할 수 있습니다
        },
    });

    // Intersection Observer를 사용한 무한스크롤
    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [target] = entries;
            if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0.1,
            rootMargin: '100px',
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [handleObserver]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const parentCommentId = commentMode.mode === 'reply' ? commentMode.parentCommentId : null;
        
        mutation.mutate({
            parentCommentId: parentCommentId || null,
            secret: secret,
            content: data.comment,
        });
    };

    // 댓글 수정 시작 핸들러
    const handleEditComment = (commentId: number, content: string) => {
        setCommentMode({
            mode: 'edit',
            targetCommentId: commentId,
            originalContent: content
        });
        setValue('comment', content);
        // 댓글 입력 폼으로 스크롤
        setTimeout(() => {
            formRef.current?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
    };

    // 대댓글 작성 시작 핸들러
    const handleReplyComment = (parentCommentId: number) => {
        setCommentMode({
            mode: 'reply',
            parentCommentId: parentCommentId
        });
        setValue('comment', '');
        // 댓글 입력 폼으로 스크롤
        setTimeout(() => {
            formRef.current?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
    };

    // 댓글 삭제 핸들러
    const handleDeleteComment = (commentId: number) => {
        if (window.confirm('댓글을 삭제하시겠습니까?')) {
            deleteMutation.mutate(commentId);
        }
    };

    // 취소 핸들러
    const handleCancel = () => {
        setCommentMode({ mode: 'new' });
        reset();
        setSecret(false);
    };

    // 모든 페이지의 댓글을 하나의 배열로 합치기
    const allComments = commentsData?.pages.flatMap((page) => page.data) || [];

    // 현재 모드에 따른 UI 텍스트 결정
    const getSubmitButtonText = () => {
        if (mutation.isPending) {
            return commentMode.mode === 'edit' ? '수정중...' : '등록중...';
        }
        return commentMode.mode === 'edit' ? '수정하기' : '문의하기';
    };

    const getPlaceholderText = () => {
        switch (commentMode.mode) {
            case 'edit':
                return '댓글을 수정해주세요';
            case 'reply':
                return '답글을 입력해주세요';
            default:
                return '내용을 입력해주세요';
        }
    };

    const getHeaderText = () => {
        switch (commentMode.mode) {
            case 'edit':
                return '댓글 수정';
            case 'reply':
                return '답글 작성';
            default:
                return 'Q&A';
        }
    };

    return (
        <div className="flex flex-col">
            <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-72 sm:h-61.25 mt-10 sm:mt-12 px-4 sm:px-6 flex flex-col gap-3 sm:gap-5 "
            >
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-white">{getHeaderText()}</p>
                    {commentMode.mode !== 'new' && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="text-sm text-gray-400 hover:text-white px-2 py-1 rounded"
                        >
                            취소
                        </button>
                    )}
                </div>
                
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
                                required: '댓글을 입력해주세요',
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
                            placeholder={getPlaceholderText()}
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
                            disabled={mutation.isPending}
                        >
                            {getSubmitButtonText()}
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
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-40 sm:h-52.5 font-medium text-gray-500 text-sm">
                            <p>댓글을 불러오는 중...</p>
                        </div>
                    ) : isError ? (
                        <div className="flex flex-col items-center justify-center h-40 sm:h-52.5 font-medium text-red-500 text-sm">
                            <p>댓글을 불러오는 중 오류가 발생했습니다.</p>
                            <button
                                onClick={() => refetch()}
                                className="mt-2 text-blue-500 underline"
                            >
                                다시 시도
                            </button>
                        </div>
                    ) : allComments.length > 0 ? (
                        <>
                            <CommentList
                                comments={allComments}
                                currentUserId={1231414314} // 실제 사용자 ID로 변경 필요
                                onSelectMenu={(commentId, action) => {
                                    if (action === '삭제하기') {
                                        handleDeleteComment(commentId);
                                    } else if (action === '수정하기') {
                                        // 해당 댓글의 내용을 찾아서 수정 모드로 전환
                                        const comment = allComments.find(c => c.commentId === commentId);
                                        if (comment) {
                                            handleEditComment(commentId, comment.content);
                                        }
                                    } else if (action === '댓글달기') {
                                        handleReplyComment(commentId);
                                    }
                                }}
                            />

                            {/* 무한스크롤 트리거 요소 */}
                            <div ref={observerRef} className="h-4 w-full">
                                {isFetchingNextPage && (
                                    <div className="flex justify-center items-center py-4">
                                        <div className="text-sm text-gray-500">
                                            더 많은 댓글을 불러오는 중...
                                        </div>
                                    </div>
                                )}
                            </div>

                            {!hasNextPage && allComments.length > 0 && (
                                <div className="flex justify-center items-center py-4">
                                    <div className="text-sm text-gray-500">
                                        모든 댓글을 불러왔습니다.
                                    </div>
                                </div>
                            )}
                        </>
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
