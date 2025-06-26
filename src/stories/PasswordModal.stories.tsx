import type { Meta, StoryObj } from '@storybook/nextjs';
import PasswordModal from '@/components/ui/Modal/PasswordModal';
import { useEffect } from 'react';

// PasswordModal을 위한 래퍼 (모달 루트 제공)
const PasswordModalWrapper = () => {
    useEffect(() => {
        // 모달 루트가 없으면 생성
        if (!document.getElementById('modal-root')) {
            const modalRoot = document.createElement('div');
            modalRoot.id = 'modal-root';
            document.body.appendChild(modalRoot);
        }

        return () => {
            // 클린업
            const modalRoot = document.getElementById('modal-root');
            if (modalRoot) {
                modalRoot.remove();
            }
        };
    }, []);

    return (
        <PasswordModal
            onClose={() => console.log('모달 닫기')}
            onSubmit={(data) => console.log('비밀번호 변경:', data)}
        />
    );
};

const meta: Meta<typeof PasswordModalWrapper> = {
    title: 'UI/Modal/PasswordModal',
    component: PasswordModalWrapper,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    '사용자의 비밀번호를 변경하기 위한 모달 컴포넌트입니다. 현재 비밀번호, 새 비밀번호, 비밀번호 확인을 입력할 수 있습니다.',
            },
            story: {
                inline: false,
                iframeHeight: 600,
            },
        },
        backgrounds: {
            default: 'light',
        },
        nextjs: {
            appDirectory: true,
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
    render: () => <PasswordModalWrapper />,
};
