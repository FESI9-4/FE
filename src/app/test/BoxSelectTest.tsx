'use client';
import BoxSelect from '@/components/ui/BoxSelect';
import { CATEGORY_DATA } from '@/types/categories';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';

function BoxPage() {
    const { register, handleSubmit } = useForm<FieldValues>({
        defaultValues: {
            selectedCategory: 'GO_TYPE_BUSRENTAL_TYPE',
        },
    });
    const onSubmit = (data: FieldValues) => {
        console.log(data);
        //선택된 카테고리 가져오기
        const selectedCategory = data.selectedCategory.split(',');
        //api 형식에 맞게 변환
        const apiCategory = {
            bigCategory: selectedCategory[0],
            smallCategory: selectedCategory[1],
        };
        console.log(apiCategory);
    };
    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-700">
                <BoxSelect
                    categories={CATEGORY_DATA}
                    register={register}
                    name="selectedCategory"
                    rules={{
                        required: '필수 입력값 입니다.',
                    }}
                    //error={formState.errors.selectedCategory}
                />
                <button type="submit">제출</button>
            </form>
        </div>
    );
}

export default BoxPage;
