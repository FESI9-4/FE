import { AnswerCard } from '../ui';
import { AnswerListMok as mok } from '../../__mock__/mypage';
import { BlankScreen } from '@/components/mypage';

export default function AnswerList() {
    const toDay = Date.now() / 1000;

    return (
        <div>
            {mok.data.length === 0 ? (
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
                            {mok.data
                                .filter(
                                    (item) =>
                                        item.createdAt >= toDay - 60 * 60 * 24
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
                        <div>답변 목록 ({mok.data.length})</div>
                        <div className="flex flex-col gap-7">
                            {mok.data.map((item) => (
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
                </div>
            )}
        </div>
    );
}
