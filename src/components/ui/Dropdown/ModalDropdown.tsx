'use client';

import { useDropdown } from './useDropdown';
import { dropdownVariants } from './dropdownStyles';
import Image from 'next/image';
import { DropdownProps } from './types';

export default function ModalDropdown({
    options,
    selected,
    onSelect,
    placeholder = '장소를 선택해주세요',
}: DropdownProps) {
    const { isOpen, setIsOpen, dropdownRef } = useDropdown();

    const handleSelect = (value: string) => {
        onSelect(value);
        setIsOpen(false);
    };

    const iconSrc = '/icons/blackDown.svg';

    return (
        <div
            ref={dropdownRef}
            className={dropdownVariants.container({ type: '모달' })}
        >
            <button
                className={dropdownVariants.button({ type: '모달' })}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <p className={dropdownVariants.text({ type: '모달' })}>
                    {selected || placeholder}
                </p>
                <Image
                    src={iconSrc}
                    alt="arrow icon"
                    width={100}
                    height={100}
                    className="w-3 h-3 object-contain"
                />
            </button>

            {isOpen && (
                <ul className={dropdownVariants.menu({ type: '모달' })}>
                    {options.map((option) => (
                        <li
                            key={option}
                            className={dropdownVariants.item({ type: '모달' })}
                            onClick={() => handleSelect(option)}
                        >
                            <p
                                className={`${dropdownVariants.itemText()} ${
                                    selected === option
                                        ? dropdownVariants.selectedItemText()
                                        : ''
                                }`}
                            >
                                {option}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
