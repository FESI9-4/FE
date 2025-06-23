import type { Meta, StoryObj } from '@storybook/nextjs';
import PanpalModal from '@/components/ui/Modal/PanpalModal';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 스토리북용 QueryClient 생성
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            staleTime: Infinity,
        },
        mutations: {
            retry: false,
        },
    },
});

// PanpalModal을 위한 래퍼 (모달 루트 및 QueryClient 제공)
const PanpalModalWrapper = () => {
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
        <QueryClientProvider client={queryClient}>
            <PanpalModal
                onClose={() => console.log('모달 닫기')}
                onSubmit={(data) => console.log('팬팔 생성:', data)}
            />
        </QueryClientProvider>
    );
};

const meta: Meta<typeof PanpalModalWrapper> = {
    title: 'UI/Modal/PanpalModal',
    component: PanpalModalWrapper,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    '팬팔을 생성하기 위한 모달 컴포넌트입니다. 팬팔 이름, 상세 내용, 장소, 이미지, 카테고리, 날짜, 모집 정원 등을 입력할 수 있습니다.',
            },
            story: {
                inline: false,
                iframeHeight: 800,
            },
        },
        backgrounds: {
            default: 'light',
        },
        nextjs: {
            appDirectory: true,
        },
        // MSW 모킹을 위한 설정
        msw: {
            handlers: [],
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
    render: () => <PanpalModalWrapper />,
};
