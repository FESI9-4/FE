import { http, HttpResponse } from 'msw';

const today = new Date();

const getDateAfterDays = (days: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    return date.getTime();
};

const getDateBeforeDays = (days: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() - days);
    return date.getTime();
};

const mockComments: Array<{
    commentId: number;
    content: string;
    parentCommentId: number;
    writerId: string;
    deleted: boolean;
    createdAt: number;
    secret: boolean;
}> = [
    {
        commentId: 1870,
        content: '제가 작성한 글이므로 떠야합니다!',
        parentCommentId: 1870,
        writerId: '재형',
        deleted: false,
        createdAt: getDateBeforeDays(2),
        secret: false,
    },
    {
        commentId: 1871,
        content: '위 댓글에 대한 답글입니다.',
        parentCommentId: 1870,
        writerId: 'test2',
        deleted: false,
        createdAt: getDateBeforeDays(2),
        secret: true,
    },
    {
        commentId: 1872,
        content: '두 번째 댓글입니다. 유익한 정보 감사합니다.',
        parentCommentId: 1872,
        writerId: 'test3',
        deleted: false,
        createdAt: getDateBeforeDays(1),
        secret: false,
    },
    {
        commentId: 1873,
        content: '세 번째 댓글입니다. 궁금한 점이 있어서 문의드립니다.',
        parentCommentId: 1873,
        writerId: 'test4',
        deleted: false,
        createdAt: getDateBeforeDays(1),
        secret: false,
    },
    {
        commentId: 1874,
        content: '네 번째 댓글입니다. 참여하고 싶습니다!',
        parentCommentId: 1874,
        writerId: 'test5',
        deleted: false,
        createdAt: getDateBeforeDays(0),
        secret: false,
    },
    {
        commentId: 1875,
        content: '다섯 번째 댓글입니다. 언제까지 신청 가능한가요?',
        parentCommentId: 1875,
        writerId: 'test6',
        deleted: false,
        createdAt: getDateBeforeDays(0),
        secret: true,
    },
    {
        commentId: 1876,
        content: '여섯 번째 댓글입니다. 저도 참여하고 싶어요!',
        parentCommentId: 1876,
        writerId: 'test7',
        deleted: false,
        createdAt: getDateBeforeDays(0),
        secret: false,
    },
    {
        commentId: 1877,
        content: '일곱 번째 댓글입니다. 정말 재미있을 것 같네요.',
        parentCommentId: 1877,
        writerId: 'test8',
        deleted: false,
        createdAt: getDateBeforeDays(0),
        secret: false,
    },
];

// 댓글 ID 생성을 위한 카운터
let nextCommentId = 1878;

