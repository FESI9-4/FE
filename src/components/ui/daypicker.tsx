'use client';

import { useEffect } from 'react';
import 'flowbite-datepicker'; // Datepicker JS 기능 임포트

export default function Datepicker() {
    useEffect(() => {
        // flowbite-datepicker는 자동으로 data-datepicker attribute 있는 input 찾아 초기화함
        // 추가 설정이 필요하면 여기서 할 수 있음
    }, []);

    return (
        <div>
            <label
                htmlFor="datepicker"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Select Date
            </label>
            <input
                id="datepicker"
                data-datepicker
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Select date"
            />
        </div>
    );
}
