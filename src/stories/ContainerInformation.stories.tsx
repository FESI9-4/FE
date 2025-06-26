import type { Meta, StoryObj } from '@storybook/nextjs';
import Profile from '@/components/ui/Profile';
import ContainerProgress from '@/components/ui/ContainerProgress';
import Like from '@/components/ui/Like';
import dateConverter from '@/utils/dateConverter';

interface ContainerInformationProps {
    createUser: string;
    createUserProfileImgUrl: string;
    title: string;
    location: string;
    date: number;
    deadLine: number;
    minPerson: number;
    maxPerson: number;
    currentPerson: number;
    wishList: boolean;
    articleId: number;
    openStatus:
        | 'PENDING_STATUS'
        | 'CONFIRMED_STATUS'
        | 'PROGRESSING_STATUS'
        | 'CANCELED_STATUS';
}

// ContainerInformation과 똑같은 구조의 컴포넌트 (useGetUser 없이)
const MockContainerInformation = ({
    createUser,
    createUserProfileImgUrl,
    title,
    location,
    date,
    deadLine,
    minPerson,
    maxPerson,
    currentPerson,
    openStatus,
}: ContainerInformationProps) => {
    // 가짜 사용자 데이터 (로그인된 상태로 가정)
    const formattedDate = dateConverter(date, 'korea');
    const formattedLimitedDate = dateConverter(deadLine, 'korea');

    // 임시로 찜 상태 관리
    const isLiked = false;

    const handleLikeClick = async () => {
        console.log('좋아요 클릭');
    };

    return (
        <div className="w-full px-2 sm:px-0 h-71 sm:h-85 flex flex-col gap-7 sm:justify-between bg-transparent min-w-52">
            <div className="h-43 flex flex-col justify-between sm:h-48">
                <div className="h-23 sm:h-24 flex flex-col gap-2 sm:gap-3">
                    <div className="flex flex-col h-15 gap-1">
                        <div className="flex justify-between items-center h-8">
                            <span className="text-2xl font-semibold h-8 text-white">
                                {title}
                            </span>
                            <Like
                                like={isLiked}
                                onClick={handleLikeClick}
                                className="hidden sm:inline-block"
                            />
                        </div>
                        <span className="text-base font-normal text-gray-300 h-6">
                            {location}
                        </span>
                    </div>
                    <div className="h-6 flex gap-2 items-center">
                        <Profile size="small" image={createUserProfileImgUrl} />
                        <span className="h-5 text-gray-300">{createUser}</span>
                    </div>
                </div>
                <div className="h-13 sm:h-14 flex flex-col gap-1 sm:gap-2">
                    <div className="h-6 flex items-center truncate">
                        <span className="w-14 text-base font-normal text-gray-400">
                            진행일시
                        </span>
                        <div className="w-0.5 h-3.5 ml-2.5 mr-2 bg-gray-800" />
                        <span className="text-base font-normal text-white">
                            {formattedDate}
                        </span>
                    </div>
                    <div className="h-6 flex items-center truncate">
                        <span className="w-14 text-base font-normal text-green-400">
                            모집마감
                        </span>
                        <div className="w-0.5 h-3.5 ml-2.5 mr-2 bg-gray-800" />
                        <span className="text-base font-normal text-white">
                            {formattedLimitedDate}
                        </span>
                    </div>
                </div>
            </div>
            <div className="h-21 sm:h-20 flex flex-col gap-3">
                <div className="h-10">
                    <ContainerProgress
                        max={maxPerson}
                        current={currentPerson}
                        openStatus={openStatus}
                    />
                </div>
                <div className="h-4 flex items-center justify-between text-sm font-medium text-gray-500">
                    <span>최소인원 {minPerson}명</span>
                    <span>최대인원 {maxPerson}명</span>
                </div>
            </div>
        </div>
    );
};

