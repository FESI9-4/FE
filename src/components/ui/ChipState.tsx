import { cva } from 'class-variance-authority';

interface ChipStateProps {
    children: React.ReactNode;
    status?: 'schedule' | 'done';
}

export default function ChipState({
    children,
    status = 'schedule',
}: ChipStateProps) {
    const className = cva(
        'px-2 py-1.5 rounded-3xl flex justify-center items-center text-xs font-semibold',
        {
            variants: {
                status: {
                    schedule: 'bg-green-500 text-black',
                    done: 'bg-gray-800 text-gray-400',
                },
            },
            defaultVariants: {
                status: 'schedule',
            },
        }
    );
    return <div className={className({ status })}>{children}</div>;
}
