import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
export type HelperTextProps = HTMLAttributes<HTMLSpanElement> &
    VariantProps<typeof HelperTextVariants>;

const BASE_STYLE = `pl-1 text-red-500 font-medium text-sm leading-5 md:text-base md:leading-6
    transition-all duration-300 ease-in-out overflow-hidden mt-2`;

export const HelperTextVariants = cva(BASE_STYLE, {
    variants: {
        isShow: {
            true: 'opacity-100 max-h-[44px] translate-y-0 text-red-500',
            false: 'opacity-0 max-h-0 translate-y-[-8px] pointer-events-none',
        },
    },
    defaultVariants: {
        isShow: false,
    },
});
export default function HelperText(props: HelperTextProps) {
    const { isShow, children, className, ...rest } = props;
    return (
        <span
            className={cn(HelperTextVariants({ isShow }), className)}
            {...rest}
        >
            {children}
        </span>
    );
}
