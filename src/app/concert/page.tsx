'use client';

import { EventCardList } from '@/components/concert';
import { eventCardList } from '@/__mock__/eventCard';
import { PaginationButton } from '@/components/ui';
import { useState } from 'react';

export default function ConcertPage() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="flex flex-col justify-center items-center gap-17 pt-25 w-full">
            <EventCardList eventCardList={eventCardList} />
            <PaginationButton
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
                size="large"
            />
        </div>
    );
}
