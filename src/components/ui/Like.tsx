import { LikeIcon } from '@/assets';
import { ButtonHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn'; 

interface LikeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    like?: boolean;
    className?: string;
}

export default function Like({ like, onClick, className }: LikeProps) {
    const baseClass = cva('hover:cursor-pointer', {
        variants: {
            like: {
                true: 'text-green-400',
                false: 'text-gray-400',
                
            },
        },
        defaultVariants: {
            like: false,
        },
    });

    return (
        <button onClick={onClick}   className={cn(baseClass({ like }), className)}>
            <LikeIcon
                width={24}
                height={24}
                fill={like ? 'currentColor' : 'transparent'}
            />
        </button>
    );
}
