'use client';

import { useRef, useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { WhiteDownIcon, SortUpIcon, SortDownIcon } from '@/assets';

export type DropdownProps = {
    options: string[];
    selected?: string;
    onSelect: (value: string, order?: 'asc' | 'desc') => void;
    placeholder?: string;
    iconType?: 'sort' | 'arrow';
    showPlaceholderInMenu?: boolean;
};

const dropdownVariants = {
    container: cva('relative w-full'),
    buttonBase: cva(
        'flex items-center w-full rounded-md text-sm transition-colors duration-200 ' +
            'text-white hover:text-gray-200',
        {
            variants: {
                iconType: {
                    sort: 'justify-center md:justify-between gap-1 h-9 md:px-2.5 md:py-2 ',
                    arrow: 'justify-between px-4 py-2',
                },
            },
            defaultVariants: {
                iconType: 'arrow',
            },
        }
    ),
    text: cva('truncate', {
        variants: {
            iconType: {
                sort: 'hidden md:inline',
                arrow: '',
            },
        },
        defaultVariants: {
            iconType: 'arrow',
        },
    }),
    menu: cva(
        `absolute z-10 top-full mt-1 left-0 rounded-lg shadow-md bg-gray-800 text-white w-full overflow-y-auto 
         max-h-50 md:max-h-70 custom-scrollbar min-w-27.5`
    ),

    itemText: cva(
        'w-full rounded-md cursor-pointer h-10 md:h-14 text-sm md:font-base flex items-center justify-center'
    ),
    itemInner: cva(
        'w-[calc(100%-12px)] px-3 py-2 h-8 md:h-10 rounded-md transition-colors duration-200 flex items-center',
        {
            variants: {
                state: {
                    default: 'bg-transparent',
                    hover: 'bg-gray-700',
                    selected: 'bg-gray-600',
                },
            },
            defaultVariants: {
                state: 'default',
            },
        }
    ),
};

function getColorClassForSort(state: 'default' | 'pressed') {
    switch (state) {
        case 'pressed':
            return 'text-gray-400';
        default:
            return 'text-white';
    }
}

const getTextColor = (selected: string | undefined, placeholder: string) => {
    if (!selected || selected === placeholder) return 'text-gray-500';
    return 'text-white';
};

export default function Dropdown({
    options,
    selected,
    onSelect,
    placeholder = '',
    iconType = 'arrow',
    showPlaceholderInMenu = false,
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
                setIsPressed(false);
                setHoveredOption(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value: string) => {
        if (iconType === 'sort' && value === selected) {
            const newOrder = sortOrder === 'desc' ? 'asc' : 'desc';
            setSortOrder(newOrder);
            onSelect(value, newOrder);
        } else {
            setSortOrder('desc');
            onSelect(value, 'desc');
        }
        setIsOpen(false);
        setIsPressed(false);
        setHoveredOption(null);
    };

    const buttonState: 'default' | 'pressed' = isPressed
        ? 'pressed'
        : 'default';

    const colorClass =
        iconType === 'sort'
            ? getColorClassForSort(buttonState)
            : getTextColor(selected, placeholder);

    let IconComponent;
    if (iconType === 'sort') {
        IconComponent = sortOrder === 'desc' ? SortUpIcon : SortDownIcon;
    } else {
        IconComponent = WhiteDownIcon;
    }

    return (
        <div ref={dropdownRef} className={dropdownVariants.container()}>
            <button
                className={`${dropdownVariants.buttonBase({ iconType })} ${colorClass}`}
                onClick={() => setIsOpen((prev) => !prev)}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => {
                    setIsPressed(false);
                }}
                type="button"
            >
                {iconType === 'sort' && <IconComponent className="w-6 h-6" />}
                <span className={`${dropdownVariants.text({ iconType })}`}>
                    {selected || placeholder}
                </span>
                {iconType === 'arrow' && (
                    <IconComponent className={`w-6 h-6 ml-2 ${colorClass}`} />
                )}
            </button>

            {isOpen && (
                <ul className={dropdownVariants.menu()}>
                    {showPlaceholderInMenu && (
                        <li
                            key="__placeholder__"
                            className={dropdownVariants.itemText()}
                            onClick={() => handleSelect(placeholder)}
                            onMouseEnter={() => setHoveredOption(placeholder)}
                            onMouseLeave={() => setHoveredOption(null)}
                        >
                            <div
                                className={dropdownVariants.itemInner({
                                    state:
                                        selected === placeholder
                                            ? 'selected'
                                            : hoveredOption === placeholder
                                              ? 'hover'
                                              : 'default',
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
                            onMouseEnter={() => setHoveredOption(option)}
                            onMouseLeave={() => setHoveredOption(null)}
                        >
                            <div
                                className={dropdownVariants.itemInner({
                                    state:
                                        selected === option
                                            ? 'selected'
                                            : hoveredOption === option
                                              ? 'hover'
                                              : 'default',
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
