'use client';

import { useState } from 'react';
import ModalProfile from '@/components/ui/Modal/ProfileModal';
import ModalPopup from '@/components/ui/Modal/LoginModal';
import ModalPassword from '@/components/ui/Modal/PasswordModal';
import ModalPanpal from '@/components/ui/Modal/PanpalModal';
import CustomTimeInput from '@/components/ui/CustomTimePicker';

export default function ModalTestPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleSubmit = () => {
        console.log('수정 완료!');
        setIsOpen(false);
    };

    const handleOpen1 = () => setIsOpen1(true);
    const handleClose1 = () => setIsOpen1(false);

    const handleOpen2 = () => setIsOpen2(true);
    const handleClose2 = () => setIsOpen2(false);
    const handleSubmit2 = () => {
        console.log('수정 완료!');
        setIsOpen(false);
    };

    const handleOpen3 = () => setIsOpen3(true);
    const handleClose3 = () => setIsOpen3(false);
    const handleSubmit3 = () => {
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
            {isOpen1 && <ModalPopup onClose={handleClose1} />}

            <button onClick={handleOpen2}>모달 열기3</button>
            {isOpen2 && (
                <ModalPassword
                    onClose={handleClose2}
                    onSubmit={handleSubmit2}
                />
            )}
            <button onClick={handleOpen3}>모달 열기4</button>
            {isOpen3 && (
                <ModalPanpal onClose={handleClose3} onSubmit={handleSubmit3} />
            )}
     
        </div>
    );
}
