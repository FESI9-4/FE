import { CheckIcon } from '@/assets';
import { cva } from 'class-variance-authority';

interface ProgressChipProps {
    // 이것도 api상에서는 3가지로만 주는데 4개로 받을건지, 아님 캔슬을 지울건지 얘기를 해 야할듯
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
                width={24}
                height={24}
                className={iconClassName({ openStatus })}
            />
        </div>
    );
}
