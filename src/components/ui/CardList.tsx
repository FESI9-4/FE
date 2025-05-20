import Image from 'next/image';
import dateConverter from '@/utils/dateConverter';

interface CardListProps {
    title: string;
    location: string;
    date: string;
    deadline: string;
    createdAt: string;
    currentPerson: number;
    maxPerson: number;
    openStatus: string; // 나중에 타입 변경
    wishList: boolean;
    image: string;
    useStatus: string; // 나중에 타입 변경
}

export default function CardList({
    title,
    location,
    date,
    deadline,
    createdAt,
    currentPerson,
    maxPerson,
    openStatus,
    wishList,
    image,
    useStatus,
}: CardListProps) {
    const convertedDate = dateConverter(Number(date));
    const convertedDeadline = dateConverter(Number(deadline));
    const convertedCreatedAt = dateConverter(Number(createdAt));
    console.log(convertedDate);
    return (
        <div className="w-full bg-orange-500 overflow-hidden flex py-3 pl-3 pr-6 gap-6">
            <div className="w-1/4 relative">
                <Image src={image} alt="image" fill objectFit="contain" />
            </div>
            <div className="w-3/4">
                <div className="flex">
                    <h1>{title}</h1>
                    <div>|</div>
                    <p>{location}</p>
                </div>
                <div>
                    <p>{convertedDate}</p>
                </div>
                <p>{convertedDeadline}</p>
                <p>{convertedCreatedAt}</p>
                <div>
                    <p>{currentPerson}</p>
                    <p>{maxPerson}</p>
                    <p>{openStatus}</p>
                    <Image
                        src={
                            'https://blog.kakaocdn.net/dn/bedWRa/btsNEEWt0FW/qFXWdARM0Q6oq2fHvbu79k/img.gif'
                        }
                        alt="image"
                        width={100}
                        height={100}
                    />
                </div>

                <p>{wishList}</p>
                <p>{useStatus}</p>
            </div>
        </div>
    );
}
