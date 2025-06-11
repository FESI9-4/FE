'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapProps {
    lat: number;
    lng: number;
    zoom?: number;
}

export default function GoogleMap({ lat, lng, zoom = 15 }: MapProps) {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
            version: 'weekly',
            libraries: ['places', 'marker'],
        });

        loader.load().then(async () => {
            if (!mapRef.current) return;

            const map = new google.maps.Map(mapRef.current, {
                center: { lat, lng },
                zoom,
            });

            const { Marker } = (await google.maps.importLibrary(
                'marker'
            )) as google.maps.MarkerLibrary;

            new Marker({
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
