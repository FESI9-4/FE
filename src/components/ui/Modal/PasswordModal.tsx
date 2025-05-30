'use client';

import BaseModal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface PasswordModalProps {
    onClose: () => void;
    onSubmit: () => void;
}

export default function PasswordModal({
    onClose,
    onSubmit,
}: PasswordModalProps) {
    return (
        <BaseModal onClose={onClose}>
            <div className="w-85.75 h-115 md:w-130 md:h-118 flex items-center justify-center">
                <div className="w-73.75 h-103 md:w-118 md:h-106 flex flex-col justify-between">
                    <div className="h-81 md:h-84 flex flex-col justify-between">
                        <p className="h-7 text-base font-semibold">
                            비밀번호 변경하기
                        </p>
                        <div className="h-66 flex flex-col justify-between text-sm font-semibold md:font-base">
                            <div className="h-18">
                                <p>현재 비밀번호</p>
                                <Input type="password" id="password" placeholder='현재 비밀번호를 입력해주세요.'></Input>
                            </div>
                            <div className="h-18">
                                <p>새 비밀번호</p>
                                <Input type="password" id="password" placeholder='새 비밀번호를 입력해주세요.'></Input>
                            </div>
                            <div className="h-18">
                                <p>비밀번호 확인</p>
                                <Input type="password" id="password" placeholder='새 비밀번호를 다시 입력해주세요.'></Input>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 h-10 md:h-12">
                        <Button size="large" onClick={onClose} styled="outline">
                            취소
                        </Button>
                        <Button size="large" onClick={onSubmit} styled="solid">
                            수정하기
                        </Button>
                    </div>
                </div>
            </div>
        </BaseModal>
    );
}
