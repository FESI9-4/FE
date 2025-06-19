import { DetailPageCard, DetailPageDescription } from '@/components/detailPage';
import { getDetailApi } from '@/utils/apis/getDetailApi';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PanpalDetailPage({ params }: PageProps) {
    const { id: idString } = await params;
    const id = Number(idString);
    const data = await getDetailApi.getDetailById(id);

    const descriptionProps = {
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
        articleId: id,
        createUser: data.createUser,
    };

    const cardProps = {
        title: data.title,
        date: data.date,
        deadLine: data.deadLine,
        createdAt: data.createdAt,
        minPerson: data.minPerson,
        currentPerson: data.currentPerson,
        maxPerson: data.maxPerson,
        participants: data.participants,
        wishList: data.wishList,
        articleImageUrl: data.articleImageUrl,
        openStatus: data.openStatus,
        useStatus: data.useStatus,
        createUser: data.createUser,
        location: data.location,
        articleId: id,
        createUserProfileImgUrl: data.createUserProfileImgUrl,
    };
    console.log(data.createdAt);
    return (
        <div className="w-full pt-6 sm:pt-5 xl:pt-8 flex flex-col justify-center min-w-93.75 min-h-screen max-w-249 m-auto xl:flex-row">
            <div className="w-full flex flex-col mt-8 sm:mt-16 xl:mt-18.25 sm:px-6">
                <DetailPageCard {...cardProps} />
                <DetailPageDescription {...descriptionProps} />
            </div>
        </div>
    );
}
