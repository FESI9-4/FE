'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { Categories } from '@/types/categories';
interface BoxSelectProps {
    category: Categories;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function BoxSelect({ category, onChange }: BoxSelectProps) {
    const [isChecked, setIsChecked] = useState(false);
    // 총 박스 크기 및 배경색
    const BOX_STYLE = {
        baseStyle: `px-3 py-2 flex h-20 max-w-[149px] min-w-[109px] sm:h-[70px] rounded-lg`,
        bgColor: isChecked ? 'bg-gray-900' : 'bg-gray-50',
    };
    // 박스안 텍스트 색상
    const BOX_CONTENT_STYLE = {
        baseStyle: `flex flex-col h-full break-keep gap-1`,
        textColor: isChecked ? 'text-white' : 'text-gray-900',
    };
    // 박스안 큰 카테고리
    const TITLE_STYLE = `w-full font-semibold text-sm leading-5 
    sm:text-base sm:leading-6 whitespace-nowrap`;
    // 박스안 작은 카테고리
    const SUBTITLE_STYLE = `w-full font-medium text-xs leading-4 break-words`;
    //라벨
    const LABEL_STYLE = `h-[18px] w-[18px] border-1 p-[2px] mt-[3px]
                         border-gray-300 rounded-md
                         peer-checked:border-gray-50
                         peer-checked:bg-gray-50
                         relative flex items-center justify-center
                         after:block
                         `;
    // 최종 적용되는 클래스
    const containerStyle = clsx(BOX_STYLE.baseStyle, BOX_STYLE.bgColor);
    const contentStyle = clsx(
        BOX_CONTENT_STYLE.baseStyle,
        BOX_CONTENT_STYLE.textColor
    );

    return (
        <div className={containerStyle}>
            <div className="flex gap-2">
                <input
                    type="checkbox"
                    id={category.id}
                    className="hidden peer"
                    onChange={onChange}
                />
                <label
                    htmlFor={category.id}
                    className={LABEL_STYLE}
                    onClick={() => setIsChecked(!isChecked)}
                >
                    {isChecked && (
                        <Image
                            src="/icons/box_check.svg" // 체크 이미지 경로
                            alt="체크"
                            width={18}
                            height={18}
                        />
                    )}
                </label>
                <div className={contentStyle}>
                    <span className={TITLE_STYLE}>{category.title}</span>
                    <span className={SUBTITLE_STYLE}>{category.subTitle}</span>
                </div>
            </div>
        </div>
    );
}

export default BoxSelect;
