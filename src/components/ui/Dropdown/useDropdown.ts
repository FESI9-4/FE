import { useState, useRef, useEffect } from 'react';

export type UseDropdownProps = {
    selected?: string;
    onSelect: (value: string, order?: 'asc' | 'desc') => void;
    placeholder?: string;
    iconType?: 'sort' | 'arrow';
};

export function useDropdown({
    selected,
    onSelect,
    placeholder = '',
    iconType = 'arrow',
}: UseDropdownProps) {
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
                closeDropdown();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const closeDropdown = () => {
        setIsOpen(false);
        setIsPressed(false);
        setHoveredOption(null);
    };

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

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

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsPressed(false);

    const handleOptionMouseEnter = (option: string) => setHoveredOption(option);
    const handleOptionMouseLeave = () => setHoveredOption(null);

    const buttonState: 'default' | 'pressed' = isPressed
        ? 'pressed'
        : 'default';

    const getTextColor = () => {
        if (iconType === 'sort') {
            return buttonState === 'pressed' ? 'text-gray-400' : 'text-white';
        }
        if (!selected || selected === placeholder) return 'text-gray-500';
        
        return 'text-white';
    };

    const getOptionState = (
        option: string
    ): 'default' | 'hover' | 'selected' => {
        if (selected === option) return 'selected';
        if (hoveredOption === option) return 'hover';
        return 'default';
    };

    return {
        isOpen,
        sortOrder,
        hoveredOption,
        dropdownRef,
        buttonState,
        textColor: getTextColor(),
        toggleDropdown,
        handleSelect,
        handleMouseDown,
        handleMouseUp,
        handleMouseLeave,
        handleOptionMouseEnter,
        handleOptionMouseLeave,
        getOptionState,
    };
}
