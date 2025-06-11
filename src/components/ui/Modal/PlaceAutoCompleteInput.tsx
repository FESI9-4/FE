'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { SearchIcon } from '@/assets';

interface PlaceAutoCompleteInputProps {
    onPlaceSelect: (lat: number, lng: number, address: string) => void;
}

const PlaceAutoCompleteInput: React.FC<PlaceAutoCompleteInputProps> = ({
    onPlaceSelect,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const updatePacPosition = useCallback(() => {
        const pac = document.querySelector('.pac-container') as HTMLElement | null;
        const input = inputRef.current;
        const modalRoot = document.getElementById('modal-root');

        if (!pac || !input) return;

        if (modalRoot && !modalRoot.contains(pac)) {
            modalRoot.appendChild(pac);
        }

        const rect = input.getBoundingClientRect();
        pac.style.position = 'absolute';
        pac.style.top = `${rect.bottom + window.scrollY}px`;
        pac.style.left = `${rect.left + window.scrollX}px`;
        pac.style.width = `${rect.width}px`;
        pac.style.zIndex = '51';
    }, []);

    useEffect(() => {
        const currentInput = inputRef.current;

        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
            version: 'weekly',
            libraries: ['places'],
        });

        loader.importLibrary('places').then(() => {
            if (!currentInput || autocompleteRef.current) return;

            autocompleteRef.current = new google.maps.places.Autocomplete(
                currentInput,
                {
                    componentRestrictions: { country: 'kr' },
                }
            );

            autocompleteRef.current.addListener('place_changed', () => {
                const place = autocompleteRef.current!.getPlace();

                if (!place.geometry || !place.geometry.location) {
                    console.log('선택한 장소에 위치 정보가 없습니다.');
                    return;
                }

                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                const address = place.formatted_address || '';

                onPlaceSelect(lat, lng, address);
            });

    
            currentInput.addEventListener('focus', updatePacPosition);
            window.addEventListener('scroll', updatePacPosition, true);
            window.addEventListener('resize', updatePacPosition);
        });


        return () => {
            const pac = document.querySelector('.pac-container') as HTMLElement | null;
            if (pac) pac.remove();

            if (currentInput) {
                currentInput.removeEventListener('focus', updatePacPosition);
            }
            window.removeEventListener('scroll', updatePacPosition, true);
            window.removeEventListener('resize', updatePacPosition);
        };
    }, [updatePacPosition, onPlaceSelect]);

    return (
        <div className="relative w-full">
            <SearchIcon className="absolute left-2.5 top-2 transform text-white w-6 h-6 pointer-events-none" />
            <input
                ref={inputRef}
                type="text"
                id="pac-input"
                placeholder="장소를 선택해주세요"
                className="pl-10 pr-4 w-full h-10 rounded-xl bg-gray-850 text-white placeholder-gray-600 font-medium focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-sm text-sm"
            />
        </div>
    );
};

export default PlaceAutoCompleteInput;
