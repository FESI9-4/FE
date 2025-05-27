import { LabelHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { LabelSize } from '@/store/textfieldStore';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
    name?: string;
    labelSize?: LabelSize;
}
export const labelVariants = cva('whitespace-nowrap', {
    variants: {
        labelSize: {
            small: 'text-sm leading-5 text-white mb-2',
            large: 'text-base leading-6 text-white mb-3',
        },
    },
    defaultVariants: {
        labelSize: 'large',
    },
});
export default function Label(props: LabelProps) {
    const { className, labelSize, children, name, ...rest } = props;
    return (
        <label
            htmlFor={name}
            className={cn(labelVariants({ labelSize: labelSize }), className)}
            {...rest}
        >
            {children}
        </label>
    );
}
