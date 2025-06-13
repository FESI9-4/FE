'use client';

import { useEffect, useRef } from 'react';
import loader from '@/utils/googleMapsLoader';

interface MapProps {
    lat: number;
    lng: number;
    zoom?: number;
}

export default function GoogleMap({ lat, lng, zoom = 15 }: MapProps) {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        loader.importLibrary('maps').then(async () => {
            const map = new google.maps.Map(mapRef.current!, {
                center: { lat, lng },
                zoom,
                mapId: 'map',
            });

            const { AdvancedMarkerElement } =
                await google.maps.importLibrary('marker');

            new AdvancedMarkerElement({
                position: { lat, lng },
                map,
            });
        });
    }, [lat, lng, zoom]);

    return (
        <div
            ref={mapRef}
            className="w-full h-full rounded-xl overflow-hidden"
        />
    );
}
