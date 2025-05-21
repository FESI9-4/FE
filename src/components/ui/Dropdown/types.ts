export type DropdownProps = {
    options: string[];
    selected?: string;
    onSelect: (value: string) => void;
    placeholder?: string;
};
