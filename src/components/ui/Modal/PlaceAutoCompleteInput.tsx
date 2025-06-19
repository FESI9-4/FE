'use client';

import { useEffect, useRef, useCallback } from 'react';
import loader from '@/utils/googleMapsLoader';
import { SearchIcon } from '@/assets';

interface PlaceAutoCompleteInputProps {
    onPlaceSelect: (lat: number, lng: number, address: string) => void;
}

const PlaceAutoCompleteInput: React.FC<PlaceAutoCompleteInputProps> = ({
    onPlaceSelect,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
        null
    );

    const updatePacPosition = useCallback(() => {
        const pac = document.querySelector(
            '.pac-container'
        ) as HTMLElement | null;
        const input = inputRef.current;
        const modalRoot = document.getElementById('modal-root');

        if (!pac || !input) {
            console.log(
                '[INFO] pac-container 또는 input이 없음. 위치 계산 스킵'
            );
            return;
        }

        if (modalRoot && !modalRoot.contains(pac)) {
            console.log('[DEBUG] pac-container를 modal-root에 append');
            modalRoot.appendChild(pac);
        }

        const rect = input.getBoundingClientRect();
        pac.style.position = 'absolute';
        pac.style.top = `${rect.bottom + window.scrollY}px`;
        pac.style.left = `${rect.left + window.scrollX}px`;
        pac.style.width = `${rect.width}px`;
        pac.style.zIndex = '1000';
    }, []);

    useEffect(() => {
        const currentInput = inputRef.current;

        loader
            .importLibrary('places')
            .then(() => {
                console.log('[DEBUG] Places 라이브러리 로딩 완료');

                if (!currentInput) {
                    console.log('[ERROR] inputRef가 null임');
                    return;
                }

                if (autocompleteRef.current) {
                    console.log('[INFO] Autocomplete 이미 생성됨');
                    return;
                }

                autocompleteRef.current = new google.maps.places.Autocomplete(
                    currentInput,
                    {
                        componentRestrictions: { country: 'kr' },
                    }
                );
                console.log('[DEBUG] Autocomplete 인스턴스 생성됨');

                autocompleteRef.current.addListener('place_changed', () => {
                    console.log('[DEBUG] 장소가 선택됨');

                    const place = autocompleteRef.current!.getPlace();
                    console.log('[DEBUG] getPlace()', place);

                    if (!place.geometry || !place.geometry.location) {
                        console.log(
                            '[ERROR] 선택한 장소에 위치 정보가 없음',
                            place
                        );
                        return;
                    }

                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();
                    const address = place.formatted_address || '';

                    console.log('[DEBUG] 위치 정보 전달', {
                        lat,
                        lng,
                        address,
                    });
                    onPlaceSelect(lat, lng, address);
                });

                currentInput.addEventListener('focus', updatePacPosition);
                window.addEventListener('scroll', updatePacPosition, true);
                window.addEventListener('resize', updatePacPosition);
            })
            .catch((err) => {
                console.error('[ERROR] Places 라이브러리 로딩 실패', err);
            });

        return () => {
            const pac = document.querySelector(
                '.pac-container'
            ) as HTMLElement | null;
            if (pac) {
                console.log('[DEBUG] pac-container 제거됨');
                pac.remove();
            }

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
