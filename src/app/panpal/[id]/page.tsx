import { DetailPageCard, DetailPageDescription } from '@/components/detailPage';

interface PageProps {
    params: { id: string };
}

export default async function PanpalDetailPage({ params }: PageProps) {
    const { id } = await Promise.resolve(params);

    // id값은 나중에 api 작업에서 ... 보내줘야함.
    // TODO 작성자 일시에 보여주는 페이지가 다름 ,,, + 프로필 이미지 모집마감처리 + 빈댓글 일때

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
