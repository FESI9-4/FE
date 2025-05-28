'use client';
import { useState } from 'react';
import { Category } from '@/types/categories';
import { DoTogetherIcon, GoTogetherIcon } from '@/assets';
import { cva } from 'class-variance-authority';
interface BoxSelectProps {
    categories: Category[];
}
export default function BoxSelect({ categories }: BoxSelectProps) {
    const [selectedCategory, setSelectedCategory] = useState({
        bigCategory: '',
        smallCategory: '',
    });
    const handleSelectedCategory = (
        bigCategory: string,
        smallCategory: string
    ) => {
        const newSelection = {
            bigCategory: bigCategory,
            smallCategory: smallCategory,
        };
        setSelectedCategory(newSelection);
    };
    const buttonVariants = cva(
        [
            'px-3 py-2 rounded-full cursor-pointer',
            'text-sm leading-5 font-semibold border-[1px]',
        ],
        {
            variants: {
                variant: {
                    default: 'border-gray-300 text-gray-300',
                    selected: 'bg-green-400 border-green-400 text-black',
                },
            },
            defaultVariants: {
                variant: 'default',
            },
        }
    );
    return (
        <div className="w-full">
            <div className="text-base leading-6 font-semibold text-white mb-4">
                선택서비스
            </div>
            <div className="md:flex md:flex-col md:gap-4 md:w-[452px]">
                {/* 카테고리별 렌더링 */}
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="w-full md:flex justify-between items-center font-Pretendard text-sm leading-5 font-semibold"
                    >
                        <div className="flex items-center gap-2  md:mb-0 mb-[6px]">
                            <h2 className="text-gray-400 leading-7 font-medium text-sm">
                                {category.title}
                            </h2>
                            <span>
                                {category.id === 'GO_TYPE' ? (
                                    <GoTogetherIcon
                                        width={20}
                                        height={20}
                                        className="text-gray-400"
                                    />
                                ) : (
                                    <DoTogetherIcon
                                        width={20}
                                        height={20}
                                        className="text-gray-400"
                                    />
                                )}
                            </span>
                        </div>

                        <div className="flex gap-2 mb-5 md:mb-0">
                            {category.smallCategory.map((service) => (
                                <div key={service.id}>
                                    <input
                                        //className="hidden"
                                        type="radio"
                                        value={`${category.id}_${service.id}`}
                                        hidden
                                        name={'selectedCategory'}
                                        id={service.id}
                                        onChange={() =>
                                            handleSelectedCategory(
                                                category.id,
                                                service.id
                                            )
                                        }
                                    />
                                    <label //라디오버튼으로 바꾸고 버튼은 라벨으로
                                        htmlFor={service.id}
                                        onClick={() =>
                                            handleSelectedCategory(
                                                category.id,
                                                service.id
                                            )
                                        }
                                        className={buttonVariants({
                                            variant:
                                                selectedCategory.bigCategory ===
                                                    category.id &&
                                                selectedCategory.smallCategory ===
                                                    service.id
                                                    ? 'selected'
                                                    : 'default',
                                        })}
                                    >
                                        {service.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
