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
        <div className="fixed inset-0 bg-[#00000099] backdrop-blur-sm flex items-center justify-center z-50">
            <div
                ref={modalRef}
                className="w-85.75 h-82 md:w-130 md:h-84 flex items-center justify-center rounded-xl bg-gray-800 text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-73.75 h-70 md:w-118 md:h-72 flex flex-col gap-6">
                    <div className="flex justify-between h-7 w-full items-center ">
                        <p className="text-lg font-semibold">프로필 수정하기</p>
                    </div>
                    <div className="flex flex-col gap-6 h-41 ">
                        <div>
                            <Image
                                src="/icons/profileEdit.svg"
                                alt="profileEdit"
                                width={64}
                                height={64}
                            ></Image>
                        </div>
                        <div className="h-19">
                            <p className="text-base font-semibold">닉네임</p>
                            <Input type="text" id="text"></Input>
                        </div>
                    </div>
                    <div className="flex gap-3 h-10 md:h-12">
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
