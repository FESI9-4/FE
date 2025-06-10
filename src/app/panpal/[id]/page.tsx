import {
    DetailPageCard,
    DetailPageDescription,
} from '@/components/detailPage';

interface PageProps {
    params: { id: string };
}

export default async function PanpalDetailPage({ params }: PageProps) {
    const { id } = await Promise.resolve(params);

    // id를 api로 넘겨서 데이터받은다음 하위컴포넌트에 뿌려줘야 함 이 작업은 나중에 api 작업에서 할 것임.

    return (
        <div className="w-full  pt-6 sm:pt-5 xl:pt-8 flex flex-col justify-center min-w-98 min-h-screen max-w-249 m-auto xl:flex-row">
            <div className="w-full flex flex-col  mt-8 sm:mt-16 xl:mt-18.25 sm:px-6  ">
                <DetailPageCard />
                <DetailPageDescription />
                <p>Panpal ID: {id}</p>
            </div>
       
        </div>
    );
}
