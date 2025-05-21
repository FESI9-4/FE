'use client';

import { useDropdown } from './useDropdown';
import { dropdownVariants } from './dropdownStyles';
import Image from 'next/image';
import { DropdownProps } from './types';

export default function SortDropdown({
  options,
  selected,
  onSelect,
  placeholder = '정렬 기준을 선택해주세요',
}: DropdownProps) {
  const { isOpen, setIsOpen, dropdownRef } = useDropdown();

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const iconSrc = '/icons/sort.svg';

  return (
    <div ref={dropdownRef} className={dropdownVariants.container({ type: '정렬' })}>
      <button
        className={dropdownVariants.button({ type: '정렬' })}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <Image
          src={iconSrc}
          alt="sort icon"
          width={100}
          height={100}
          className="w-5 h-5 object-contain"
        />
        <p className={`${dropdownVariants.text({ type: '정렬' })} hidden md:block`}>
          {selected || placeholder}
        </p>
      </button>

      {isOpen && (
        <ul className={dropdownVariants.menu({ type: '정렬' })}>
          {options.map(option => (
            <li
              key={option}
              className={dropdownVariants.item({ type: '정렬' })}
              onClick={() => handleSelect(option)}
            >
              <p
                className={`${dropdownVariants.itemText()} ${
                  selected === option ? dropdownVariants.selectedItemText() : ''
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
