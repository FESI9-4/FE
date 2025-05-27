import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size?: 'small' | 'large';
    styled?: 'solid' | 'outline';
    className?: string;
}

export default function Button({
    children,
    size,
    styled,
    disabled,
    onClick,
    className,
    ...props
}: ButtonProps) {
    const buttonClassName = cva(
        'rounded-full font-semibold flex justify-center items-center w-full px-7',
        {
            variants: {
                size: {
                    small: 'text-sm py-2.5',
                    large: 'text-base py-3',
                },
                styled: {
                    solid: 'bg-green-400 text-black',
                    outline:
                        'outline outline-1 outline-offset-[-1px] outline-green-400 text-green-400 ',
                },
                disabled: {
                    true: '',
                    false: 'hover:cursor-pointer',
                },
            },
            compoundVariants: [
                {
                    styled: 'outline',
                    disabled: true,
                    className: 'outline-green-900 text-green-900',
                },
                {
                    styled: 'solid',
                    disabled: true,
                    className: 'bg-green-900 text-gray-900',
                },
                {
                    styled: 'outline',
                    disabled: false,
                    className:
                        'hover:outline-green-500 hover:outline-2 hover:outline-offset-[-2px] active:outline-green-700 active:bg-gray-900 active:outline-2 active:outline-offset-[-2px]',
                },
                {
                    styled: 'solid',
                    disabled: false,
                    className: 'hover:bg-green-500 active:bg-green-600',
                },
            ],
            defaultVariants: {
                size: 'small',
                styled: 'solid',
                disabled: false,
            },
        }
    );

    return (
        <button
            className={cn(
                buttonClassName({ size, styled, disabled }),
                className
            )}
            onClick={disabled ? undefined : onClick}
            {...props}
        >
            {children}
        </button>
    );
}
