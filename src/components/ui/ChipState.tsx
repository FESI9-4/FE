import clsx from 'clsx';
import Image from 'next/image';

interface ChipStateProps {
    children: React.ReactNode;
    status?: 'schedule' | 'done' | 'complete' | 'waiting';
    check?: boolean;
}

export default function ChipState({
    children,
    status = 'schedule',
    check = false,
}: ChipStateProps) {
    const className = clsx(
        'px-3 py-1.5 rounded-3xl flex justify-center items-center text-sm font-medium',
        {
            'bg-orange-100 text-orange-600': status === 'schedule',
            'bg-gray-200 text-gray-500': status === 'done',
            'bg-white outline outline-1 outline-offset-[-1px]':
                status === 'complete' || status === 'waiting',
            'outline-orange-100 text-orange-500': status === 'complete',
            'outline-gray-200 text-gray-500': status === 'waiting',
            'gap-1': check,
        }
    );
    return (
        <div className={className}>
            {check && (
                <Image
                    src="/icons/check.svg"
                    alt="check"
                    width={16}
                    height={16}
                />
            )}
            <div className="flex justify-start items-center">{children}</div>
        </div>
    );
}
