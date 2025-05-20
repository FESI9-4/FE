'use client';

import Image from 'next/image';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/button';
import { useRef } from 'react';

interface ModalProfileProps {
    onClose: () => void;
    onSubmit: () => void;
}

export default function ModalProfile({ onClose, onSubmit }: ModalProfileProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div
                ref={modalRef}
                className="w-85.75 h-81 md:w-130 md:h-82 flex items-center justify-center rounded-xl bg-white"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-73.75 h-69 md:w-118 md:h-70 flex flex-col gap-8 md:gap-6">
                    <div className="flex justify-between h-7 w-full items-center">
                        <p className="text-lg font-semibold">프로필 수정하기</p>
                        <button
                            className="w-6 h-6 cursor-pointer"
                            onClick={onClose}
                        >
                            <Image
                                src="/icons/deleteIcon.svg"
                                alt="delete"
                                width={24}
                                height={24}
                            ></Image>
                        </button>
                    </div>
                    <div className="flex flex-col gap-3 md:gap-6 h-39 md:h-40">
                        <div>
                            <Image
                                src="/icons/profileEdit.svg"
                                alt="profileEdit"
                                width={56}
                                height={56}
                            ></Image>
                        </div>
                        <div className="h-19 md:h-20">
                            <p className="text-base font-semibold">회사</p>
                            <Input type="text" id="text"></Input>
                        </div>
                    </div>
                    <div className="flex gap-4 h-11">
                        <Button size="large" onClick={onClose}>
                            취소
                        </Button>
                        <Button size="large" onClick={onSubmit}>
                            수정하기
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
