import { cva, type VariantProps } from 'class-variance-authority';
import { LabelHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> &
    VariantProps<typeof LabelVariants>;
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
            className={cn(LabelVariants({ labelSize: labelSize }), className)}
            {...rest}
        >
            {children}
        </label>
    );
}
