'use client';

import { ReactNode, useRef } from 'react';

interface BaseModalProps {
    onClose: () => void;
    children: ReactNode;
    fullScreenOnMobile?: boolean;
}

export default function BaseModal({
    onClose,
    children,
    fullScreenOnMobile = false,
}: BaseModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    //피그마 시안은 테블릿 이상부터 고정값인데... 높이가 너무 높아서 비율로 수정
    const modalClass = fullScreenOnMobile
        ? 'w-full h-full sm:w-130 sm:h-[90vh]'
        : '';

    return (
        <div
            className="fixed inset-0 bg-[#00000099] backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                ref={modalRef}
                className={`bg-gray-800 text-white rounded-xl overflow-hidden ${modalClass}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}
