import { DetailPageCard, DetailPageDescription } from '@/components/detailPage';

interface PageProps {
    params: { id: string };
}

export default async function PanpalDetailPage({ params }: PageProps) {
    const { id } = await Promise.resolve(params);
    /// 타입 명부터 맞추고 작업해야할듯;;;;
    const mock = {
        articleId: 1,
        createUser: '하',
        createUserProfileImgUrl: 'https://picsum.photos/40?random=1',
        title: '마감된 게시글입니다',
        location: '서울 강남역',
        latitude: 37.4979,
        longitude: 127.0276,
        description: '함께 디저트 투어하실 분 구했어요!',
        date: Date.now() + 1000 * 60 * 60 * 24 * 7,
        deadLine: Date.now() + 1000 * 60 * 60 * 24 * 5,
        createdAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
        minPerson: 3,
        currentPerson: 3,
        maxPerson: 5,
        participants: [
            { name: '유재석', image: 'https://picsum.photos/40?random=1' },
            { name: '박명수', image: 'https://picsum.photos/40?random=2' },
            { name: '정준하', image: 'https://picsum.photos/40?random=3' },
        ],
        wishList: false,
        articleImageUrl: 'https://picsum.photos/400/300?random=10',
        openStatus: 'finished',
        useStatus: 'expected',
    }as const; ;

    const descriptionProps = {
        description: mock.description,
        latitude: mock.latitude,
        longitude: mock.longitude,
    };

    const cardProps = {
        title: mock.title,
        date: mock.date,
        deadLine: mock.deadLine,
        createdAt: mock.createdAt,
        minPerson: mock.minPerson,
        currentPerson: mock.currentPerson,
        maxPerson: mock.maxPerson,
        participants: mock.participants,
        wishList: mock.wishList,
        articleImageUrl: mock.articleImageUrl,
        openStatus: mock.openStatus,
        useStatus: mock.useStatus,
        createUser: mock.createUser,
        location: mock.location,
        articleId:mock.articleId,
    };

    return (
        <div className="w-full pt-6 sm:pt-5 xl:pt-8 flex flex-col justify-center min-w-98 min-h-screen max-w-249 m-auto xl:flex-row">
            <div className="w-full flex flex-col mt-8 sm:mt-16 xl:mt-18.25 sm:px-6">
                <DetailPageCard {...cardProps} />
                <DetailPageDescription {...descriptionProps} />
                <p>Panpal ID: {id}</p>
            </div>
        </div>
    );
}
