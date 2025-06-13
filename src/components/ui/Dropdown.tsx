'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cva } from 'class-variance-authority';
import { WhiteDownIcon, SortUpIcon, SortDownIcon } from '@/assets';
import { cn } from '@/utils/cn';
import CalendarOnly from '@/components/ui/CalendarOnly';

interface DropdownProps {
    options: string[];
    selected?: string;
    onSelect?: (value: string, order?: 'asc' | 'desc') => void;
    placeholder?: string;
    iconType?: 'sort' | 'arrow' | 'date' | 'comment';
    showPlaceholderInMenu?: boolean;
    className?: string;
    selectedDate?: Date | null | undefined;
    onDateChange?: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
    range?: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
    onRangeChange?: (start: Date | null, end: Date | null) => void;
}

const dropdownVariants = {
    container: cva('relative w-full'),

    buttonBase: cva(
        'flex items-center w-full rounded-md text-sm transition-colors duration-200 hover:text-gray-200 active:text-gray-400',
        {
            variants: {
                iconType: {
                    sort: 'justify-center md:justify-between gap-1 h-9 md:px-2.5 md:py-2',
                    arrow: 'justify-between px-4 py-2',
                    date: 'justify-between px-4 py-2',
                    comment: 'justify-between py-2',
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
                date: '',
                comment: '',
            },
        },
        defaultVariants: {
            iconType: 'arrow',
        },
    }),

    menu: cva(
        'absolute z-10 top-full mt-1 rounded-lg shadow-md bg-gray-800 text-white w-full overflow-y-auto max-h-50 md:max-h-70 custom-scrollbar min-w-27.5',
        {
            variants: {
                iconType: {
                    sort: '-left-18 md:left-0',
                    arrow: 'left-0',
                    date: 'left-0',
                    comment: '-left-18 sm:-left-6',
                },
            },
            defaultVariants: {
                iconType: 'arrow',
            },
        }
    ),

    itemText: cva(
        'w-full rounded-md cursor-pointer h-10 md:h-14 text-sm md:font-base flex items-center justify-center'
    ),

    itemInner: cva(
        'rounded-md transition-colors duration-200 flex items-center',
        {
            variants: {
                state: {
                    default: 'bg-transparent',
                    hover: 'bg-gray-700',
                    selected: 'bg-gray-600',
                },
                iconType: {
                    sort: 'w-[calc(100%-12px)] px-3 py-2 h-8 md:h-10',
                    arrow: 'w-[calc(100%-12px)] px-3 py-2 h-8 md:h-10',
                    date: 'w-[calc(100%-12px)] px-3 py-2 h-8 md:h-10',
                    comment: 'w-[calc(100%-12px)] px-5.5 py-2 h-8 sm:h-10',
                },
            },
            defaultVariants: {
                state: 'default',
                iconType: 'arrow',
            },
        }
    ),
};

