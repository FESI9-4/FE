import clsx from 'clsx';

interface TapProps {
    children: React.ReactNode;
    size?: 'small' | 'large';
    status?: 'default' | 'active';
}

export default function Tap({
    children,
    size = 'small',
    status = 'default',
}: TapProps) {
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
    return <div className={className}>{children}</div>;
}
