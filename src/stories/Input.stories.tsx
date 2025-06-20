import type { Meta, StoryObj } from '@storybook/nextjs';
import Input from '@/components/ui/Input';
import { useForm } from 'react-hook-form';

// 폼 데이터 타입 정의
interface FormData {
    name: string;
}

// Input 컴포넌트를 래핑하는 컴포넌트
const InputWrapper = ({
    label = '이름',
    placeholder = '이름을 입력해주세요 (2자 이상)',
    type = 'text',
    size = 'large',
    required = true,
    minLength = 2,
    labelClassName = '',
    errorMessageClass = '',
}: {
    label?: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'tel';
    size?: 'small' | 'large';
    required?: boolean;
    minLength?: number;
    labelClassName?: string;
    errorMessageClass?: string;
}) => {
    const {
        register,
        formState: { errors },
        trigger,
    } = useForm<FormData>({
        mode: 'onChange', // 실시간 유효성 검사
    });

    // 블러 시 유효성 검사 트리거
    const handleBlur = () => {
        trigger('name');
    };

    // 유효성 검사 규칙 생성
    const validationRules = {
        ...(required && { required: '이 필드는 필수입니다' }),
        ...(minLength > 0 && {
            minLength: {
                value: minLength,
                message: `최소 ${minLength}자 이상 입력해주세요`,
            },
        }),
    };

    return (
        <div className="w-80 space-y-4">
            <div>
                <Input
                    type={type}
                    name="name"
                    label={label}
                    labelClassName={labelClassName}
                    placeholder={placeholder}
                    size={size}
                    register={register}
                    rules={validationRules}
                    error={errors.name}
                    onBlur={handleBlur}
                    errorMessageClass={errorMessageClass}
                />
            </div>
        </div>
    );
};

const meta: Meta<typeof InputWrapper> = {
    title: 'UI/Input',
    component: InputWrapper,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'React Hook Form과 함께 사용하는 Input 컴포넌트입니다.',
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
            description: 'Input 위에 표시되는 라벨 텍스트',
            defaultValue: '이름',
        },
        placeholder: {
            control: 'text',
            description: 'Input 내부에 표시되는 플레이스홀더 텍스트',
            defaultValue: '이름을 입력해주세요 (2자 이상)',
        },
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'tel'],
            description: 'Input의 타입을 설정합니다',
            defaultValue: 'text',
        },
        size: {
            control: 'select',
            options: ['small', 'large'],
            description:
                'Input의 크기를 설정합니다. small: 작은 크기, large: 큰 크기',
            defaultValue: 'large',
        },
        required: {
            control: 'boolean',
            description: '필수 입력 여부를 설정합니다',
            defaultValue: true,
        },
        minLength: {
            control: { type: 'number', min: 0, max: 20, step: 1 },
            description: '최소 입력 길이를 설정합니다 (0이면 길이 제한 없음)',
            defaultValue: 2,
        },
        labelClassName: {
            control: 'text',
            description: '라벨 클래스를 설정합니다',
            defaultValue: '',
        },
        errorMessageClass: {
            control: 'text',
            description: '에러 메시지 클래스를 설정합니다',
            defaultValue: '',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
    args: {
        label: '이름',
        placeholder: '이름을 입력해주세요 (2자 이상)',
        type: 'text',
        size: 'large',
        required: true,
        minLength: 2,
    },
};
