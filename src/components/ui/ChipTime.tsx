import clsx from 'clsx';

interface ChipTimeProps {
    children: React.ReactNode;
    status?: 'active' | 'inactive' | 'disabled';
}

export default function ChipTime({
    children,
    status = 'active',
}: ChipTimeProps) {
    const className = clsx(
        'rounded-lg px-3 py-1.5 text-sm font-medium flex justify-center items-center',
        {
            'bg-gray-50 text-gray-900 outline outline-1 outline-gray-200 outline-offset-[-1px]':
                status === 'active',
            'bg-gray-900 text-white': status === 'inactive',
            'bg-gray-200 text-gray-400': status === 'disabled',
        }
    );
    return <div className={className}>{children}</div>;
}
