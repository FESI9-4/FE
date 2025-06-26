import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm } from 'react-hook-form';
import BoxSelect from '@/components/ui/BoxSelect';
import { Category } from '@/types/categories';

// 목업 데이터
const mockCategories: Category[] = [
    {
        id: 'GO_TYPE',
        title: '함께 가기',
        smallCategory: [
            { id: 'CONCERT', name: '콘서트' },
            { id: 'FESTIVAL', name: '페스티벌' },
            { id: 'FANMEETING', name: '팬미팅' },
        ],
    },
    {
        id: 'DO_TYPE',
        title: '함께 하기',
        smallCategory: [
            { id: 'PHOTOCARD', name: '포토카드' },
            { id: 'GOODS', name: '굿즈' },
            { id: 'ALBUM', name: '앨범' },
        ],
    },
];

// 스토리북용 래퍼 컴포넌트
const BoxSelectWrapper = ({ categories }: { categories: Category[] }) => {
    const { register, watch } = useForm();
    const selectedValue = watch('category');

    return (
        <div className="p-4">
            <BoxSelect
                categories={categories}
                register={register}
                name="category"
            />
            <div className="mt-4 p-2 bg-gray-800 rounded text-white text-sm">
                <strong>선택된 값:</strong> {selectedValue || '없음'}
            </div>
        </div>
    );
};

const meta: Meta<typeof BoxSelect> = {
    title: 'UI/BoxSelect',
    component: BoxSelect,
    parameters: {
        docs: {
            description: {
                component:
                    '팬팔 만들기 모달에서 카테고리를 선택하는 컴포넌트입니다.',
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
    render: () => <BoxSelectWrapper categories={mockCategories} />,
};
