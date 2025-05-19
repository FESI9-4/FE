import clsx from 'clsx';
import Image from 'next/image';

interface TabProps {
    children: React.ReactNode;
    icon?: 'do' | 'go';
    active?: boolean;
    onClick?: () => void;
}

export default function Tab({
    children,
    icon = 'do',
    active = false,
    onClick,
}: TabProps) {
    const className = clsx('flex items-center gap-1 font-semibold text-lg', {
        'text-gray-900': active,
        'text-gray-400': !active,
    });
    const iconClassName = active
        ? ''
        : 'invert-[70%] sepia-[5%] saturate-[578%] hue-rotate-[179deg] brightness-[92%] contrast-[92%]';

    return (
        <div
            className="flex items-center gap-1 flex-col hover:cursor-pointer"
            onClick={onClick}
        >
            <div className={className}>
                {children}
                <Image
                    src={`/icons/${icon}.svg`}
                    alt={icon}
                    width={24}
                    height={24}
                    className={iconClassName}
                />
            </div>
            {active && <hr className="w-full h-0.5 bg-gray-900 " />}
        </div>
    );
}
