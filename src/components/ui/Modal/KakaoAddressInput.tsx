'use client';

import React, { useState, useEffect, useRef } from 'react';

// TODO 추후에 input 컴포넌트 생성되면 훅으로 따로 빼서 적용하면 될듯...

interface Address {
    address_name: string;
    x: string;
    y: string;
}

interface KakaoAddressInputProps {
    onSelect: (address: Address) => void;
}

export default function KakaoAddressInput({
    onSelect,
}: KakaoAddressInputProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Address[]>([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!query) {
            setResults([]);
            setDropdownVisible(false);
            return;
        }

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            fetch(`/api/address-search?query=${encodeURIComponent(query)}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.documents) {
                        setResults(data.documents);
                        setDropdownVisible(true);
                    } else {
                        setResults([]);
                        setDropdownVisible(false);
                    }
                })
                .catch(() => {
                    setResults([]);
                    setDropdownVisible(false);
                });
        }, 300);
    }, [query]);

    function handleSelect(address: Address) {
        setQuery(address.address_name);
        setDropdownVisible(false);
        onSelect(address);
    }

    return (
        <div className="relative w-full ">
            <input
                type="text"
                placeholder="주소를 입력하세요"
                className="w-full border border-gray-300 rounded-xl px-3 py-2  hover:border-green-300 cursor-pointer"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => {
                    if (results.length > 0) setDropdownVisible(true);
                }}
                onBlur={() => {
                    setTimeout(() => setDropdownVisible(false), 150);
                }}
            />

            {isDropdownVisible && results.length > 0 && (
                <ul className="absolute bg-gray-800 mt-2 left-0 right-0  rounded-xl max-h-60 overflow-auto border border-gray-300 shadow z-10">
                    {results.map((addr) => (
                        <li
                            key={addr.address_name + addr.x + addr.y}
                            className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                            onClick={() => handleSelect(addr)}
                        >
                            {addr.address_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
