// 'use client';
// import { Categories } from '@/types/categories';
// import BoxSelect from './BoxSelect';
// import { ChangeEvent } from 'react';

// function BoxSelectGroup({
//     categories,
//     name,
// }: {
//     categories: Categories[];
//     name: string;
// }) {
//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { id, checked } = e.target;
//         console.log(id, checked);
//     };
//     return (
//         <div className="flex flex-col w-full ">
//             <label className="mb-4 font-semibold text-sm leading-5 text-gray-900">
//                 선택 서비스
//             </label>
//             <div className="grid grid-cols-3 gap-2 sm:gap-3">
//                 {categories.map((category) => (
//                     <BoxSelect
//                         key={category.id}
//                         category={category}
//                         name={name}
//                         onChange={handleChange}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default BoxSelectGroup;
