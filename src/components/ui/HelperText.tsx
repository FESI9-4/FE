import { cva, VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

interface HelperTextProps
    extends HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof HelperTextVariants> {
    isError?: boolean;
}
const BASE_STYLE = `pl-1 text-red-500 font-medium text-sm leading-5 md:text-base md:leading-6
transition-all duration-300 ease-in-out overflow-hidden`;
export const HelperTextVariants = cva(BASE_STYLE, {
    variants: {
        isError: {
            true: 'opacity-100 max-h-[44px] translate-y-0',
            false: 'opacity-0 max-h-0 translate-y-[-8px] pointer-events-none',
        },
    },
    defaultVariants: {
        isError: false,
    },
});
export default function HelperText(props: HelperTextProps) {
    const { isError, children, ...rest } = props;

    return (
        <span className={HelperTextVariants({ isError })} {...rest}>
            {children}
        </span>
    );
}
