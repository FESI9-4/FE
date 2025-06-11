import Image from 'next/image';
import Link from 'next/link';
import { ConcertCardProps } from '@/types/concert';

export function ConcertCard({
    id,
    title,
    location,
    startDate,
    endDate,
    imageUrl,
}: ConcertCardProps) {
    return (
        <Link
            href={`/concert/${id}`}
            className="xl:w-64 sm:w-52 xl:px-3 xl:pt-3 xl:pb-8 p-2 hover:cursor-pointer hover:bg-gray-900 active:opacity-50"
        >
            <div className="flex sm:flex-col flex-row sm:gap-6 gap-3">
                <div className="relative xl:h-75 sm:h-61 h-30 sm:w-full w-25 items-center justify-center">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col gap-1 text-sm justify-center">
                    <div className="text-white xl:text-xl sm:text-lg text-base font-semibold">
                        {title}
                    </div>
                    <div className="text-gray-400 font-medium">{location}</div>
                    <div className="text-gray-200 font-normal pt-2 sm:pt-0">
                        {startDate} - {endDate}
                    </div>
                </div>
            </div>
        </Link>
    );
}
