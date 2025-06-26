import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Tab from '@/components/ui/Tab';

const meta: Meta<typeof Tab> = {
    title: 'UI/Tab',
    component: Tab,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: '탭 네비게이션에 사용되는 Tab 컴포넌트입니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: { type: 'text' },
        },
        active: {
            control: { type: 'boolean' },
        },
        icon: {
            control: false,
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const [activeTab, setActiveTab] = useState('tab1');

        return (
            <div className="w-80 p-4 flex gap-4">
                <Tab
                    active={activeTab === 'tab1'}
                    onClick={() => setActiveTab('tab1')}
                >
                    활성 탭
                </Tab>
                <Tab
                    active={activeTab === 'tab2'}
                    onClick={() => setActiveTab('tab2')}
                >
                    비활성 탭
                </Tab>
            </div>
        );
    },
};
