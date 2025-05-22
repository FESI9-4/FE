import { cva } from 'class-variance-authority';

interface ChipProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size?: 'small' | 'large';
    active?: boolean;
    styled?: 'solid' | 'outline';
}

export default function Chip({
    children,
    size,
    active,
    styled,
    ...props
}: ChipProps) {
    const className = cva(
        'rounded-full flex justify-center items-center font-semibold hover:cursor-pointer',
        {
            variants: {
                size: {
                    large: 'px-4 py-2.5 text-base',
                    small: 'px-3 py-2 text-sm',
                },
                styled: {
                    solid: 'bg-gray-800',
                    outline: 'bg-green-400',
                },
                active: {
                    false: 'bg-transparent',
                    true: '',
                },
            },
            compoundVariants: [
                {
                    active: false,
                    styled: 'outline',
                    className: 'text-gray-300 outline-1 outline-gray-600',
                },
                {
                    active: false,
                    styled: 'solid',
                    className: 'text-gray-400',
                },
                {
                    active: true,
                    styled: 'outline',
                    className: 'bg-green-400 text-black',
                },
                {
                    active: true,
                    styled: 'solid',
                    className: 'bg-gray-800 text-white',
                },
            ],
            defaultVariants: {
                size: 'small',
                styled: 'solid',
                active: false,
            },
        }
    );
    return (
        <button className={className({ size, styled, active })} {...props}>
            {children}
        </button>
    );
}
