import { CheckIcon } from '@/assets';
import { cva } from 'class-variance-authority';

interface ProgressChipProps {
    openStatus: 'waiting' | 'finished' | 'progressing' | 'canceled';
    children: React.ReactNode;
}

export default function ProgressChip({
    openStatus,
    children,
}: ProgressChipProps) {
    const textClassName = cva(
        'flex gap-0.5 items-center justify-center font-medium text-sm',
        {
            variants: {
                openStatus: {
                    waiting: 'text-[#fb923c]',
                    finished: 'text-green-400',
                    progressing: 'text-green-400',
                    canceled: 'hidden',
                },
            },
            defaultVariants: {
                openStatus: 'waiting',
            },
        }
    );
    const iconClassName = cva('', {
        variants: {
            openStatus: {
                waiting: 'hidden',
                finished: 'text-black fill-green-500',
                progressing: 'fill-gray-900',
                canceled: 'hidden',
            },
        },
        defaultVariants: {
            openStatus: 'waiting',
        },
    });
    return (
        <div className={textClassName({ openStatus })}>
            {children}
            <CheckIcon
                width={16}
                height={16}
                className={iconClassName({ openStatus })}
            />
        </div>
    );
}
