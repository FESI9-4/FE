'use client';

import Dropdown from '@/components/ui/Dropdown';
import { useState } from 'react';

export default function DropdownTestPage() {
    const [selectedModal, setSelectedModal] = useState('');
    const [selectedFull, setSelectedFull] = useState('');
    const [selectedDeadline, setSelectedDeadline] = useState('');

    const locationOptions = [
        '건대입구',
        '을지로 3가',
        '신림',
        '홍대입구',
        '대입구',
        '을지로 3가',
        '신림',
        '홍대입구',
    ];
    const deadlineOptions = ['마감 임박', '최신순'];

    return (
        <div className="min-h-screen flex flex-col gap-10 items-center justify-center p-10 bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                드롭다운 타입 비교
            </h1>

            <div className="w-full max-w-lg grid gap-10">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="mb-4 font-semibold text-gray-700">
                        1. 모달에 들어가는 드롭다운
                    </h2>
                    <div className="flex items-center justify-center">
                        <Dropdown
                            options={locationOptions}
                            selected={selectedModal}
                            onSelect={setSelectedModal}
                            type="모달"
                            placeholder="장소를 선택해주세요"
                        />
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                        선택된 값: {selectedModal || '없음'}
                    </p>
                    <p className="mt-4 text-sm text-blue-600">
                        - 모달에 들어가는 드롭다운은 desktop, tablet 동일함
                        472x44
                    </p>
                    <p className="mt-4 text-sm text-blue-600">
                        - mobile만 다름 343x40
                    </p>
                    <p className="mt-4 text-sm text-red-600">- 작업완료</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="mb-4 font-semibold text-gray-700">
                        2. 전체 드롭다운
                    </h2>
                    <Dropdown
                        options={locationOptions}
                        selected={selectedFull}
                        onSelect={setSelectedFull}
                        type="필터"
                        placeholder="지역 전체"
                    />
                    <p className="mt-4 text-sm text-gray-600">
                        선택된 값: {selectedFull || '없음'}
                    </p>
                    <p className="mt-4 text-sm text-blue-600">
                        - 선택시 bg-black and icon 렌더링 전환
                    </p>
                    <p className="mt-4 text-sm text-blue-600">
                        - 모바일(디폴트)시에만 110x36, 나머진 110x40 - md: 처리
                    </p>
                    <p className="mt-4 text-sm text-blue-600">
                        - 추가적으로, 상단에 전체로 돌리는 메뉴가 있어야 함.
                    </p>

                    <p className="mt-4 text-sm text-red-600"> 작업완료</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="mb-4 font-semibold text-gray-700">
                        3. 마감입박 드롭다운
                    </h2>
                    <div className="flex items-center justify-center">
                        <Dropdown
                            options={deadlineOptions}
                            selected={selectedDeadline}
                            onSelect={setSelectedDeadline}
                            type="정렬"
                            placeholder="마감임박"
                        />
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                        선택된 값: {selectedDeadline || '없음'}
                    </p>
                    <p className="mt-4 text-sm text-blue-600">
                        - icon 추가와 size 수정 필요
                    </p>
                    <p className="mt-4 text-sm text-red-600">- 작업완료</p>
                </div>
            </div>
        </div>
    );
}
