import type { Meta, StoryObj } from '@storybook/nextjs';
import PlaceAutoCompleteInput from '@/components/ui/Modal/PlaceAutoCompleteInput';
import { useEffect } from 'react';

// PlaceAutoCompleteInput을 위한 래퍼
const PlaceAutoCompleteWrapper = () => {
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
        <div className="w-min-screen">
            <PlaceAutoCompleteInput
                onPlaceSelect={(lat, lng, address) =>
                    console.log('장소 선택:', { lat, lng, address })
                }
            />
        </div>
    );
};

const meta: Meta<typeof PlaceAutoCompleteWrapper> = {
    title: 'UI/Modal/PlaceAutoCompleteInput',
    component: PlaceAutoCompleteWrapper,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Google Maps API를 사용하여 장소를 검색하고 자동완성 기능을 제공하는 입력 컴포넌트입니다.',
            },
            story: {
                inline: false,
                height: '300px',
            },
        },
        backgrounds: {
            default: 'dark',
        },
        nextjs: {
            appDirectory: true,
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <PlaceAutoCompleteWrapper />,
};
