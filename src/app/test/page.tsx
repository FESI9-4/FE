'use client';

import React, { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown';

export default function DropdownTestPage() {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

  const handleSelect = (value: string, order?: 'asc' | 'desc') => {
    console.log('선택된 값:', value, '정렬 순서:', order);
    setSelectedOption(value);
  };

  const options = ['최신순', '조회수', '댓글순'];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-2xl font-bold"> Dropdown 테스트 페이지</h1>

      <div className="w-72 bg-gray-700">
        <Dropdown
          options={options}
          selected={selectedOption}
          onSelect={handleSelect}
          placeholder="정렬 기준 선택"
          iconType="sort"
          showPlaceholderInMenu
        />
      </div>
    </div>
  );
}
