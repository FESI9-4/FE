'use client';

import { useDropdown } from './useDropdown';
import { dropdownVariants } from './dropdownStyles';
import Image from 'next/image';
import { DropdownProps } from './types';

export default function FilterDropdown({
    options,
    selected,
    onSelect,
    placeholder = '필터를 선택해주세요',
}: DropdownProps) {
    const { isOpen, setIsOpen, dropdownRef } = useDropdown();

    const handleSelect = (value: string) => {
        onSelect(value);
        setIsOpen(false);
    };

    const isSelected: boolean = Boolean(selected) && selected !== placeholder;
    const iconSrc =
        isSelected || isOpen ? '/icons/whiteDown.svg' : '/icons/blackDown.svg';

    return (
        <div
            ref={dropdownRef}
            className={dropdownVariants.container({
                type: '필터',
                active: isSelected,
            })}
        >
            <button
                className={dropdownVariants.button({
                    type: '필터',
                    active: isSelected,
                })}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <p
                    className={dropdownVariants.text({
                        type: '필터',
                        active: isSelected,
                    })}
                >
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
                <ul className={dropdownVariants.menu({ type: '필터' })}>
                    <li
                        key="__placeholder__"
                        className={dropdownVariants.item({ type: '필터' })}
                        onClick={() => handleSelect(placeholder)}
                    >
                        <p className={dropdownVariants.itemText()}>
                            {placeholder}
                        </p>
                    </li>
                    {options.map((option) => (
                        <li
                            key={option}
                            className={dropdownVariants.item({ type: '필터' })}
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
