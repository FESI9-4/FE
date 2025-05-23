'use client';

import { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown/Dropdown'; // 경로는 실제 위치에 맞게 조정하세요.

export default function Home() {
    const [arrowSelected, setArrowSelected] = useState('');
    const [sortSelected, setSortSelected] = useState('');

    const options = ['Option 1', 'Option 2', 'Option 3'];

    return (
        <div className="flex flex-col items-start gap-10 p-10 bg-black">
            <div>
                <h2 className="text-xl font-semibold mb-2">Arrow 타입 Dropdown</h2>
                <Dropdown
                    options={options}
                    selected={arrowSelected}
                    onSelect={(value) => setArrowSelected(value)}
                    placeholder="선택하세요"
                    iconType="arrow"
                />
            </div>

            <div className='ml-50 w-9'> 
                <h2 className="text-xl  font-semibold mb-2">Sort 타입 Dropdown</h2>
                <Dropdown
                    options={options}
                    selected={sortSelected}
                    onSelect={(value, order) => {
                        console.log('정렬 순서:', order);
                        setSortSelected(value);
                    }}
                    placeholder="정렬 기준"
                    iconType="sort"
                />
            </div>
        </div>
    );
}
