import { cva } from 'class-variance-authority';

export const dropdownVariants = {
    container: cva(
        'relative flex items-center justify-center border rounded-lg',
        {
            variants: {
                type: {
                    모달: 'w-85.75 md:w-118 md:h-11 h-10 border-gray-50 bg-gray-50 rounded-xl',
                    필터: 'h-9 md:h-10 w-27.5 border-gray-200',
                    정렬: 'h-9 md:h-10 w-9 md:w-27.5 border-gray-200',
                },
                active: {
                    true: 'bg-black border-black',
                },
            },
            defaultVariants: {
                type: '모달',
                active: false,
            },
        }
    ),
    button: cva('h-6 flex items-center text-left', {
        variants: {
            type: {
                모달: 'w-77.75 md:w-110 justify-between',
                필터: 'w-21.5 justify-between',
                정렬: 'w-21.5 justify-center md:justify-between',
            },
            active: {
                true: 'bg-black text-white',
            },
        },
        defaultVariants: {
            type: '모달',
            active: false,
        },
    }),
    text: cva('text-sm font-medium', {
        variants: {
            active: {
                true: 'text-white',
                false: 'text-gray-700',
            },
            type: {
                모달: 'w-40 h-5 text-gray-400 md:text-base flex items-center',
                필터: '',
                정렬: '',
            },
        },
        defaultVariants: {
            active: false,
        },
    }),
    menu: cva(
        'absolute z-10 border rounded-lg shadow-md max-h-40 overflow-y-auto custom-scrollbar',
        {
            variants: {
                type: {
                    모달: 'top-13 left-0 bg-gray-800 text-white md:w-118 w-85.75 rounded-xl max-h-44 shadow-sm',
                    필터: 'top-12 left-0 bg-gray-800 text-white w-full',
                    정렬: 'top-12 left-0 bg-gray-800 text-white w-27.5 md:w-full',
                },
            },
        }
    ),
    item: cva('text-sm cursor-pointer flex items-center', {
        variants: {
            type: {
                모달: 'h-10 md:h-11 ml-2',
                필터: 'h-9 md:h-10 ml-1',
                정렬: 'h-9 md:h-10 px-1',
            },
        },
    }),
    itemText: cva('hover:bg-gray-700 w-110 h-9 rounded-lg pl-2 pt-1.5'),
    selectedItemText: cva('bg-gray-600'),
};
