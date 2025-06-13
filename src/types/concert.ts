export interface ConcertCardProps {
    id: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    imageUrl: string;
}

export interface Concert {
    area: string;
    fcltynm: string;
    genrenm: string;
    mt20id: string;
    openrun: string;
    poster: string;
    prfnm: string;
    prfpdfrom: string;
    prfpdto: string;
    prfstate: string;
    _text: string;
}
