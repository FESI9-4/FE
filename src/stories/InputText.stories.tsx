import type { Meta, StoryObj } from '@storybook/nextjs';
import InputText from '@/components/ui/InputText';
import { useForm } from 'react-hook-form';

// 폼 데이터 타입 정의
interface FormData {
    content: string;
}

// InputText 컴포넌트를 래핑하는 컴포넌트
const InputTextWrapper = ({
    label = '내용',
    placeholder = '내용을 입력해주세요',
    size = 'large',
    labelClassName = '',
}: {
    label?: string;
    placeholder?: string;
    size?: 'small' | 'large';
    labelClassName?: string;
}) => {
    const { register } = useForm<FormData>();

    return (
        <div className="w-96 space-y-4">
            <div>
                <InputText
                    name="content"
                    label={label}
                    placeholder={placeholder}
                    size={size}
                    register={register}
                    labelClassName={labelClassName}
                />
            </div>
        </div>
    );
};

const meta: Meta<typeof InputTextWrapper> = {
    title: 'UI/InputText',
    component: InputTextWrapper,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    '댓글이나 모달 작성시 사용하는 Textarea 컴포넌트입니다.',
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
            description: 'Textarea 위에 표시되는 라벨 텍스트',
            defaultValue: '내용',
        },
        placeholder: {
            control: 'text',
            description: 'Textarea 내부에 표시되는 플레이스홀더 텍스트',
            defaultValue: '내용을 입력해주세요',
        },
        size: {
            control: 'select',
            options: ['small', 'large'],
            description:
                'Textarea의 라벨 크기를 설정합니다. small: 작은 라벨, large: 큰 라벨',
            defaultValue: 'large',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
    args: {
        label: '내용',
        placeholder: '내용을 입력해주세요',
        size: 'large',
    },
};
