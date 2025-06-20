import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MyCardList from '@/components/ui/MyCardList';

const meta: Meta<typeof MyCardList> = {
    title: 'UI/MyCardList',
    component: MyCardList,
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: 'dark',
            values: [
                { name: 'dark', value: '#1a1a1a' },
                { name: 'light', value: '#ffffff' },
            ],
        },
        docs: {
            description: {
                component: '내가 참여한 팬팔들을 표시하는 컴포넌트입니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: { type: 'text' },
        },
        location: {
            control: { type: 'text' },
        },
        date: {
            control: { type: 'number' },
        },
        currentPerson: {
            control: { type: 'number', min: 0 },
        },
        maxPerson: {
            control: { type: 'number', min: 1 },
        },
        openStatus: {
            control: { type: 'select' },
            options: ['waiting', 'finished', 'progressing', 'canceled'],
        },
        useStatus: {
            control: { type: 'select' },
            options: ['schedule', 'done'],
        },
        image: {
            control: { type: 'text' },
        },
        createUser: {
            control: { type: 'text' },
        },
        createUserProfileImg: {
            control: { type: 'text' },
        },
        buttonOnClick: {
            description: '버튼 클릭 시 실행되는 함수',
            action: '펜팔 상세 페이지로 이동',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <MyCardList {...args} />
            </div>
        </div>
    ),
    args: {
        title: '아이돌 팬미팅',
        location: '서울',
        date: Math.floor(Date.now() / 1000) + 86400, // 내일
        currentPerson: 8,
        maxPerson: 10,
        openStatus: 'progressing',
        image: 'https://picsum.photos/400/300?random=1',
        createUser: '팬클럽회장',
        createUserProfileImg:
            'https://randomuser.me/api/portraits/women/75.jpg',
        useStatus: 'UPCOMING',
        buttonOnClick: () => console.log('버튼 클릭'),
    },
};

export const AllStates: Story = {
    render: () => (
        <div className="p-8 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* 이용 예정 - 진행 중 */}
                <div>
                    <h3 className="text-white text-lg mb-4">
                        이용 예정 - 진행 중
                    </h3>
                    <MyCardList
                        title="콘서트 관람"
                        location="부산"
                        date={Math.floor(Date.now() / 1000) + 86400}
                        currentPerson={5}
                        maxPerson={8}
                        openStatus="progressing"
                        image="https://picsum.photos/400/300?random=2"
                        createUser="콘서트매니아"
                        createUserProfileImg="https://randomuser.me/api/portraits/men/32.jpg"
                        useStatus="UPCOMING"
                        buttonOnClick={() => console.log('참여 취소')}
                    />
                </div>

                {/* 이용 예정 - 모집 대기 */}
                <div>
                    <h3 className="text-white text-lg mb-4">
                        이용 예정 - 모집 대기
                    </h3>
                    <MyCardList
                        title="팬사인회 동행"
                        location="대구"
                        date={Math.floor(Date.now() / 1000) + 172800}
                        currentPerson={3}
                        maxPerson={6}
                        openStatus="waiting"
                        image="https://picsum.photos/400/300?random=3"
                        createUser="사인회러버"
                        createUserProfileImg="https://randomuser.me/api/portraits/women/44.jpg"
                        useStatus="UPCOMING"
                        buttonOnClick={() => console.log('참여 취소')}
                    />
                </div>

                {/* 이용 예정 - 모집 완료 */}
                <div>
                    <h3 className="text-white text-lg mb-4">
                        이용 예정 - 모집 완료
                    </h3>
                    <MyCardList
                        title="굿즈 공동구매"
                        location="온라인"
                        date={Math.floor(Date.now() / 1000) + 259200}
                        currentPerson={10}
                        maxPerson={10}
                        openStatus="finished"
                        image="https://picsum.photos/400/300?random=4"
                        createUser="굿즈수집가"
                        createUserProfileImg="https://randomuser.me/api/portraits/men/67.jpg"
                        useStatus="UPCOMING"
                        buttonOnClick={() => console.log('참여 취소')}
                    />
                </div>

                {/* 이용 예정 - 취소됨 */}
                <div>
                    <h3 className="text-white text-lg mb-4">
                        이용 예정 - 취소됨
                    </h3>
                    <MyCardList
                        title="해외 콘서트 투어"
                        location="도쿄"
                        date={Math.floor(Date.now() / 1000) + 345600}
                        currentPerson={2}
                        maxPerson={8}
                        openStatus="canceled"
                        image="https://picsum.photos/400/300?random=5"
                        createUser="해외팬"
                        createUserProfileImg="https://randomuser.me/api/portraits/women/25.jpg"
                        useStatus="UPCOMING"
                        buttonOnClick={() => console.log('삭제하기')}
                    />
                </div>

                {/* 이용 완료 */}
                <div>
                    <h3 className="text-white text-lg mb-4">이용 완료</h3>
                    <MyCardList
                        title="팬미팅 참석"
                        location="서울"
                        date={Math.floor(Date.now() / 1000) - 86400} // 어제
                        currentPerson={12}
                        maxPerson={12}
                        openStatus="finished"
                        image="https://picsum.photos/400/300?random=6"
                        createUser="팬미팅조직자"
                        createUserProfileImg="https://randomuser.me/api/portraits/women/80.jpg"
                        useStatus="COMPLETED"
                        buttonOnClick={() => console.log('완료된 활동')}
                    />
                </div>
            </div>
        </div>
    ),
};
