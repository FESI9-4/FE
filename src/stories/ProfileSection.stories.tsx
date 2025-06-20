import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from '@/components/ui/Button';
import Profile from '@/components/ui/Profile';
import { EditNoBgIcon, Heart, ThreeHeart } from '@/assets';

// Mock ProfileSection 컴포넌트 (디자인만 보여주기 위함)
const MockProfileSection = ({
    handlePasswordModal,
    handleEditProfileModal,
    userData = {
        img: 'https://randomuser.me/api/portraits/women/75.jpg',
        nickName: '아이돌팬123',
        description:
            '안녕하세요! 아이돌을 사랑하는 팬입니다. 콘서트와 팬미팅 정보를 자주 공유하고 있어요. 함께 덕질해요! 🎵✨',
    },
}: {
    handlePasswordModal: () => void;
    handleEditProfileModal: () => void;
    userData?: {
        img: string;
        nickName: string;
        description: string;
    };
}) => {
    return (
        <div className="w-full">
            {/* Desktop Layout */}
            <div className="hidden sm:block">
                <div className="w-full h-55.5 bg-gray-850 p-8 flex flex-col justify-center items-center rounded-t-[20px]">
                    <div className="w-full h-full flex flex-col gap-2">
                        <div className="w-full h-16 flex justify-between">
                            <Profile size="large" image={userData.img} />
                            <Button
                                size="small"
                                styled="outline"
                                className="w-39.25 text-white outline-white h-10"
                                onClick={handlePasswordModal}
                            >
                                비밀번호 변경하기
                            </Button>
                        </div>
                        <div className="h-8 flex items-center overflow-hidden">
                            <p className="text-xl font-semibold h-7 text-white">
                                {userData.nickName}
                            </p>
                            <button
                                onClick={handleEditProfileModal}
                                className="w-8 h-8 text-white cursor-pointer hover:text-green-500"
                            >
                                <EditNoBgIcon width={32} height={32} />
                            </button>
                        </div>
                        <p className="text-base font-light text-gray-300 h-12 w-full overflow-auto">
                            {userData.description}
                        </p>
                    </div>
                </div>
                <div className="bg-green-400 rounded-b-[20px] w-full h-10 px-8 flex justify-between items-center">
                    <Heart />
                    <ThreeHeart />
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="block sm:hidden">
                <div className="w-full h-63 flex flex-col justify-between items-center">
                    <div className="h-45 flex flex-col justify-between w-full">
                        <div className="h-16 w-full flex items-center gap-4 justify-between">
                            <div className="flex items-center gap-4">
                                <Profile size="large" image={userData.img} />
                                <p className="text-lg font-semibold h-7 text-white overflow-hidden">
                                    {userData.nickName}
                                </p>
                            </div>
                            <div className="h-8 flex items-center">
                                <button
                                    onClick={handleEditProfileModal}
                                    className="w-8 h-8 text-white cursor-pointer hover:text-green-500"
                                >
                                    <EditNoBgIcon width={32} height={32} />
                                </button>
                            </div>
                        </div>
                        <p className="text-base font-light text-gray-300 h-24 w-full overflow-auto">
                            {userData.description}
                        </p>
                    </div>
                    <Button
                        size="large"
                        styled="outline"
                        className="outline-white text-white w-full h-10"
                        onClick={handlePasswordModal}
                    >
                        비밀번호 변경하기
                    </Button>
                </div>
            </div>
        </div>
    );
};

const meta: Meta<typeof MockProfileSection> = {
    title: 'UI/ProfileSection',
    component: MockProfileSection,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: '사용자 프로필 정보를 표시하는 섹션 컴포넌트입니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        handlePasswordModal: {
            description: '비밀번호 변경 모달을 열기 위한 함수',
            action: 'passwordModalOpened', // 액션 로그도 함께
        },
        handleEditProfileModal: {
            description: '프로필 편집 모달을 열기 위한 함수',
            action: 'editProfileModalOpened',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        handlePasswordModal: () => console.log('비밀번호 변경 모달 열림'),
        handleEditProfileModal: () => console.log('프로필 편집 모달 열림'),
    },
    render: (args) => <MockProfileSection {...args} />,
};

export const AllStates: Story = {
    render: () => (
        <div className="p-8 min-h-screen space-y-8">
            <div className="max-w-4xl space-y-8">
                {/* 기본 프로필 */}
                <div>
                    <h3 className="text-white text-lg mb-4">기본 프로필</h3>
                    <MockProfileSection
                        handlePasswordModal={() => console.log('비밀번호 변경')}
                        handleEditProfileModal={() =>
                            console.log('프로필 편집')
                        }
                    />
                </div>

                {/* 긴 설명이 있는 프로필 */}
                <div>
                    <h3 className="text-white text-lg mb-4">긴 설명 프로필</h3>
                    <MockProfileSection
                        handlePasswordModal={() => console.log('비밀번호 변경')}
                        handleEditProfileModal={() =>
                            console.log('프로필 편집')
                        }
                        userData={{
                            img: 'https://randomuser.me/api/portraits/men/32.jpg',
                            nickName: '팬클럽회장님',
                            description:
                                '안녕하세요! 저는 10년차 아이돌 팬입니다. 다양한 아이돌 그룹을 좋아하고, 특히 콘서트와 팬미팅에 자주 참석합니다. 팬들과 정보를 공유하고 함께 응원하는 것을 좋아해요. 새로운 팬분들도 언제든 환영합니다!',
                        }}
                    />
                </div>
            </div>
        </div>
    ),
};
