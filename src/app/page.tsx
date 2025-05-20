'use client';

import { CardList } from '@/components/ui';

export default function Home() {
    return (
        <div className="text-3xl font-bold">
            <CardList
                title="테스트 타이틀"
                location="홍대입구역 8번출구"
                date="1747361368"
                deadline="1748361368"
                createdAt="1746361368"
                currentPerson={1}
                maxPerson={10}
                openStatus="open"
                wishList={false}
                image="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbWpwxV%2FbtsNKx9Q0JL%2Fckx0ZMKTLsfbcW2WQTCw4k%2Fimg.png"
                useStatus="use"
                createdUser="홍길동"
                createdUserProfileImg="https://blog.kakaocdn.net/dn/bedWRa/btsNEEWt0FW/qFXWdARM0Q6oq2fHvbu79k/img.gif"
            />
        </div>
    );
}
