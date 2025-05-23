import { cva } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size?: 'small' | 'large';
    styled?: 'default' | 'secondary' | 'outline' | 'none';
}

export default function Chip({ children, size, styled, ...props }: ChipProps) {
    const className = cva(
        'rounded-full flex justify-center items-center font-semibold hover:cursor-pointer',
        {
            variants: {
                size: {
                    large: 'px-4 py-2.5 text-base',
                    small: 'px-3 py-2 text-sm',
                },
                styled: {
                    default: 'bg-gray-800 text-white',
                    secondary: 'bg-green-400 text-black',
                    outline:
                        'bg-transparent outline-1 outline-offset-[-1px] outline-gray-600 text-gray-300',
                    none: 'bg-transparent text-gray-400',
                },
            },
            defaultVariants: {
                size: 'small',
                styled: 'default',
            },
        }
    );
    return (
        <button className={className({ size, styled })} {...props}>
            {children}
        </button>
    );
}
