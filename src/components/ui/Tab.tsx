import { cva } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon: React.ReactNode;
    active: boolean;
}

export default function Tab({ children, icon, active, ...props }: TabProps) {
    const divClassName = cva(
        'flex items-center gap-1 font-semibold text-lg mx-1.5 justify-center',
        {
            variants: {
                active: {
                    true: 'text-white',
                    false: 'text-gray-600',
                },
            },
            defaultVariants: {
                active: false,
            },
        }
    );
    const hrClassName = cva('w-full h-0.5', {
        variants: {
            active: {
                true: 'bg-white',
                false: 'bg-gray-600',
            },
        },
        defaultVariants: {
            active: false,
        },
    });

    return (
        <button
            className="flex flex-col items-center gap-2 hover:cursor-pointer"
            {...props}
        >
            <div className={divClassName({ active })}>
                {children}
                {icon}
            </div>
            <div className={hrClassName({ active })} />
        </button>
    );
}
