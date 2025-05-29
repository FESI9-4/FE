import { CardList, MyCardList, QuestionCard } from '@/components/ui';

export default function Home() {
    return (
        <div className="flex flex-col gap-4 bg-black">
            <CardList
                title="카드 리스트"
                location="서울"
                date="1685385600"
                deadline="1685385600"
                currentPerson={1}
                maxPerson={10}
                openStatus="waiting"
                wishList={false}
                image="https://picsum.photos/200/300"
                createdUser="홍길동"
                createdUserProfileImg="https://picsum.photos/200/300"
            />
            <MyCardList
                title="카드 리스트"
                location="서울"
                date="1685385600"
                currentPerson={1}
                maxPerson={10}
                openStatus="waiting"
                wishList={false}
                image="https://picsum.photos/200/300"
                createdUser="홍길동"
                createdUserProfileImg="https://picsum.photos/200/300"
            />
            <QuestionCard
                title="질문 카드"
                location="서울"
                createdAt="1685385600"
                comment="카드 리스트"
            />
        </div>
    );
}
