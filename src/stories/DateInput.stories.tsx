import type { Meta, StoryObj } from '@storybook/nextjs';
import DateInput from '@/components/ui/DateInput';
import { useForm } from 'react-hook-form';

// 폼 데이터 타입 정의
interface FormData {
    date: Date;
}

// DateInput 컴포넌트를 래핑하는 컴포넌트
const DateInputWrapper = ({
    type = 'date',
}: {
    type?: 'date' | 'datetime-local';
}) => {
    const { control } = useForm<FormData>();

    return (
        <div className="w-80">
            <DateInput
                name="date"
                label="날짜 선택"
                control={control}
                placeholder="날짜를 선택해주세요"
                size="large"
                type={type}
            />
        </div>
    );
};

const meta: Meta<typeof DateInputWrapper> = {
    title: 'UI/DateInput',
    component: DateInputWrapper,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'React Hook Form Controller와 함께 사용하는 날짜 선택 컴포넌트입니다.',
            },
        },
        backgrounds: {
            default: 'dark',
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        type: 'date',
    },
};
export const Datetime: Story = {
    args: {
        type: 'datetime-local',
    },
};
