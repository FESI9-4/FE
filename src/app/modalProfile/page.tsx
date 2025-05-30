'use client';

import { useState } from 'react';
import ModalProfile from '@/components/ui/Modal/ProfileModal';
import ModalPopup from '@/components/ui/Modal/LoginModal';
import ModalPassword from '@/components/ui/Modal/PasswordModal';

export default function ModalTestPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleSubmit = () => {
        console.log('수정 완료!');
        setIsOpen(false);
    };
    const handleOpen1 = () => setIsOpen1(true);
    const handleClose1 = () => setIsOpen1(false);
    const handleSubmit1 = () => {
        console.log('수정 완료!');
        setIsOpen(false);
    };
    const handleOpen2 = () => setIsOpen2(true);
    const handleClose2 = () => setIsOpen2(false);
    const handleSubmit2 = () => {
        console.log('수정 완료!');
        setIsOpen(false);
    };

    return (
        <div className="text-3xl font-bold flex gap-10 ">
            <button onClick={handleOpen}>모달 열기</button>
            {isOpen && (
                <ModalProfile onClose={handleClose} onSubmit={handleSubmit} />
            )}
            <button onClick={handleOpen1}>모달 열기2</button>
            {isOpen1 && (
                <ModalPopup onClose={handleClose1} onSubmit={handleSubmit1} />
            )}
            <button onClick={handleOpen2}>모달 열기3</button>
            {isOpen2 && (
                <ModalPassword onClose={handleClose2} onSubmit={handleSubmit2} />
            )}
        </div>
    );
}