const meta: Meta<typeof MockContainerInformation> = {
    title: 'UI/ContainerInformation',
    component: MockContainerInformation,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark',
            values: [
                { name: 'dark', value: '#1a1a1a' },
                { name: 'light', value: '#ffffff' },
            ],
        },
        docs: {
            description: {
                component: '팬팔 상세 정보를 표시하는 컴포넌트입니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        createUser: {
            control: { type: 'text' },
            description: '팬팔 생성자 이름',
        },
        title: {
            control: { type: 'text' },
            description: '팬팔 제목',
        },
        location: {
            control: { type: 'text' },
            description: '팬팔 장소',
        },
        date: {
            control: { type: 'number' },
            description: '진행 날짜 (Unix timestamp)',
        },
        deadLine: {
            control: { type: 'number' },
            description: '모집 마감 날짜 (Unix timestamp)',
        },
        minPerson: {
            control: { type: 'number', min: 1 },
            description: '최소 인원',
        },
        maxPerson: {
            control: { type: 'number', min: 1 },
            description: '최대 인원',
        },
        currentPerson: {
            control: { type: 'number', min: 0 },
            description: '현재 참여 인원',
        },
        wishList: {
            control: { type: 'boolean' },
            description: '찜하기 상태 (사용되지 않음)',
        },
        articleId: {
            control: { type: 'number' },
            description: '게시글 ID',
        },
        createUserProfileImgUrl: {
            control: { type: 'text' },
            description: '생성자 프로필 이미지 URL',
        },
        openStatus: {
            control: { type: 'select' },
            options: ['waiting', 'finished', 'progressing', 'canceled'],
            description: '팬팔 진행 상태',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        createUser: '팬클럽회장',
        title: '아이돌 팬미팅',
        location: '서울 강남구',
        date: Math.floor(Date.now() / 1000) + 86400, // 내일
        deadLine: Math.floor(Date.now() / 1000) + 43200, // 12시간 후 마감
        minPerson: 5,
        maxPerson: 10,
        currentPerson: 7,
        wishList: false,
        articleId: 1,
        createUserProfileImgUrl:
            'https://randomuser.me/api/portraits/women/75.jpg',
        openStatus: 'PENDING_STATUS',
    },
};

export const AllStates: Story = {
    render: () => (
        <div className="p-8 flex  gap-10 min-h-screen">
            <MockContainerInformation
                createUser="팬클럽회장"
                title="아이돌 팬미팅"
                location="서울 강남구"
                date={Math.floor(Date.now() / 1000) + 86400}
                deadLine={Math.floor(Date.now() / 1000) + 43200}
                minPerson={5}
                maxPerson={10}
                currentPerson={7}
                wishList={false}
                articleId={1}
                createUserProfileImgUrl="https://randomuser.me/api/portraits/women/75.jpg"
                openStatus="PENDING_STATUS"
            />
            <MockContainerInformation
                createUser="팬클럽회장"
                title="아이돌 팬미팅"
                location="서울 강남구"
                date={Math.floor(Date.now() / 1000) + 86400}
                deadLine={Math.floor(Date.now() / 1000) + 43200}
                minPerson={5}
                maxPerson={10}
                currentPerson={7}
                wishList={true}
                articleId={1}
                createUserProfileImgUrl="https://randomuser.me/api/portraits/women/75.jpg"
                openStatus="PROGRESSING_STATUS"
            />
            <MockContainerInformation
                createUser="팬클럽회장"
                title="아이돌 팬미팅"
                location="서울 강남구"
                date={Math.floor(Date.now() / 1000) + 86400}
                deadLine={Math.floor(Date.now() / 1000) + 43200}
                minPerson={5}
                maxPerson={10}
                currentPerson={7}
                wishList={true}
                articleId={1}
                createUserProfileImgUrl="https://randomuser.me/api/portraits/women/75.jpg"
                openStatus="CONFIRMED_STATUS"
            />
            <MockContainerInformation
                createUser="팬클럽회장"
                title="아이돌 팬미팅"
                location="서울 강남구"
                date={Math.floor(Date.now() / 1000) + 86400}
                deadLine={Math.floor(Date.now() / 1000) + 43200}
                minPerson={5}
                maxPerson={10}
                currentPerson={7}
                wishList={true}
                articleId={1}
                createUserProfileImgUrl="https://randomuser.me/api/portraits/women/75.jpg"
                openStatus="CANCELED_STATUS"
            />
        </div>
    ),
};
