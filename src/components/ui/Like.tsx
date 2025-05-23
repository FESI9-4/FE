import { LikeIcon } from '@/assets';
import { ButtonHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';

interface LikeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    like?: boolean;
}

export default function Like({ like, onClick }: LikeProps) {
    const className = cva('hover:cursor-pointer', {
        variants: {
            like: {
                true: 'text-green-400',
                false: 'text-gray-400',
            },
        },
        defaultVariants: {
            like: true,
        },
    });

    return (
        <button onClick={onClick} className={className({ like })}>
            <LikeIcon
                width={24}
                height={24}
                fill={like ? 'currentColor' : 'transparent'}
            />
        </button>
    );
}
