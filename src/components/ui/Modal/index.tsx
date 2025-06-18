'use client';

import { ReactNode, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

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

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const modalClass = fullScreenOnMobile
        ? 'w-full h-full sm:w-130 sm:h-[784px] xl:h-[784px]'
        : '';
    const modalRoot =
        typeof window !== 'undefined'
            ? document.getElementById('modal-root')
            : null;

    if (!modalRoot) return null;

    return createPortal(
        <div
            className="fixed inset-0 bg-[#00000099] backdrop-blur-sm flex items-center justify-center z-54"
            onClick={onClose}
        >
            <div
                ref={modalRef}
                className={`bg-gray-800 text-white rounded-xl overflow-hidden ${modalClass}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        modalRoot
    );
}
