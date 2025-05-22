import { cva } from 'class-variance-authority';

export const dropdownVariants = {
    container: cva('relative w-full'),

    buttonBase: cva(
        'flex items-center w-full rounded-md text-sm transition-colors duration-200hover:text-gray-200',
        {
            variants: {
                iconType: {
                    sort: 'justify-center md:justify-between gap-1 h-9 md:px-2.5 md:py-2 ',
                    arrow: 'justify-between px-4 py-2',
                },
            },
            defaultVariants: {
                iconType: 'arrow',
            },
        }
    ),

    text: cva('truncate', {
        variants: {
            iconType: {
                sort: 'hidden md:inline',
                arrow: '',
            },
        },
        defaultVariants: {
            iconType: 'arrow',
        },
    }),

    menu: cva(
        `absolute z-10 top-full mt-1 rounded-lg shadow-md bg-gray-800 text-white w-full overflow-y-auto 
   max-h-50 md:max-h-70 custom-scrollbar min-w-27.5`,
        {
            variants: {
                iconType: {
                    sort: '-left-18 md:left-0',
                    arrow: 'left-0',
                },
            },
            defaultVariants: {
                iconType: 'arrow',
            },
        }
    ),

    itemText: cva(
        'w-full rounded-md cursor-pointer h-10 md:h-14 text-sm md:font-base flex items-center justify-center'
    ),

    itemInner: cva(
        'w-[calc(100%-12px)] px-3 py-2 h-8 md:h-10 rounded-md transition-colors duration-200 flex items-center',
        {
            variants: {
                state: {
                    default: 'bg-transparent',
                    hover: 'bg-gray-700',
                    selected: 'bg-gray-600',
                },
            },
            defaultVariants: {
                state: 'default',
            },
        }
    ),
};
