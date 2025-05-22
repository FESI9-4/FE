'use client';

import { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown';

export default function Home() {
    const [selectedModal, setSelectedModal] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [selectedSort, setSelectedSort] = useState('');

    return (
        <div className="space-y-8 p-4 bg-black min-h-screen text-white">
            <div className="w-full max-w-sm">
                <h2 className="text-xl font-semibold mb-2">모달 타입</h2>
                <Dropdown
                    options={['경기', '양평']}
                    selected={selectedModal}
                    onSelect={(value) => {
                        console.log('모달 선택:', value);
                        setSelectedModal(value);
                    }}
                    placeholder="장소를 지정해주세요"
                    showPlaceholderInMenu
                />
            </div>

            <div className="w-27 ">
                <h2 className="text-xl font-semibold mb-2">필터 타입</h2>
                <Dropdown
                    options={['건대입구', '을지로 3가', '신림', ]}
                    selected={selectedFilter}
                    onSelect={(value) => {
                        console.log('필터 선택:', value);
                        setSelectedFilter(value);
                    }}
                    placeholder="전체"
                    showPlaceholderInMenu
                />
            </div>

            <div className="w-6 md:w-26">
                <h2 className="text-xl font-semibold mb-2">정렬 타입</h2>
                <Dropdown
                    options={['내림 차순', '참여 인원', '생성일 ']}
                    selected={selectedSort}
                    onSelect={(value) => {
                        console.log('정렬 선택:', value);
                        setSelectedSort(value);
                    }}
                    placeholder="마감 임박"
                    iconType="sort"
                    showPlaceholderInMenu
                />
            </div>
        </div>
    );
}
