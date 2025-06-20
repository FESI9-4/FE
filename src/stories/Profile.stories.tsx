import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Profile from '@/components/ui/Profile';

const meta: Meta<typeof Profile> = {
    title: 'UI/Profile',
    component: Profile,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    '사용자 프로필 이미지와 이름을 표시하는 컴포넌트입니다. ProfileSection에서 사용됩니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['xsmall', 'small', 'medium', 'large'],
        },
        image: {
            control: { type: 'text' },
        },
        edit: {
            control: { type: 'boolean' },
            description: '편집 버튼 표시 여부',
        },
        children: {
            control: { type: 'text' },
        },
        editButtonOnClick: {
            description: '프로필 편집 모달 열림',
            action: 'editButtonClicked',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 'medium',
        image: 'https://randomuser.me/api/portraits/women/75.jpg',
        children: '아이돌팬123',
        edit: false,
        editButtonOnClick: () => console.log('편집 버튼 클릭'),
    },
};

export const AllStates: Story = {
    render: () => (
        <div className="p-8 bg-gray-900 min-h-screen space-y-8">
            <div className="max-w-4xl space-y-8">
                {/* 크기별 프로필 */}
                <div>
                    <h3 className="text-white text-lg mb-4">크기별 프로필</h3>
                    <div className="flex items-center gap-8 flex-wrap">
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">XSmall</p>
                            <Profile
                                size="xsmall"
                                image="https://randomuser.me/api/portraits/women/75.jpg"
                            >
                                닉네임
                            </Profile>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">Small</p>
                            <Profile
                                size="small"
                                image="https://randomuser.me/api/portraits/men/32.jpg"
                            >
                                닉네임
                            </Profile>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">Medium</p>
                            <Profile
                                size="medium"
                                image="https://randomuser.me/api/portraits/women/44.jpg"
                            >
                                닉네임
                            </Profile>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">Large</p>
                            <Profile
                                size="large"
                                image="https://randomuser.me/api/portraits/men/67.jpg"
                            >
                                닉네임
                            </Profile>
                        </div>
                    </div>
                </div>
                {/* 편집 버튼 표시 여부 */}
                <div>
                    <h3 className="text-white text-lg mb-4">
                        편집 버튼 표시 여부
                    </h3>
                    <div className="flex items-center gap-8 flex-wrap">
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">XSmall</p>
                            <Profile
                                size="xsmall"
                                image="https://randomuser.me/api/portraits/women/75.jpg"
                                edit={true}
                            >
                                닉네임
                            </Profile>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">Small</p>
                            <Profile
                                size="small"
                                image="https://randomuser.me/api/portraits/men/32.jpg"
                                edit={true}
                            >
                                닉네임
                            </Profile>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">Medium</p>
                            <Profile
                                size="medium"
                                image="https://randomuser.me/api/portraits/women/44.jpg"
                                edit={true}
                            >
                                닉네임
                            </Profile>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">Large</p>
                            <Profile
                                size="large"
                                image="https://randomuser.me/api/portraits/men/67.jpg"
                                edit={true}
                            >
                                닉네임
                            </Profile>
                        </div>
                    </div>
                </div>
                {/* 크기별 프로필 */}
                <div>
                    <h3 className="text-white text-lg mb-4">크기별 프로필</h3>
                    <div className="flex items-center gap-8 flex-wrap">
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">XSmall</p>
                            <Profile size="xsmall">닉네임</Profile>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">Small</p>
                            <Profile size="small">닉네임</Profile>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">Medium</p>
                            <Profile size="medium">닉네임</Profile>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">Large</p>
                            <Profile size="large">닉네임</Profile>
                        </div>
                    </div>
                </div>
                {/* 편집 버튼 표시 여부 */}
                <div>
                    <h3 className="text-white text-lg mb-4">
                        편집 버튼 표시 여부
                    </h3>
                    <div className="flex items-center gap-8 flex-wrap">
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">XSmall</p>
                            <Profile size="xsmall" edit={true}>
                                닉네임
                            </Profile>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">Small</p>
                            <Profile size="small" edit={true}>
                                닉네임
                            </Profile>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">Medium</p>
                            <Profile size="medium" edit={true}>
                                닉네임
                            </Profile>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">Large</p>
                            <Profile size="large" edit={true}>
                                닉네임
                            </Profile>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
};
