import clsx from 'clsx';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    size?: 'small' | 'large';
    disabled?: boolean;
    styled?: 'solid' | 'outline';
}

export default function Button({
    children,
    onClick,
    size = 'small',
    disabled = false,
    styled = 'solid',
}: ButtonProps) {
    const className = clsx(
        'rounded-full font-semibold flex justify-center items-center',
        {
            'w-28 text-sm py-2.5': size === 'small',
            'w-80 text-base py-3': size === 'large',
            'bg-green-400 text-black hover:bg-green-500 active:bg-green-600':
                !disabled && styled === 'solid',
            'outline outline-1 outline-offset-[-1px] outline-green-400 text-green-400 hover:outline-green-500 active:outline-green-600':
                !disabled && styled === 'outline',
            'bg-green-900 text-gray-900': disabled && styled === 'solid',
            'outline outline-1 outline-offset-[-1px] outline-green-900 text-green-900':
                disabled && styled === 'outline',
            'hover:cursor-pointer': !disabled,
        }
    );
    return (
        <button className={className} onClick={disabled ? undefined : onClick}>
            {children}
        </button>
    );
}
