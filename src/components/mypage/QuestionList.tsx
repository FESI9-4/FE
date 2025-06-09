import { QuestionCard } from '../ui';
import { QuestionListMok as mok } from '../../__mock__/mypage';
import { BlankScreen } from '@/components/mypage';

export default function QuestionList() {
    return (
        <div>
            {mok.data.length === 0 ? (
                <BlankScreen
                    text={`아직 작성한 Q&A가 없어요\n궁금한 걸 자유롭게 질문해보세요!`}
                />
            ) : (
                <div className="flex flex-col gap-10 text-white text-lg font-semibold">
                    <div className="flex flex-col gap-5">
                        <div>답변대기</div>
                        <div className="flex flex-col gap-7">
                            {mok.data
                                .filter((item) => item.answer === undefined)
                                .map((item) => (
                                    <QuestionCard
                                        key={item.comment_id}
                                        title={item.title}
                                        location={item.location}
                                        createdAt={item.createdAt}
                                        comment={item.comment}
                                        answer={item.answer}
                                    />
                                ))}
                        </div>
                    </div>
                    <hr className="border-t border-gray-800 pb-3" />
                    <div className="flex flex-col gap-5">
                        <div>답변 완료</div>
                        <div className="flex flex-col gap-7">
                            {mok.data
                                .filter((item) => item.answer !== undefined)
                                .map((item) => (
                                    <QuestionCard
                                        key={item.comment_id}
                                        title={item.title}
                                        location={item.location}
                                        createdAt={item.createdAt}
                                        comment={item.comment}
                                        answer={item.answer}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
