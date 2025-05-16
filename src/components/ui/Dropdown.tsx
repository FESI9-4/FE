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
    const sharedStyles = {
        containerBase:
            'relative h-9 md:h-10 rounded-lg border border-gray-200 flex justify-center items-center',
        buttonBase: 'h-6 text-left flex items-center',
        textBase: 'text-gray-700 text-sm font-medium',
        menuBase:
            'absolute left-0 top-12 bg-white max-h-36 md:max-h-40 border rounded-lg shadow-md z-10 overflow-y-auto',
        item: 'h-9 md:h-10 px-4 py-2 md:py-2.5 cursor-pointer text-sm hover:bg-gray-50',
    };

    switch (type) {
        case '모달':
            return {
                container:
                    'relative w-85.75 md:w-118 md:h-11 h-10 rounded-xl border border-gray-50 bg-gray-50 flex justify-center items-center',
                button:
                    'w-77.75 md:w-110 h-6 text-left flex items-center justify-between',
                text:
                    'w-40 h-5 object-cover text-gray-400 text-sm font-medium md:text-base flex items-center',
                menu:
                    'absolute left-0 top-13 bg-white md:w-118 md:max-h-44 w-85.75 max-h-40 border rounded-xl shadow-sm z-10 overflow-y-auto',
                item: 'h-10 md:h-11 md:py-3 px-4 py-2.5 cursor-pointer text-sm hover:bg-gray-100',
            };
        case '필터':
        case '정렬': {
            const isSort = type === '정렬';
            return {
                container: `${sharedStyles.containerBase} ${isSort ? 'w-9 md:w-27.5' : 'w-27.5'}`,
                button: `${sharedStyles.buttonBase} ${isSort ? 'w-21.5 justify-center md:justify-between' : 'w-21.5 justify-between'}`,
                text: sharedStyles.textBase,
                menu: `${sharedStyles.menuBase} ${isSort ? 'w-27.5 md:w-full' : 'w-full'}`,
                item: sharedStyles.item,
            };
        }
    }
};


    const isFilterSelected =
        type === '필터' && selected && selected !== placeholder;
    const styles = getDropdownStyles();

    const isActive = type === '필터' && (isFilterSelected || isOpen);
    const containerClass = `${styles.container} ${isActive ? 'bg-black border-black' : ''}`;
    const buttonClass = `${styles.button} ${isActive ? 'bg-black text-white' : ''}`;
    const textClass = `${styles.text} ${isActive ? 'text-white' : ''}`;

    const iconSrc =
        type === '정렬'
            ? '/icons/sort.svg'
            : type === '필터' && (isFilterSelected || isOpen)
              ? '/icons/whiteDown.svg'
              : '/icons/blackDown.svg';

    return (
        <div className={containerClass} ref={dropdownRef}>
            <button
                className={buttonClass}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {type === '정렬' ? (
                    <>
                        <Image
                            src={iconSrc}
                            alt="sortIcon"
                            width={100}
                            height={100}
                            className="w-5 h-5 object-contain"
                        />
                        <p className={`${textClass} hidden md:block`}>
                            {selected || placeholder}
                        </p>
                    </>
                ) : (
                    <>
                        <p className={textClass}>{selected || placeholder}</p>
                        <Image
                            src={iconSrc}
                            alt="downIcon"
                            width={100}
                            height={100}
                            className="w-3 h-3 object-contain"
                        />
                    </>
                )}
            </button>

            {isOpen && (
                <ul className={styles.menu}>
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
