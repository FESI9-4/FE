'use client';

import { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown';

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
        '을지로가',
        '신림1',
        '홍대입구1',
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
                    <Dropdown
                        type="모달"
                        options={locationOptions}
                        selected={selectedModal}
                        onSelect={setSelectedModal}
                        placeholder="장소를 선택해주세요"
                    />
                    <p className="mt-4 text-sm text-gray-600">
                        선택된 값: {selectedModal || '없음'}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="mb-4 font-semibold text-gray-700">
                        2. 전체 드롭다운
                    </h2>
                    <Dropdown
                        type="필터"
                        options={locationOptions}
                        selected={selectedFull}
                        onSelect={setSelectedFull}
                        placeholder="지역 전체"
                    />
                    <p className="mt-4 text-sm text-gray-600">
                        선택된 값: {selectedFull || '없음'}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="mb-4 font-semibold text-gray-700">
                        3. 마감임박 드롭다운
                    </h2>
                    <Dropdown
                        type="정렬"
                        options={deadlineOptions}
                        selected={selectedDeadline}
                        onSelect={setSelectedDeadline}
                        placeholder="마감임박"
                    />
                    <p className="mt-4 text-sm text-gray-600">
                        선택된 값: {selectedDeadline || '없음'}
                    </p>
                </div>
            </div>
        </div>
    );
}
