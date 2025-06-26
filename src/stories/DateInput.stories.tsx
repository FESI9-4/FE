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
    size = 'large',
    label = '날짜 선택',
    placeholder = '날짜를 선택해주세요',
    minDate,
    isStartDate = false,
}: {
    type?: 'date' | 'datetime-local';
    size?: 'small' | 'large';
    label?: string;
    placeholder?: string;
    minDate?: Date;
    isStartDate?: boolean;
}) => {
    const {
        control,
        formState: { errors },
    } = useForm<FormData>();

    return (
        <div className="w-80">
            <DateInput
                name="date"
                label={label}
                control={control}
                placeholder={placeholder}
                size={size}
                type={type}
                minDate={minDate}
                isStartDate={isStartDate}
                error={errors.date}
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
    argTypes: {
        type: {
            control: 'select',
            options: ['date', 'datetime-local'],
            description:
                'DateInput의 타입을 설정합니다. date: 날짜만 선택, datetime-local: 날짜와 시간 선택',
            defaultValue: 'date',
        },
        size: {
            control: 'select',
            options: ['small', 'large'],
            description:
                'DateInput의 크기를 설정합니다. small: 작은 크기, large: 큰 크기',
            defaultValue: 'large',
        },
        label: {
            control: 'text',
            description: 'DateInput 위에 표시되는 라벨 텍스트',
            defaultValue: '날짜 선택',
        },
        placeholder: {
            control: 'text',
            description: 'DateInput 내부에 표시되는 플레이스홀더 텍스트',
            defaultValue: '날짜를 선택해주세요',
        },
        minDate: {
            control: 'date',
            description: '선택 가능한 최소 날짜를 설정합니다',
        },
        isStartDate: {
            control: 'boolean',
            description: '시작 날짜 여부를 설정합니다 (시작/종료 날짜 구분용)',
            defaultValue: false,
        },
    },
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
export const StartDate: Story = {
    args: {
        type: 'datetime-local',
        size: 'small',
        label: '시작 날짜',
        placeholder: '시작 날짜를 선택해주세요',
        minDate: new Date(),
        isStartDate: true,
    },
};

export const EndDate: Story = {
    args: {
        type: 'datetime-local',
        size: 'small',
        label: '마감 날짜',
        placeholder: '마감 날짜를 선택해주세요',
        minDate: new Date(),
        isStartDate: false,
    },
};

export const AllStates: Story = {
    render: () => (
        <div className="space-y-8">
            <div>
                <h1 className="text-lg font-semibold mb-4 text-white">
                    기본 날짜 선택
                </h1>
                <DateInputWrapper
                    type="date"
                    size="large"
                    label="날짜 선택"
                    placeholder="날짜를 선택해주세요"
                />
            </div>
            <div>
                <h1 className="text-lg font-semibold mb-4 text-white">
                    날짜+시간 선택
                </h1>
                <DateInputWrapper
                    type="datetime-local"
                    size="large"
                    label="날짜시간 선택"
                    placeholder="날짜와 시간을 선택해주세요"
                />
            </div>
            <div>
                <h1 className="text-lg font-semibold mb-4 text-white">
                    시작 날짜 (팬팔 모달 스타일)
                </h1>
                <DateInputWrapper
                    type="datetime-local"
                    size="small"
                    label="시작 날짜"
                    placeholder="시작 날짜를 선택해주세요"
                    minDate={new Date()}
                    isStartDate={true}
                />
            </div>
            <div>
                <h1 className="text-lg font-semibold mb-4 text-white">
                    마감 날짜 (팬팔 모달 스타일)
                </h1>
                <DateInputWrapper
                    type="datetime-local"
                    size="small"
                    label="마감 날짜"
                    placeholder="마감 날짜를 선택해주세요"
                    minDate={new Date()}
                    isStartDate={false}
                />
            </div>
        </div>
    ),
};
