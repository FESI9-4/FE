'use client';

import { CardList, MyCardList } from '@/components/ui';

export default function Home() {
    return (
        <div className="text-3xl font-bold h-full bg-black">
            <CardList
                title="데이브레이크 콘서트"
                location="홍대입구역 8번출구"
                date="1747361368"
                deadline="1748361368"
                currentPerson={3}
                maxPerson={10}
                openStatus="waiting"
                wishList={false}
                image="https://www.kopis.or.kr/upload/pfmPoster/PF_PF265653_250523_132834.gif"
                createdUser="뫀호호"
                createdUserProfileImg="https://blog.kakaocdn.net/dn/bedWRa/btsNEEWt0FW/qFXWdARM0Q6oq2fHvbu79k/img.gif"
            />
            <CardList
                title="데이브레이크 콘서트"
                location="홍대입구역 8번출구"
                date="1747361368"
                deadline="1748361368"
                currentPerson={7}
                maxPerson={10}
                openStatus="progressing"
                wishList
                image="https://otr.co.kr/wp-content/uploads/mangboard/2021/10/31/F72572_%EC%9B%B9%ED%8F%AC%EC%8A%A4%ED%84%B0_%EC%A0%95%EC%82%AC%EA%B0%81%ED%98%95_jpg.jpg"
                createdUser="뫀호호"
                createdUserProfileImg="https://blog.kakaocdn.net/dn/bedWRa/btsNEEWt0FW/qFXWdARM0Q6oq2fHvbu79k/img.gif"
            />
            <CardList
                title="데이브레이크 콘서트"
                location="홍대입구역 8번출구"
                date="1747361368"
                deadline="1748361368"
                currentPerson={7}
                maxPerson={10}
                openStatus="finished"
                wishList={false}
                image="https://blog.kakaocdn.net/dn/bedWRa/btsNEEWt0FW/qFXWdARM0Q6oq2fHvbu79k/img.gif"
                createdUser="뫀호호"
                createdUserProfileImg="https://blog.kakaocdn.net/dn/bedWRa/btsNEEWt0FW/qFXWdARM0Q6oq2fHvbu79k/img.gif"
            />
            <div className="h-full bg-blue-500 flex flex-col">
                <MyCardList
                    title="데이브레이크 콘서트"
                    location="홍대입구역 8번출구"
                    date="1747361368"
                    currentPerson={7}
                    maxPerson={10}
                    openStatus="progressing"
                    image="https://blog.kakaocdn.net/dn/bedWRa/btsNEEWt0FW/qFXWdARM0Q6oq2fHvbu79k/img.gif"
                    createdUser="뫀호호"
                    createdUserProfileImg="https://blog.kakaocdn.net/dn/bedWRa/btsNEEWt0FW/qFXWdARM0Q6oq2fHvbu79k/img.gif"
                    useStatus="schedule"
                />
                <MyCardList
                    title="데이브레이크 콘서트"
                    location="홍대입구역 8번출구"
                    date="1747361368"
                    currentPerson={7}
                    maxPerson={10}
                    openStatus="canceled"
                    image="https://blog.kakaocdn.net/dn/bedWRa/btsNEEWt0FW/qFXWdARM0Q6oq2fHvbu79k/img.gif"
                    createdUser="뫀호호"
                    createdUserProfileImg="https://blog.kakaocdn.net/dn/bedWRa/btsNEEWt0FW/qFXWdARM0Q6oq2fHvbu79k/img.gif"
                    useStatus="schedule"
                />
                <MyCardList
                    title="데이브레이크 콘서트"
                    location="홍대입구역 8번출구"
                    date="1747361368"
                    currentPerson={7}
                    maxPerson={10}
                    openStatus="waiting"
                    image="https://blog.kakaocdn.net/dn/bedWRa/btsNEEWt0FW/qFXWdARM0Q6oq2fHvbu79k/img.gif"
                    createdUser="뫀호호"
                    createdUserProfileImg="https://blog.kakaocdn.net/dn/bedWRa/btsNEEWt0FW/qFXWdARM0Q6oq2fHvbu79k/img.gif"
                    useStatus="done"
                />
            </div>
        </div>
    );
}
