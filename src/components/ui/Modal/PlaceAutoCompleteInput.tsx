'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { SearchIcon } from '@/assets';

const PlaceAutoCompleteInput = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
        null
    );

    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
            version: 'weekly',
            libraries: ['places'],
        });

        const removeExtraPacContainers = () => {
            const pacContainers = document.querySelectorAll('.pac-container');
            pacContainers.forEach((el, idx) => {
                if (idx > 0) el.remove();
            });
        };

        const updatePacPosition = () => {
            removeExtraPacContainers();
            const pac = document.querySelector('.pac-container') as HTMLElement;
            const inputEl = inputRef.current;
            if (!pac || !inputEl) return;

            const rect = inputEl.getBoundingClientRect();
            pac.style.position = 'fixed';
            pac.style.top = `${rect.bottom}px`;
            pac.style.left = `${rect.left}px`;
            pac.style.width = `${rect.width}px`;
            pac.style.zIndex = '9999'; // 모달 위에 올라오지 않게 조정
        };

        loader.load().then(() => {
            const inputEl = inputRef.current;
            if (!inputEl || autocompleteRef.current) return;

            autocompleteRef.current = new google.maps.places.Autocomplete(
                inputEl,
                {
                    types: ['geocode'],
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

                console.log('선택 주소:', address);
                console.log('위도:', lat);
                console.log('경도:', lng);
            });

            inputEl.addEventListener('focus', updatePacPosition);
            window.addEventListener('scroll', updatePacPosition, true);
            window.addEventListener('resize', updatePacPosition);
        });

        return () => {
            const inputEl = inputRef.current;
            inputEl?.removeEventListener('focus', updatePacPosition);
            window.removeEventListener('scroll', updatePacPosition, true);
            window.removeEventListener('resize', updatePacPosition);
        };
    }, []);

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
