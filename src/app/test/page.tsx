'use client';

import { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown';

export default function Home() {
    const [selectedFilter, setSelectedFilter] = useState<string | undefined>(
        undefined
    );
    const [selectedModal, setSelectedModal] = useState<string | undefined>(
        undefined
    );
    const [selectedSort, setSelectedSort] = useState<string | undefined>(
        undefined
    );

    const filterOptions = ['필터1', '필터2', '필터3'];
    const modalOptions = ['모달1', '모달2', '모달3'];
    const sortOptions = ['최신순', '인기순', '가격순'];

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Dropdown 3종류 테스트</h1>

            <div style={{ marginBottom: '1.5rem' }}>
                <h2>필터 타입</h2>
                <Dropdown
                    type="필터"
                    options={filterOptions}
                    selected={selectedFilter}
                    placeholder="필터 선택"
                    onSelect={setSelectedFilter}
                />
                <p>선택된 필터: {selectedFilter}</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <h2>모달 타입</h2>
                <Dropdown
                    type="모달"
                    options={modalOptions}
                    selected={selectedModal}
                    placeholder="모달 선택"
                    onSelect={setSelectedModal}
                />
                <p>선택된 모달: {selectedModal}</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <h2>정렬 타입</h2>
                <Dropdown
                    type="정렬"
                    options={sortOptions}
                    selected={selectedSort}
                    placeholder="정렬 선택"
                    onSelect={setSelectedSort}
                />
                <p>선택된 정렬: {selectedSort}</p>
            </div>
        </div>
    );
}