function useDropdown({
    selected,
    onSelect,
    placeholder = '',
    iconType = 'arrow',
    selectedDate,
    onDateChange,
}: Required<
    Pick<
        DropdownProps,
        | 'selected'
        | 'onSelect'
        | 'placeholder'
        | 'iconType'
        | 'selectedDate'
        | 'onDateChange'
        | 'range'
        | 'startDate'
        | 'endDate'
        | 'onRangeChange'
    >
>) {
    const [isOpen, setIsOpen] = useState(false);
    const [hovered, setHovered] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const today = useRef(startDate).current;
    const endDay = useRef(endDate).current;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                closeDropdown();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const closeDropdown = () => {
        setIsOpen(false);
        setHovered(null);
    };

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (value: string) => {
        if (iconType === 'sort' && value === selected) {
            const newOrder = sortOrder === 'desc' ? 'asc' : 'desc';
            setSortOrder(newOrder);
            onSelect(value, newOrder);
        } else {
            setSortOrder('desc');
            onSelect(value, 'desc');
        }
        closeDropdown();
    };

    const handleDateConfirm = (date: Date | null) => {
        onDateChange?.(date);
        closeDropdown();
    };

    const handleRangeConfirm = (start: Date | null, end: Date | null) => {
        onRangeChange?.(start, end);
        closeDropdown();
    };

    const handleOptionMouseEnter = (option: string) => setHovered(option);
    const handleOptionMouseLeave = () => setHovered(null);

    const getTextColor = () => {
        if (iconType === 'date') {
            return selectedDate || startDate !== today || endDate !== endDay
                ? 'text-white'
                : 'text-gray-500';
        }
        if (!selected || selected === placeholder) return 'text-gray-500';
        return 'text-white';
    };

    const getDisplayText = () => {
        if (iconType === 'date') {
            if (selectedDate) {
                return `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;
            } else if (
                startDate &&
                endDate &&
                (startDate !== today || endDate !== endDay)
            ) {
                return `${startDate.getMonth() + 1}월 ${startDate.getDate()}일 ~ ${endDate.getMonth() + 1}월 ${endDate.getDate()}일`;
            }
            return placeholder;
        }
        return selected || placeholder;
    };

    const getOptionState = useCallback(
        (option: string): 'default' | 'hover' | 'selected' => {
            if (selected === option) return 'selected';
            if (hovered === option) return 'hover';
            return 'default';
        },
        [selected, hovered]
    );

    return {
        isOpen,
        sortOrder,
        dropdownRef,
        textColor: getTextColor(),
        displayText: getDisplayText(),
        toggleDropdown,
        closeDropdown,
        handleSelect,
        handleDateConfirm,
        handleRangeConfirm,
        handleOptionMouseEnter,
        handleOptionMouseLeave,
        getOptionState,
    };
}

export default function Dropdown({
    options,
    selected,
    onSelect,
    placeholder = '',
    iconType = 'arrow',
    showPlaceholderInMenu = true,
    className,
    selectedDate,
    onDateChange,
    minDate,
    maxDate,
    range = false,
    startDate,
    endDate,
    onRangeChange,
}: DropdownProps) {
    const {
        isOpen,
        sortOrder,
        dropdownRef,
        textColor,
        displayText,
        toggleDropdown,
        closeDropdown,
        handleSelect,
        handleDateConfirm,
        handleRangeConfirm,
        handleOptionMouseEnter,
        handleOptionMouseLeave,
        getOptionState,
    } = useDropdown({
        selected,
        onSelect: onSelect ?? (() => {}),
        placeholder,
        iconType,
        selectedDate,
        onDateChange,
        onRangeChange,
        startDate,
        endDate,
    });

    const IconComponent = (() => {
        if (iconType === 'sort')
            return sortOrder === 'desc' ? SortUpIcon : SortDownIcon;
        if (iconType === 'comment') return null;
        return WhiteDownIcon;
    })();

    const renderDatePicker = () => (
        <div className="absolute z-10 top-full mt-1 ml-[-60px] sm:ml-0">
            <CalendarOnly
                selectedDate={selectedDate || null}
                onChange={onDateChange ?? (() => {})}
                onConfirm={range ? handleRangeConfirm : handleDateConfirm}
                minDate={minDate}
                maxDate={maxDate}
                range={range}
                startDate={startDate}
                endDate={endDate}
                onRangeChange={onRangeChange}
                onReset={closeDropdown}
            />
        </div>
    );

    const renderRegularDropdown = () => (
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
                            iconType,
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
                            iconType,
                        })}
                    >
                        {option}
                    </div>
                </li>
            ))}
        </ul>
    );

    return (
        <div
            ref={dropdownRef}
            className={cn(dropdownVariants.container(), className)}
        >
            <button
                className={cn(
                    dropdownVariants.buttonBase({ iconType }),
                    textColor
                )}
                onClick={toggleDropdown}
                type="button"
            >
                {iconType === 'sort' && IconComponent && (
                    <IconComponent className="w-6 h-6" />
                )}
                {iconType === 'comment' ? (
                    <div className="text-sm text-white">⋮</div>
                ) : (
                    <span className={dropdownVariants.text({ iconType })}>
                        {displayText}
                    </span>
                )}
                {(iconType === 'arrow' || iconType === 'date') &&
                    IconComponent && (
                        <IconComponent
                            className={cn('w-6 h-6 ml-2', textColor)}
                        />
                    )}
            </button>
            {isOpen &&
                (iconType === 'date'
                    ? renderDatePicker()
                    : renderRegularDropdown())}
        </div>
    );
}
