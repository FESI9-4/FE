import clsx from 'clsx';
import Image from 'next/image';

interface TagProps {
    children: React.ReactNode;
    size?: 'small' | 'large';
}

export default function Tag({ children, size = 'small' }: TagProps) {
    const className = clsx(
        'bg-orange-600  rounded-bl-xl flex gap-1 py-2 pl-3  justify-center items-center',
        size === 'small' && 'pr-2.5',
        size === 'large' && 'rounded-tr-2xl pr-4'
    );
    return (
        <div className={className}>
            <div className="w-4 h-4 relative">
                <Image src="/icons/alarm.svg" alt="tag" fill />
            </div>
            <div className=" text-white text-xs font-medium">{children}</div>
        </div>
    );
}
