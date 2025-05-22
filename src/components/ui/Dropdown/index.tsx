'use client';

import clsx from 'clsx';
import { WhiteDownIcon, SortUpIcon, SortDownIcon } from '@/assets';
import { useDropdown } from './useDropdown';
import { dropdownVariants } from './dropdownStyles';

export type DropdownProps = {
    options: string[];
    selected?: string;
    onSelect: (value: string, order?: 'asc' | 'desc') => void;
    placeholder?: string;
    iconType?: 'sort' | 'arrow';
    showPlaceholderInMenu?: boolean;
};

export default function Dropdown({
    options,
    selected,
    onSelect,
    placeholder = '',
    iconType = 'arrow',
    showPlaceholderInMenu = false,
}: DropdownProps) {
    const {
        isOpen,
        sortOrder,
        dropdownRef,
        textColor,
        toggleDropdown,
        handleSelect,
        handleMouseDown,
        handleMouseUp,
        handleMouseLeave,
        handleOptionMouseEnter,
        handleOptionMouseLeave,
        getOptionState,
    } = useDropdown({
        selected,
        onSelect,
        placeholder,
        iconType,
    });

    const getIconComponent = () => {
        if (iconType === 'sort') {
            return sortOrder === 'desc' ? SortUpIcon : SortDownIcon;
        }
        return WhiteDownIcon;
    };

    const IconComponent = getIconComponent();

    return (
        <div ref={dropdownRef} className={dropdownVariants.container()}>
            <button
                className={clsx(
                    dropdownVariants.buttonBase({ iconType }),
                    textColor
                )}
                onClick={toggleDropdown}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                type="button"
            >
                {iconType === 'sort' && <IconComponent className="w-6 h-6" />}
                
                <span className={dropdownVariants.text({ iconType })}>
                    {selected || placeholder}
                </span>
                
                {iconType === 'arrow' && (
                    <IconComponent className={clsx('w-6 h-6 ml-2', textColor)} />
                )}
            </button>

            {isOpen && (
                <ul className={dropdownVariants.menu({ iconType })}>
                    {showPlaceholderInMenu && (
                        <li
                            key="__placeholder__"
                            className={dropdownVariants.itemText()}
                            onClick={() => handleSelect(placeholder)}
                            onMouseEnter={() => handleOptionMouseEnter(placeholder)}
                            onMouseLeave={handleOptionMouseLeave}
                        >
                            <div
                                className={dropdownVariants.itemInner({
                                    state: getOptionState(placeholder),
                                })}
                            >
                                {placeholder}
                            </div>
                        </li>
                    )}
                    
                    {options.map((option) => (
                        <li
                            key={option}
                            className={dropdownVariants.itemText()}
                            onClick={() => handleSelect(option)}
                            onMouseEnter={() => handleOptionMouseEnter(option)}
                            onMouseLeave={handleOptionMouseLeave}
                        >
                            <div
                                className={dropdownVariants.itemInner({
                                    state: getOptionState(option),
                                })}
                            >
                                {option}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
