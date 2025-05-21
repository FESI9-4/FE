'use client';

import { useState } from 'react';
import ModalProfile from '@/components/ui/ModalProfile';

export default function ModalTestPage() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleSubmit = () => {
        console.log('수정 완료!');
        setIsOpen(false);
    };

    return (
        <div className="text-3xl font-bold">
            <button onClick={handleOpen}>모달 열기</button>
            {isOpen && (
                <ModalProfile onClose={handleClose} onSubmit={handleSubmit} />
            )}
        </div>
    );
}
