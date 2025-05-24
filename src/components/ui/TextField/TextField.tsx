'use client';
import React, { HTMLAttributes, useEffect } from 'react';
import { useTextFieldStore } from '@/store/textfieldStore'; // ← 이거 추가!
import { cn } from '@/utils/cn';

export type ValidationResult = {
    isValid: boolean;
    message: string;
};
// 🔥 메인 컴포넌트 Props 타입
interface TextFieldProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    fieldName: string;
    value?: string;
    defaultValue?: string;
    onValidate?: (value: string) => ValidationResult;
}

export default function TextField({
    children,
    fieldName,
    className,
    ...mainProps
}: TextFieldProps) {
    const { initField, removeField } = useTextFieldStore();
    // 컴포넌트 마운트/언마운트 시 필드 관리
    useEffect(() => {
        initField(fieldName);
        return () => {
            removeField(fieldName);
        };
    }, [fieldName, initField, removeField]);
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ...((child.props as any) || {}),
                fieldName,
            });
        }
        return child;
    });
    return (
        <div className={cn('flex flex-col w-full', className)} {...mainProps}>
            {childrenWithProps}
        </div>
    );
}
