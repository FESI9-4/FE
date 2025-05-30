'use client';

import BaseModal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { DeleteIcon } from '@/assets/index';
import PlaceAutoCompleteInput from './PlaceAutoCompleteInput';

interface PanpalModalProps {
    onClose: () => void;
    onSubmit: () => void;
}


//TODO INPUT PR 머지 후 교체 및 컴포넌트 들어오면 완성 input높이 40px..
//TODO 폼으로 감싸고 폼제출시 위도경도 보내주기 ?

export default function PanpalModal({ onClose, onSubmit }: PanpalModalProps) {

    return (
        <BaseModal onClose={onClose} fullScreenOnMobile>
            <div className="w-full h-[100vh] flex items-center justify-center">
                <div className="relative w-full max-w-130 h-full m-4 flex flex-col  ">
                    <div className="flex justify-between items-center px-4 pt-6  h-[50px] text-lg font-semibold z-10">
                        <p>팬팔 만들기</p>
                        <DeleteIcon
                            className="cursor-pointer"
                            onClick={onClose}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto sm:max-h-[75vh] lg:max-h-[68vh] px-4 mt-6 flex flex-col gap-6">
                        <div className="flex flex-col gap-2 h-19">
                            <p className="text-sm font-semibold h-6">
                                팬팔 이름
                            </p>
                            <div className="w-full h-10 bg-amber-100 rounded-xl text-black">
                                인풋 대체
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 h-35.5">
                            <p className="text-sm font-semibold">상세 내용</p>
                            <div className="w-full h-10 bg-amber-100 rounded-xl text-black">
                                인풋 대체
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 h-18 ">
                            <p className="text-sm font-semibold h-6">장소</p>
                            <PlaceAutoCompleteInput />
                        </div>
                        <div className="flex h-24 flex-col ">
                            <div className="flex flex-col gap-2  h-18">
                                <p className="text-sm font-semibold h-6">
                                    이미지
                                </p>
                                <div className="flex gap-3">
                                    <div className="w-full h-10 bg-amber-100 rounded-xl text-black">
                                        인풋 대체
                                    </div>
                                    <Button size="small" styled="outline">
                                        파일 찾기
                                    </Button>
                                </div>
                            </div>
                            <div className="h-6  border-b border-gray-700"></div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <p className="text-sm font-semibold h-6">
                                선택 서비스
                            </p>
                            <div className="h-40 bg-amber-950"></div>
                        </div>

                        <div className="h-53  pt-6 border-t border-gray-700 flex flex-col gap-5">
                            <div className="h-18">
                                <p className="text-sm font-semibold h-6 ">
                                    팬팔 날짜
                                </p>
                                <div className="h-11 bg-amber-300"></div>
                            </div>
                            <div className="h-18">
                                <p className="text-sm font-semibold h-6 ">
                                    마감 날짜
                                </p>
                                <div className="h-11 bg-amber-300"></div>
                            </div>
                        </div>

                        <div className=" pt-6 border-t border-gray-700 flex flex-col gap-2">
                            <p className="text-sm font-semibold h-6 ">
                                모집 정원
                            </p>
                            <div className="h-10 bg-amber-700"></div>
                            <div className="h-10 bg-amber-200"></div>
                            <div className="h-8"></div>
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
