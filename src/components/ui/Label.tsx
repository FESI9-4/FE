import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
interface LabelProps
    extends HTMLAttributes<HTMLLabelElement>,
        VariantProps<typeof LabelVariants> {}
// 레이블 스타일
export const LabelVariants = cva('', {
    variants: {
        labelSize: {
            small: `text-sm leading-5 text-white mb-2`,
            large: `text-base leading-6 text-white mb-3`,
        },
    },
    defaultVariants: {
        labelSize: 'small',
    },
});
export default function Label(props: LabelProps) {
    const { className, labelSize, children, ...rest } = props;
    return (
        <label
            className={cn(LabelVariants({ labelSize }), className)}
            {...rest}
        >
            {children}
        </label>
    );
}
