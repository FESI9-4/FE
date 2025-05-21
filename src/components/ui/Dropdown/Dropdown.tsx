'use client';

import { useDropdown } from './useDropdown';
import { dropdownVariants } from './dropdownStyles';
import Image from 'next/image';

export type DropdownProps = {
    options: string[];
    selected?: string;
    onSelect: (value: string) => void;
    placeholder?: string;
};

type DropdownType = '필터' | '모달' | '정렬';

interface Props extends DropdownProps {
    type: DropdownType;
    placeholder?: string;
}

export default function Dropdown({
    type,
    options,
    selected,
    onSelect,
    placeholder,
}: Props) {
    const { isOpen, setIsOpen, dropdownRef } = useDropdown();

    const handleSelect = (value: string) => {
        onSelect(value);
        setIsOpen(false);
    };

    //TODO SVGR 로 변경 
    
    const iconSrc = (() => {
        switch (type) {
            case '필터':
                return (Boolean(selected) && selected !== placeholder) || isOpen
                    ? '/icons/whiteDown.svg'
                    : '/icons/blackDown.svg';
            case '모달':
                return '/icons/blackDown.svg';
            case '정렬':
                return '/icons/sort.svg';
            default:
                return '/icons/blackDown.svg';
        }
    })();

    // 필터 타입만 placeholder가 메뉴에 들어가도록 (모달/정렬은 옵션만)
    const showPlaceholderInMenu = type === '필터';

    return (
        <div ref={dropdownRef} className={dropdownVariants.container({ type })}>
            <button
                className={dropdownVariants.button({
                    type,
                    active: Boolean(selected) && selected !== placeholder,
                })}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {type === '정렬' ? (
                    <>
                        <Image
                            src={iconSrc}
                            alt="icon"
                            width={100}
                            height={100}
                            className="w-5 h-5 object-contain"
                        />
                        <p
                            className={`${dropdownVariants.text({ type })} hidden md:block`}
                        >
                            {selected || placeholder}
                        </p>
                    </>
                ) : (
                    <>
                        <p
                            className={dropdownVariants.text({
                                type,
                                active:
                                    Boolean(selected) &&
                                    selected !== placeholder,
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
                    </>
                )}
            </button>

            {isOpen && (
                <ul className={dropdownVariants.menu({ type })}>
                    {showPlaceholderInMenu && (
                        <li
                            key="__placeholder__"
                            className={dropdownVariants.item({ type })}
                            onClick={() => handleSelect(placeholder!)}
                        >
                            <p className={dropdownVariants.itemText()}>
                                {placeholder}
                            </p>
                        </li>
                    )}
                    {options.map((option) => (
                        <li
                            key={option}
                            className={dropdownVariants.item({ type })}
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
