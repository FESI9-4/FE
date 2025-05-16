'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type DropdownProps = {
    options: string[];
    onSelect: (value: string) => void;
    selected?: string;
    placeholder?: string;
    type?: '모달' | '필터' | '정렬';
};

export default function Dropdown({
    options,
    onSelect,
    selected,
    placeholder = '장소를 선택해주세요',
    type = '모달',
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                event.target instanceof Node &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (value: string) => {
        onSelect(value);
        setIsOpen(false);
    };

    const getDropdownStyles = () => {
        switch (type) {
            case '모달':
                return {
                    container:
                        'relative w-85.75 md:w-118 md:h-11 h-10 rounded-xl border border-gray-50 bg-gray-50 flex justify-center items-center',
                    button: 'w-77.75 md:w-110 h-6 text-left flex items-center justify-between',
                    text: 'w-40 h-5 object-cover text-gray-400 text-sm font-medium md:text-base flex items-center',
                    menu: 'absolute left-0 top-13 bg-white md:w-118 md:max-h-44 w-85.75 max-h-40 border rounded-xl shadow-sm z-10 overflow-y-auto',
                    item: 'h-10 md:h-11 md:py-3 px-4 py-2.5 cursor-pointer text-sm hover:bg-gray-100',
                };
            case '필터':
            case '정렬':
                return {
                    container:
                        'relative w-30 h-9 md:h-10 rounded-lg border border-gray-200 flex justify-center items-center',
                    button: 'w-full h-6 text-left flex items-center justify-between px-4',
                    text: 'text-gray-700',
                    menu: 'absolute left-0 top-12 bg-white w-full max-h-36 md:max-h-40 border rounded-lg shadow-md z-10 overflow-y-auto',
                    item: 'h-9 md:h-10 px-4 py-2 md:2.5 cursor-pointer text-sm hover:bg-gray-50',
                };

            //필터랑 정렬은 모든 내용은 같지만 처음 모양이 다르다 결국 타입은 묵어야 한다

            default:
                return {
                    container:
                        'relative w-118 h-11 rounded-xl border border-gray-50 bg-gray-50 flex justify-center items-center',
                    button: 'w-110 h-6 text-left flex items-center justify-between',
                    text: 'w-40 h-6 object-cover text-gray-400',
                    menu: 'absolute left-0 top-15 bg-white w-118 h-44 border rounded-xl shadow-sm z-10 overflow-y-auto',
                    item: 'h-11 px-4 py-3 cursor-pointer text-sm hover:bg-gray-100',
                };
        }
    };
    const isFilterSelected =
        type === '필터' && selected && selected !== placeholder;
    const styles = getDropdownStyles();
    // 이미지 쪽에서 조건부 렌더링으로 시켜줘야 함.

    const isActive = type === '필터' && (isFilterSelected || isOpen);
    // container에 조건부 스타일 적용
    const containerClass = `${styles.container} ${isActive ? 'bg-black border-black' : ''}`;
    const buttonClass = `${styles.button} ${isActive ? 'bg-black text-white' : ''}`;
    const textClass = `${styles.text} ${isActive ? 'text-white' : ''}`;

    const iconSrc =
        type === '필터' && (isFilterSelected || isOpen)
            ? '/icons/whiteDown.svg'
            : '/icons/blackDown.svg';

    return (
        <div className={containerClass} ref={dropdownRef}>
            <button
                className={buttonClass}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <p className={textClass}>{selected || placeholder}</p>
                <Image
                    src={iconSrc}
                    alt="downLogo"
                    width={100}
                    height={100}
                    className="w-3 h-3 object-contain"
                />
            </button>

            {isOpen && (
                <ul className={styles.menu}>
                    {/* placeholder를 선택 옵션으로 보여주기 */}
                    {type === '필터' && (
                        <li
                            key="__placeholder__"
                            className={styles.item}
                            onClick={() => handleSelect(placeholder)}
                        >
                            {placeholder}
                        </li>
                    )}
                    {options.map((option) => (
                        <li
                            key={option}
                            className={styles.item}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
