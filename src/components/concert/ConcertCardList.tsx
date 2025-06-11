import { ConcertCard } from './ConcertCard';
import { Concert } from '@/types/concert';

export default function ConcertCardList({
    concertResponse,
}: {
    concertResponse: Concert[];
}) {
    return (
        <div className="grid grid-cols-4 gap-3">
            {concertResponse.map((concert) => (
                <ConcertCard
                    key={concert.mt20id}
                    id={concert.mt20id}
                    title={concert.prfnm}
                    location={concert.fcltynm}
                    startDate={concert.prfpdfrom}
                    endDate={concert.prfpdto}
                    imageUrl={concert.poster}
                />
            ))}
        </div>
    );
}
