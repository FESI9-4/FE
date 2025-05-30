'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { SearchIcon } from '@/assets';

interface PlaceAutoCompleteInputProps {
  onPlaceSelect: (lat: number, lng: number, address: string) => void;
}

const PlaceAutoCompleteInput: React.FC<PlaceAutoCompleteInputProps> = ({ onPlaceSelect })=> {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // updatePacPosition 함수 useCallback으로 선언
  const updatePacPosition = useCallback(() => {
    const pac = document.querySelector('.pac-container') as HTMLElement | null;
    if (!pac || !inputRef.current) return;

    const rect = inputRef.current.getBoundingClientRect();

    pac.style.position = 'fixed';
    pac.style.top = `${rect.bottom}px`;
    pac.style.left = `${rect.left}px`;
    pac.style.width = `${rect.width}px`;
    pac.style.zIndex = '9999';
  }, []);
  // 드롭다운 스크롤 시 같이 움직이는 현상 방지

  useEffect(() => {
    const currentInput = inputRef.current;

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: 'weekly',
      libraries: ['places'],
    });

    loader.importLibrary('places').then(() => {
      if (!currentInput || autocompleteRef.current) return;

      autocompleteRef.current = new google.maps.places.Autocomplete(currentInput, {
        types: ['geocode'],
        componentRestrictions: { country: 'kr' },
      });

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

         onPlaceSelect(lat, lng, address);
        //TODO 팬팔 모달로 전달 ...처리
      });

      currentInput.addEventListener('focus', updatePacPosition);
      window.addEventListener('scroll', updatePacPosition, true);
      window.addEventListener('resize', updatePacPosition);
    });

    return () => {
      if (currentInput) {
        currentInput.removeEventListener('focus', updatePacPosition);
      }
      window.removeEventListener('scroll', updatePacPosition, true);
      window.removeEventListener('resize', updatePacPosition);
    };
  }, [updatePacPosition]);

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