export const commentHandlers = [
    http.get(
        'http://localhost:3000/api/board/:articleId/comment',
        ({ request }) => {
            const url = new URL(request.url);
            const pageSize = parseInt(url.searchParams.get('pageSize') || '5');
            const lastParentCommentId = url.searchParams.get(
                'lastParentCommentId'
            );
            const lastCommentId = url.searchParams.get('lastCommentId');

            const validComments = mockComments.filter(
                (comment) => !comment.deleted
            );

            let startIndex = 0;

            if (lastParentCommentId && lastCommentId) {
                const lastIndex = validComments.findIndex(
                    (comment) =>
                        comment.parentCommentId ===
                            parseInt(lastParentCommentId) &&
                        comment.commentId === parseInt(lastCommentId)
                );
                startIndex = lastIndex > -1 ? lastIndex + 1 : 0;
            }

            const endIndex = startIndex + pageSize;
            const paginatedComments = validComments.slice(startIndex, endIndex);

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(
                        HttpResponse.json({
                            statusCode: 200,
                            message: '댓글 리스트 호출 성공',
                            data: paginatedComments,
                        })
                    );
                }, 500);
            });
        }
    ),

    http.post(
        'http://localhost:3000/api/board/:articleId/comment',
        async ({ request }) => {
            const body = (await request.json()) as {
                parentCommentId: number | null;
                secret: boolean;
                content: string;
            };

            const newComment = {
                commentId: nextCommentId++,
                content: body.content,
                parentCommentId: body.parentCommentId || nextCommentId - 1,
                writerId: 1231414314, // msw? 현재 사용자로 받아오는건 어떻게 ?
                deleted: false,
                createdAt: new Date().getTime(),
                secret: body.secret,
            };

            mockComments.push(newComment);

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(
                        HttpResponse.json({
                            statusCode: 200,
                            message: '댓글 작성 성공',
                            data: '댓글이 성공적으로 작성되었습니다.',
                        })
                    );
                }, 300);
            });
        }
    ),

    http.patch(
        'http://localhost:3000/api/board/:articleId/comment',
        async ({ request }) => {
            const body = (await request.json()) as {
                commentID: number;
                secret: boolean;
                content: string;
            };

            const commentIndex = mockComments.findIndex(
                (comment) =>
                    comment.commentId === body.commentID && !comment.deleted
            );

            if (commentIndex === -1) {
                return HttpResponse.json(
                    {
                        statusCode: 404,
                        message: '댓글을 찾을 수 없습니다.',
                        data: null,
                    },
                    { status: 404 }
                );
            }

            // 동일
            if (mockComments[commentIndex].writerId !== '1231414314') {
                return HttpResponse.json(
                    {
                        statusCode: 403,
                        message: '댓글 수정 권한이 없습니다.',
                        data: null,
                    },
                    { status: 403 }
                );
            }

            mockComments[commentIndex] = {
                ...mockComments[commentIndex],
                content: body.content,
                secret: body.secret,
            };

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(
                        HttpResponse.json({
                            statusCode: 200,
                            message: '댓글 수정 성공',
                            data: '댓글이 성공적으로 수정되었습니다.',
                        })
                    );
                }, 300);
            });
        }
    ),

    http.delete(
        'http://localhost:3000/api/board/:articleId/comment/:commentId',
        ({ params }) => {
            const { commentId } = params;
            const targetCommentId = parseInt(commentId as string);

            const commentIndex = mockComments.findIndex(
                (comment) =>
                    comment.commentId === targetCommentId && !comment.deleted
            );

            if (commentIndex === -1) {
                return HttpResponse.json(
                    {
                        statusCode: 404,
                        message: '댓글을 찾을 수 없습니다.',
                        data: null,
                    },
                    { status: 404 }
                );
            }

            const targetComment = mockComments[commentIndex];

            // 작성자 확인 (실제로는 토큰 검증)
            if (targetComment.writerId !== '1231414314') {
                return HttpResponse.json(
                    {
                        statusCode: 403,
                        message: '댓글 삭제 권한이 없습니다.',
                        data: null,
                    },
                    { status: 403 }
                );
            }

            const isParentComment =
                targetComment.commentId === targetComment.parentCommentId;

            if (isParentComment) {
                mockComments.forEach((comment) => {
                    if (
                        comment.parentCommentId === targetCommentId &&
                        !comment.deleted
                    ) {
                        comment.deleted = true;
                    }
                });
            } else {
                targetComment.deleted = true;
            }

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(
                        HttpResponse.json({
                            statusCode: 200,
                            message: '댓글 삭제 성공',
                            data: isParentComment
                                ? '부모 댓글과 모든 답글이 성공적으로 삭제되었습니다.'
                                : '댓글이 성공적으로 삭제되었습니다.',
                        })
                    );
                }, 300);
            });
        }
    ),
];

export const detailHandlers = [
    http.get('http://localhost:3000/api/board/:articleId', ({ params }) => {
        const { articleId } = params;

        return HttpResponse.json({
            statusCode: 200,
            message: '성공',
            data: {
                articleId,
                createUser: '재형',
                createUserProfileImgUrl: 'https://picsum.photos/40?random=4',
                title: `게시글 ${articleId}`,
                location: '건대입구',
                latitude: 37.540705,
                longitude: 127.077538,
                description: '같이 콘서트 가실분',
                date: getDateAfterDays(5),
                deadLine: getDateAfterDays(10),
                createdAt: getDateBeforeDays(4),
                minPerson: 5,
                currentPerson: 5,
                maxPerson: 10,
                participants: [
                    {
                        name: '홍길동',
                        image: 'https://picsum.photos/40?random=4',
                    },
                    {
                        name: '이순신',
                        image: 'https://picsum.photos/40?random=5',
                    },
                ],
                wishList: true,
                articleImageUrl: 'https://picsum.photos/400/300?random=11',
                openStatus: 'finished',
                useStatus: 'COMPLETED',
            },
        });
    }),
    ...commentHandlers,
];
