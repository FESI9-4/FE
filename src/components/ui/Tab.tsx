import { cva } from 'class-variance-authority';

interface TabProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon: React.ReactNode;
    active: boolean;
}

export default function Tab({ children, icon, active, ...props }: TabProps) {
    const buttonClassName = cva(
        'flex items-center gap-1 font-semibold text-lg hover:cursor-pointer mx-1.5',
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
        <div className="flex flex-col items-center gap-2 ">
            <button className={buttonClassName({ active })} {...props}>
                {children}
                {icon}
            </button>
            <div className={hrClassName({ active })}></div>
        </div>
    );
}
