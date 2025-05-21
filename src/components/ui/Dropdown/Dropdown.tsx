'use client';

import { useDropdown } from './useDropdown';
import { dropdownVariants } from './dropdownStyles';
import { SortIcon, BlackDownIcon, WhiteDownIcon } from '@/assets';

//TODO 피그마 시안이 바뀜... 아직 작업중이신 것도 있어보임 따라서  나중에 작업하려고 함.

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

    const IconComponent = (() => {
        switch (type) {
            case '필터':
                return (selected && selected !== placeholder) || isOpen
                    ? WhiteDownIcon
                    : BlackDownIcon;
            case '모달':
                return BlackDownIcon;
            case '정렬':
                return SortIcon;
            default:
                return BlackDownIcon;
        }
    })();

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
                        <IconComponent className="w-5 h-5" />
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
                        <IconComponent className="w-3 h-3" />
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
