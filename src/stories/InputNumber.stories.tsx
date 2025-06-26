import type { Meta, StoryObj } from '@storybook/nextjs';
import InputNumber from '@/components/ui/InputNumber';
import { useForm } from 'react-hook-form';

// 폼 데이터 타입 정의
interface FormData {
    count: number;
}

// InputNumber 컴포넌트를 래핑하는 컴포넌트
const InputNumberWrapper = ({
    label = '수량',
    size = 'large',
    min = 1,
    max = 20,
    step = 1,
    required = false,
}: {
    label?: string;
    size?: 'small' | 'large';
    min?: number;
    max?: number;
    step?: number;
    required?: boolean;
}) => {
    const {
        control,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            count: min,
        },
    });

    // 유효성 검사 규칙 생성
    const validationRules = {
        ...(required && { required: '이 필드는 필수입니다' }),
        min: {
            value: min,
            message: `최소값은 ${min}입니다`,
        },
        max: {
            value: max,
            message: `최대값은 ${max}입니다`,
        },
    };

    return (
        <div className="w-80 space-y-4">
            <div>
                <InputNumber
                    name="count"
                    label={label}
                    size={size}
                    control={control}
                    rules={validationRules}
                    error={errors.count}
                    min={min}
                    max={max}
                    step={step}
                />
            </div>
        </div>
    );
};

const meta: Meta<typeof InputNumberWrapper> = {
    title: 'UI/InputNumber',
    component: InputNumberWrapper,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'React Hook Form Controller와 함께 사용하는 숫자 입력 컴포넌트입니다. 증감 버튼과 직접 입력을 지원합니다.',
            },
        },
        backgrounds: {
            default: 'dark',
        },
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: 'InputNumber 위에 표시되는 라벨 텍스트',
            defaultValue: '수량',
        },
        size: {
            control: 'select',
            options: ['small', 'large'],
            description:
                'InputNumber의 라벨 크기를 설정합니다. small: 작은 라벨, large: 큰 라벨',
            defaultValue: 'large',
        },
        min: {
            control: { type: 'number', min: 0, max: 100, step: 1 },
            description: '최소값을 설정합니다',
            defaultValue: 1,
        },
        max: {
            control: { type: 'number', min: 1, max: 1000, step: 1 },
            description: '최대값을 설정합니다',
            defaultValue: 20,
        },
        step: {
            control: { type: 'number', min: 1, max: 10, step: 1 },
            description: '증감 단위를 설정합니다',
            defaultValue: 1,
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (수량 선택)
export const Default: Story = {
    args: {
        label: '인원',
        size: 'large',
        min: 1,
        max: 20,
        step: 1,
    },
};
