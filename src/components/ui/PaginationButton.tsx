import { LeftArrowIcon, RightArrowIcon } from '@/assets';
import { cva } from 'class-variance-authority';

interface PaginationButtonProps {
    size?: 'small' | 'large';
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationButton({
    size,
    currentPage,
    totalPages,
    onPageChange,
}: PaginationButtonProps) {
    const textClassName = cva(
        'flex items-center justify-center hover:cursor-pointer',
        {
            variants: {
                currentPage: {
                    true: 'text-white font-semibold',
                    false: 'text-gray-600 font-normal',
                },
                size: {
                    small: 'w-8 h-8',
                    large: 'w-10 h-10',
                },
            },
            compoundVariants: [
                {
                    currentPage: true,
                    size: 'small',
                    className: 'text-2xl',
                },
                {
                    currentPage: true,
                    size: 'large',
                    className: 'text-3xl',
                },
                {
                    currentPage: false,
                    size: 'small',
                    className: ' text-sm ',
                },
                {
                    currentPage: false,
                    size: 'large',
                    className: ' text-lg ',
                },
            ],
        }
    );
    const ArrowButtonClassName = cva(
        'flex items-center justify-center w-6 h-6 hover:cursor-pointer',
        {
            variants: {
                disabled: {
                    true: 'text-gray-700',
                    false: 'text-white',
                },
            },
        }
    );

    function getPageList(currentPage: number, totalPages: number) {
        const pages: (number | string)[] = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }
        if (currentPage <= 3) {
            for (let i = 1; i <= 5; i++) pages.push(i);
            pages.push('⋯');
            pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(1);
            pages.push('⋯');
            for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            pages.push('⋯');
            for (let i = currentPage - 1; i <= currentPage + 1; i++)
                pages.push(i);
            pages.push('⋯');
            pages.push(totalPages);
        }
        return pages;
    }

    return (
        <div className="flex items-center gap-2.5 text-white justify-center">
            <button
                className={ArrowButtonClassName({
                    disabled: currentPage === 1,
                })}
                onClick={
                    currentPage > 1
                        ? () => onPageChange(currentPage - 1)
                        : undefined
                }
            >
                <LeftArrowIcon />
            </button>
            <div className="flex items-center justify-center">
                {getPageList(currentPage, totalPages).map((page, idx) =>
                    page === '⋯' ? (
                        <div
                            key={idx}
                            className={textClassName({
                                currentPage: false,
                                size,
                            })}
                        >
                            ⋯
                        </div>
                    ) : (
                        <button
                            key={idx}
                            className={textClassName({
                                currentPage: page === currentPage,
                                size,
                            })}
                            onClick={() => onPageChange(Number(page))}
                            disabled={page === currentPage}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>
            <button
                className={ArrowButtonClassName({
                    disabled: currentPage === totalPages,
                })}
                onClick={
                    currentPage < totalPages
                        ? () => onPageChange(currentPage + 1)
                        : undefined
                }
            >
                <RightArrowIcon />
            </button>
        </div>
    );
}
