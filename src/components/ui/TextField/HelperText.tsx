import { cn } from '@/utils/cn';
import { HTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import { useTextFieldStore } from '@/store/textfieldStore';
interface HelperTextProps extends HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
    name?: string;
    isShow?: boolean;
}
export const helperTextVariants = cva(
    [
        'pl-1 text-red-500 font-medium text-sm leading-5',
        'md:text-base md:leading-6 transition-all duration-300',
        'ease-in-out overflow-hidden mt-2',
    ],
    {
        variants: {
            isShow: {
                true: 'opacity-100 max-h-[44px] translate-y-0 text-red-500',
                false: 'opacity-0 max-h-0 translate-y-[-8px] pointer-events-none',
            },
        },
        defaultVariants: {
            isShow: false,
        },
    }
);
export default function TextFieldHelperText(props: HelperTextProps) {
    const { isShow, children, className, name, ...rest } = props;
    const field = useTextFieldStore((state) => state.getField(name || ''));
    const { validatedMessage, showHelperText } = field || {};
    return (
        <span
            data-name={name}
            className={cn(
                helperTextVariants({
                    isShow: isShow || showHelperText,
                }),
                className
            )}
            {...rest}
        >
            {children || validatedMessage}
        </span>
    );
}
