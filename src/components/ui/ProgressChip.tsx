import { CheckIcon } from '@/assets';
import { cva } from 'class-variance-authority';

interface ProgressChipProps {
    openStatus:
        | 'CONFIRMED_STATUS'
        | 'PENDING_STATUS'
        | 'CANCELED_STATUS'
        | 'DEADLINE_STATUS';
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
                    PENDING_STATUS: 'text-[#fb923c]',
                    DEADLINE_STATUS: 'text-green-400',
                    CONFIRMED_STATUS: 'text-green-400',
                    CANCELED_STATUS: 'hidden',
                },
            },
            defaultVariants: {
                openStatus: 'PENDING_STATUS',
            },
        }
    );
    const iconClassName = cva('', {
        variants: {
            openStatus: {
                PENDING_STATUS: 'hidden',
                CONFIRMED_STATUS: 'text-black fill-green-500',
                DEADLINE_STATUS: 'fill-gray-900',
                CANCELED_STATUS: 'hidden',
            },
        },
        defaultVariants: {
            openStatus: 'PENDING_STATUS',
        },
    });
    return (
        <div className={textClassName({ openStatus })}>
            {children}
            <CheckIcon
                width={24}
                height={24}
                className={iconClassName({ openStatus })}
            />
        </div>
    );
}
