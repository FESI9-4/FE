import type { Meta, StoryObj } from '@storybook/nextjs';
import ContainerInformation from '@/components/ui/ContainerInformation';

const meta: Meta<typeof ContainerInformation> = {
    title: 'UI/ContainerInformation',
    component: ContainerInformation,
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
            control: { type: 'text' },
            description: '진행 날짜 (Unix timestamp 문자열)',
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
            description: '찜하기 상태',
        },
        articleId: {
            control: { type: 'number' },
            description: '게시글 ID',
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
    },
};

export const AllStates: Story = {
    render: () => (
        <div className="p-8 flex gap-10 min-h-screen">
            <ContainerInformation
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
                openStatus="waiting"
            />
            <ContainerInformation
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
                openStatus="progressing"
            />
        </div>
    ),
};
