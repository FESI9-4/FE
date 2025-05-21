import clsx from 'clsx';

interface ChipProps {
    children: React.ReactNode;
    size?: 'small' | 'large';
    status?: 'default' | 'active';
    onClick?: () => void;
}

export default function Chip({
    children,
    size = 'small',
    status = 'default',
    onClick,
}: ChipProps) {
    const className = clsx(
        'rounded-xl flex justify-center items-center text-sm font-medium hover:cursor-pointer',
        {
            'px-4 py-2.5': size === 'large',
            'px-3 py-2': size === 'small',
        },
        {
            'bg-gray-200 text-gray-900': status === 'default',
            'bg-gray-900 text-white': status === 'active',
        }
    );
    return (
        <div className={className} onClick={onClick}>
            {children}
        </div>
    );
}
