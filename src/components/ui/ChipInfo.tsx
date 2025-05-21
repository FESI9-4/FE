import clsx from 'clsx';

interface ChipInfoProps {
    children: React.ReactNode;
    variant?: boolean;
}

export default function ChipInfo({ children, variant = false }: ChipInfoProps) {
    const className = clsx(
        'px-2 py-0.5 bg-gray-900 rounded font-medium text-sm flex justify-center items-center',
        {
            'text-white': variant === false,
            'text-orange-600': variant === true,
        }
    );
    return <div className={className}>{children}</div>;
}
