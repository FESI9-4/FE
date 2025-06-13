import { ConcertCard } from './ConcertCard';
import { Concert } from '@/types/concert';
import React from 'react';

export default function ConcertCardList({
    concertResponse,
}: {
    concertResponse: Concert[];
}) {
    return (
        <div className="grid sm:grid-cols-4 gap-3">
            {concertResponse.map((concert, index) => (
                <React.Fragment key={concert.mt20id}>
                    <ConcertCard
                        id={concert.mt20id}
                        title={concert.prfnm}
                        location={concert.fcltynm}
                        startDate={concert.prfpdfrom}
                        endDate={concert.prfpdto}
                        imageUrl={concert.poster}
                    />
                    {index !== concertResponse.length - 1 && (
                        <hr className="border-t border-gray-800 sm:hidden" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
