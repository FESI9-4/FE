'use client';

import BaseModal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { DeleteIcon } from '@/assets/index';
import Input from '@/components/ui/Input';

interface PanpalModalProps {
    onClose: () => void;
    onSubmit: () => void;
}

//TODO INPUT PR 머지 후 교체 및 컴포넌트 들어오면 완성

export default function PanpalModal({ onClose, onSubmit }: PanpalModalProps) {
    return (
        <BaseModal onClose={onClose} fullScreenOnMobile>
            <div className="w-full h-[100vh] flex items-center justify-center">
                <div className="relative w-full max-w-130 h-full m-4 flex flex-col">
                    <div className="flex justify-between items-center px-4 pt-4  h-[50px] text-lg font-semibold z-10">
                        <p>팬팔 만들기</p>
                        <DeleteIcon
                            className="cursor-pointer"
                            onClick={onClose}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto sm:max-h-[57vh] lg:max-h-[66vh] px-4 mt-6 flex flex-col gap-6">
                        <div>
                            <p className="text-sm font-semibold">팬팔 이름</p>
                            <Input type="text" id="text"></Input>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">상세 내용</p>
                            <Input type="text" id="text"></Input>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">장소</p>
                            <Input type="text" id="text"></Input>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">이미지</p>
                            <Input type="text" id="text"></Input>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">상세 내용</p>
                            <Input type="text" id="text"></Input>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">상세 내용</p>
                            <Input type="text" id="text"></Input>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">상세 내용</p>
                            <Input type="text" id="text"></Input>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">상세 내용</p>
                            <Input type="text" id="text"></Input>
                        </div>
                    </div>

                    <div className="px-4 py-3 z-10 flex justify-center">
                        <Button size="large" onClick={onSubmit}>
                            팬팔 만들기
                        </Button>
                    </div>
                </div>
            </div>
        </BaseModal>
    );
}
