import React from 'react';
import { Profile } from '../ui';
import { Lock, CommentArrow } from '@/assets';
import { Dropdown } from '../ui'; 

type CommentType = {
    commentId: number;
    content: string;
    parentCommentId: number;
    writerId: number;
    deleted: boolean;
    createdAt: number;
    secret: boolean;
    children?: CommentType[];
};

type CommentProps = {
    comment: CommentType;
    currentUserId: number;
    level?: number;
    onSelectMenu?: (commentId: number, action: string) => void;
};

type CommentListProps = {
    comments: CommentType[];
    currentUserId: number;
    onSelectMenu?: (commentId: number, action: string) => void;
};

// 댓글을 트리 구조로 변환하는 함수
function buildCommentTree(comments: CommentType[]): CommentType[] {
    const commentMap = new Map<number, CommentType>();
    const rootComments: CommentType[] = [];

    comments.forEach((comment) => {
        commentMap.set(comment.commentId, { ...comment, children: [] });
    });

    comments.forEach((comment) => {
        if (comment.commentId === comment.parentCommentId) {
            rootComments.push(commentMap.get(comment.commentId)!);
        } else {
            const parent = commentMap.get(comment.parentCommentId);
            if (parent) {
                parent.children!.push(commentMap.get(comment.commentId)!);
            } else {
                rootComments.push(commentMap.get(comment.commentId)!);
            }
        }
    });

    return rootComments;
}

// 단일 댓글 항목 컴포넌트
function CommentItem({
    comment,
    currentUserId,
    level = 0,
    onSelectMenu,
}: CommentProps) {
    const isAuthor = comment.writerId === currentUserId;

    const content = (
        <div className={`ml-${level * 4} mb-4`}>
            <div className="flex justify-between gap-4 p-3 rounded-lg shadow-sm relative">
                {level > 0 && (
                    <div className="hidden sm:block absolute -left-5">
                        <CommentArrow />
                    </div>
                )}

                <div className="flex flex-col flex-1 text-sm">
                    <div className="h-[24px] flex items-center gap-2">
                        <Profile size="small" />
                        <span className="font-normal text-sm text-gray-300">
                            {comment.writerId}
                        </span>
                        {isAuthor && (
                            <span className="bg-gray-800 text-green-400 text-xs font-medium px-3 py-1 rounded-[1000px]">
                                작성자
                            </span>
                        )}
                    </div>

                    <div className="text-gray-100 mt-1 mb-2 whitespace-pre-wrap break-words">
                        {comment.deleted ? (
                            <span className="text-gray-100">
                                삭제된 댓글입니다
                            </span>
                        ) : comment.secret ? (
                            <p className="text-gray-100 flex gap-1 items-center">
                                <span>비밀글 입니다</span>
                                <Lock />
                            </p>
                        ) : (
                            comment.content
                        )}
                    </div>

                    <div className="text-xs font-light text-gray-600">
                        {new Date(comment.createdAt).toLocaleString()}
                    </div>
                </div>

                <div className="flex items-start">
                    {isAuthor && onSelectMenu && (
                        <Dropdown
                            options={['수정하기', '삭제하기']}
                            placeholder="메뉴"
                            showPlaceholderInMenu={false}
                            iconType="comment"
                            onSelect={(action) =>
                                onSelectMenu(comment.commentId, action)
                            }
                        />
                    )}
                </div>
            </div>

            {comment.children && comment.children.length > 0 && (
                <div className="mt-5 pl-2">
                    {comment.children.map((child) => (
                        <CommentItem
                            key={child.commentId}
                            comment={child}
                            currentUserId={currentUserId}
                            level={level + 1}
                            onSelectMenu={onSelectMenu}
                        />
                    ))}
                </div>
            )}
        </div>
    );

    return level === 0 ? (
        <div className="border-b border-gray-700">{content}</div>
    ) : (
        content
    );
}

// 댓글 리스트 컴포넌트
export default function CommentList({
    comments,
    currentUserId,
    onSelectMenu,
}: CommentListProps) {
    const commentTree = buildCommentTree(comments);

    return (
        <div className="space-y-4">
            {commentTree.map((comment) => (
                <CommentItem
                    key={comment.commentId}
                    comment={comment}
                    currentUserId={currentUserId}
                    onSelectMenu={onSelectMenu}
                />
            ))}
        </div>
    );
}
