import { cva } from 'class-variance-authority';

interface ChipStateProps {
    children: React.ReactNode;
    status?: 'UPCOMING' | 'COMPLETED';
}

export default function ChipState({
    children,
    status = 'UPCOMING',
}: ChipStateProps) {
    const className = cva(
        'px-2 py-1.5 rounded-3xl flex justify-center items-center text-xs font-semibold',
        {
            variants: {
                status: {
                    UPCOMING: 'bg-green-500 text-black',
                    COMPLETED: 'bg-gray-800 text-gray-400',
                },
            },
            defaultVariants: {
                status: 'UPCOMING',
            },
        }
    );
    return <div className={className({ status })}>{children}</div>;
}
