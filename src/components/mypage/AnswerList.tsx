'use client';

import { AnswerCard } from '../ui';
import { BlankScreen } from '@/components/mypage';
import { useInfiniteQuery } from '@tanstack/react-query';
import { mypageApi } from '@/utils/apis/mypage';
import { AnswerListResponse } from '@/types/myPage';
import { useRef, useCallback, useMemo } from 'react';

export default function AnswerList() {
    const observerRef = useRef<IntersectionObserver | null>(null);

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<AnswerListResponse>({
        queryKey: ['answerList'],
        queryFn: ({ pageParam }) =>
            mypageApi.getAnswer(pageParam as number | null, 10),
        getNextPageParam: (lastPage) => {
            if (lastPage.data.length === 0) return undefined;
            return lastPage.data[lastPage.data.length - 1].fanpal_id;
        },
        initialPageParam: 1,
    });

    const lastElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading) return;
            if (observerRef.current) observerRef.current.disconnect();
            observerRef.current = new IntersectionObserver((entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            });

            if (node) observerRef.current.observe(node);
        },
        [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]
    );

    const allData = useMemo(() => {
        return data?.pages.flatMap((page) => page.data) || [];
    }, [data?.pages]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    const toDay = Date.now() / 1000;

    return (
        <div>
            {allData.length === 0 ? (
                <BlankScreen
                    text={`아직 작성한 Q&A가 없어요\n궁금한 걸 자유롭게 질문해보세요!`}
                />
            ) : (
                <div className="flex flex-col gap-10 text-white text-lg font-semibold">
                    <div className="flex flex-col gap-5">
                        <div>
                            새로운 질문{' '}
                            <span className="text-green-400">N</span>
                        </div>
                        <div className="flex flex-col gap-7">
                            {allData
                                .filter(
                                    (item) =>
                                        item.createdAt >=
                                            toDay - 60 * 60 * 24 || !item.answer
                                )
                                .map((item) => (
                                    <AnswerCard
                                        key={item.fanpal_id}
                                        title={item.title}
                                        location={item.location}
                                        createdAt={item.createdAt}
                                        comment={item.comment}
                                        answer={item.answer}
                                        fanpalId={item.fanpal_id}
                                    />
                                ))}
                        </div>
                    </div>
                    <hr className="border-t border-gray-800 pb-3" />
                    <div className="flex flex-col gap-5">
                        <div>답변 목록 ({data?.pages[0]?.totalCount || 0})</div>
                        <div className="flex flex-col gap-7">
                            {allData.map((item, index) => (
                                <div
                                    key={item.fanpal_id}
                                    ref={
                                        allData.length === index + 1
                                            ? lastElementRef
                                            : null
                                    }
                                >
                                    <AnswerCard
                                        title={item.title}
                                        location={item.location}
                                        createdAt={item.createdAt}
                                        comment={item.comment}
                                        answer={item.answer}
                                        fanpalId={item.fanpal_id}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {isFetchingNextPage && (
                        <div className="text-center py-4">
                            <div className="text-gray-400">로딩 중...</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
