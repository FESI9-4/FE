import { EventCard, EventCardProps } from './EventCard';

interface EventCardListProps {
    eventCardList: EventCardProps[];
}

export default function EventCardList({ eventCardList }: EventCardListProps) {
    return (
        <div className="grid grid-cols-4 gap-3">
            {eventCardList.map((event) => (
                <EventCard key={event.id} {...event} />
            ))}
        </div>
    );
}
