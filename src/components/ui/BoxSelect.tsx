'use client';
import { Category } from '@/types/categories';
import { DoTogetherIcon, GoTogetherIcon } from '@/assets';
import { cva } from 'class-variance-authority';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
interface BoxSelectProps {
    categories: Category[];
    register: UseFormRegister<FieldValues>;
    name: string;
    rules?: RegisterOptions;
    error?: FieldError;
    defaultValue?: string;
}
const buttonVariants = cva([
    'px-3 py-2 rounded-full cursor-pointer text-gray-300 border-gray-600',
    'text-sm leading-5 font-semibold border-[1px]',
    'peer-checked:bg-green-400', // 🎯 peer가 checked일 때
    'peer-checked:border-green-400',
    'peer-checked:text-black',
    'transition-all duration-200', // 🎯 부드러운 전환
    'hover:border-green-500', // 🎯 호버 효과
]);
export default function BoxSelect({
    categories,
    register,
    name,
    rules,
}: BoxSelectProps) {
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
                                        {...register(name, rules)}
                                        type="radio"
                                        value={`${category.id},${service.id}`}
                                        className="hidden peer sr-only"
                                        id={`${category.id}_${service.id}`}
                                    />
                                    <label //라디오버튼으로 바꾸고 버튼은 라벨으로
                                        htmlFor={`${category.id}_${service.id}`}
                                        className={buttonVariants()}
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
