import clsx from 'clsx';
import Image from 'next/image';

interface PaginationButtonProps {
    currentPage: number;
    totalPages: number;
    size: 'small' | 'large';
    onClick: (page: number) => void;
}

export default function PaginationButton({
    currentPage,
    totalPages,
    size = 'small',
    onClick,
}: PaginationButtonProps) {
    const ButtonClassName = clsx(
        'p-2.5 bg-white flex justify-center items-center p-2.5 font-semibold text-stone-300 hover:cursor-pointer',
        currentPage === 1 && 'text-stone-900',
        {
            'w-8 h-8 rounded-lg text-sm': size === 'small',
            'w-12 h-12 rounded-md text-base': size === 'large',
        }
    );
    const ContainerClassName = clsx('flex', {
        'gap-2': size === 'small',
        'gap-2.5': size === 'large',
    });
    return (
        <div className={ContainerClassName}>
            <div className={ButtonClassName}>
                <div className="relative w-6 h-6">
                    <Image src="/icons/leftArrow.svg" alt="left" fill />
                </div>
            </div>
            <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                    <div
                        key={i + 1}
                        className={ButtonClassName}
                        onClick={() => onClick(i + 1)}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            <div className={ButtonClassName}>
                <div className="relative w-6 h-6">
                    <Image src="/icons/rightArrow.svg" alt="right" fill />
                </div>
            </div>
        </div>
    );
}
