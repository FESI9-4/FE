import type { Meta, StoryObj } from '@storybook/nextjs';
import InputFile from '@/components/ui/InputFile';
import { useForm } from 'react-hook-form';

// 폼 데이터 타입 정의
interface FormData {
    profileImage: FileList;
    document: FileList;
    avatar: FileList;
}

// InputFile 컴포넌트를 래핑하는 컴포넌트
const InputFileWrapper = ({
    label = '프로필 이미지',
    placeholder = '이미지를 선택해주세요.',
    buttonText = '파일 업로드',
    size = 'large',
    accept = 'image/*',
    required = false,
}: {
    label?: string;
    placeholder?: string;
    buttonText?: string;
    size?: 'small' | 'large';
    accept?: string;
    required?: boolean;
}) => {
    const {
        register,
        formState: { errors },
    } = useForm<FormData>();

    // 유효성 검사 규칙 생성
    const validationRules = {
        ...(required && { required: '파일을 선택해주세요' }),
    };

    return (
        <div className="w-96 space-y-4">
            <div>
                <InputFile
                    name="profileImage"
                    label={label}
                    placeholder={placeholder}
                    buttonText={buttonText}
                    size={size}
                    accept={accept}
                    register={register}
                    rules={validationRules}
                    error={errors.profileImage}
                />
            </div>
        </div>
    );
};

const meta: Meta<typeof InputFileWrapper> = {
    title: 'UI/InputFile',
    component: InputFileWrapper,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'React Hook Form과 함께 사용하는 파일 업로드 컴포넌트입니다.',
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
            description: 'InputFile 위에 표시되는 라벨 텍스트',
            defaultValue: '프로필 이미지',
        },
        placeholder: {
            control: 'text',
            description:
                '파일이 선택되지 않았을 때 표시되는 플레이스홀더 텍스트',
            defaultValue: '이미지를 선택해주세요.',
        },
        buttonText: {
            control: 'text',
            description: '파일 선택 버튼에 표시되는 텍스트',
            defaultValue: '파일 업로드',
        },
        size: {
            control: 'select',
            options: ['small', 'large'],
            description:
                'InputFile의 크기를 설정합니다. small: 작은 크기, large: 큰 크기',
            defaultValue: 'large',
        },
        accept: {
            control: 'text',
            description:
                '허용할 파일 타입을 설정합니다 (예: image/*, .jpg,.png)',
            defaultValue: 'image/*',
        },
        required: {
            control: 'boolean',
            description: '필수 업로드 여부를 설정합니다',
            defaultValue: false,
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (프로필 이미지)
export const Default: Story = {
    args: {
        label: '프로필 이미지',
        placeholder: '이미지를 선택해주세요.',
        buttonText: '파일 업로드',
        size: 'large',
        accept: 'image/*',
        required: false,
    },
};
