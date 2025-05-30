'use client';

import { ReactNode, useRef } from 'react';

interface BaseModalProps {
    onClose: () => void;
    children: ReactNode;
}

export default function BaseModal({ onClose, children }: BaseModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className="fixed inset-0 bg-[#00000099] backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                ref={modalRef}
                className="rounded-xl bg-gray-800 text-white"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}
