import type { Meta, StoryObj } from '@storybook/nextjs';
import CardList from '@/components/ui/CardList';

const meta: Meta<typeof CardList> = {
    title: 'UI/CardList',
    component: CardList,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    '팬팔 모집 카드 리스트 컴포넌트입니다. 모집 상태에 따라 다른 UI를 표시합니다.',
            },
        },
        backgrounds: {
            default: 'dark',
        },
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: { type: 'text' },
            description: '팬팔 제목',
        },
        location: {
            control: { type: 'text' },
            description: '위치',
        },
        date: {
            control: { type: 'number' },
            description: '날짜 (timestamp)',
        },
        deadLine: {
            control: { type: 'number' },
            description: '마감일 (timestamp)',
        },
        currentPerson: {
            control: { type: 'number' },
            description: '현재 참여 인원',
        },
        maxPerson: {
            control: { type: 'number' },
            description: '최대 참여 인원',
        },
        openStatus: {
            control: { type: 'select' },
            options: ['waiting', 'finished', 'progressing'],
            description: '모집 상태',
        },
        wishList: {
            control: { type: 'boolean' },
            description: '위시리스트 여부',
        },
        image: {
            control: { type: 'text' },
            description: '이미지 URL',
        },
        createUser: {
            control: { type: 'text' },
            description: '작성자 이름',
        },
        createUserProfileImg: {
            control: { type: 'text' },
            description: '작성자 프로필 이미지 URL',
        },
        articleId: {
            control: { type: 'number' },
            description: '게시글 ID',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 현재 시간을 기준으로 한 timestamp 생성
const now = Math.floor(Date.now() / 1000);
const futureDate = now + 86400; // 24시간 후
const deadline = now + 3600; // 1시간 후

// 기본 스토리 (모집 중)
export const Default: Story = {
    args: {
        title: '아이브 콘서트',
        location: '서울',
        date: futureDate,
        deadLine: deadline,
        currentPerson: 2,
        maxPerson: 4,
        openStatus: 'waiting',
        wishList: false,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
        createUser: '아이브팬123',
        createUserProfileImg:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
        articleId: 1,
    },
};

// 모든 상태를 보여주는 스토리
export const AllStates: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                maxWidth: '800px',
            }}
        >
            <div>
                <h3 style={{ color: 'white', marginBottom: '8px' }}>모집 중</h3>
                <CardList
                    title="아이브 콘서트"
                    location="서울"
                    date={futureDate}
                    deadLine={deadline}
                    currentPerson={2}
                    maxPerson={4}
                    openStatus="waiting"
                    wishList={false}
                    image="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"
                    createUser="아이브팬123"
                    createUserProfileImg="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
                    articleId={1}
                />
            </div>

            <div>
                <h3 style={{ color: 'white', marginBottom: '8px' }}>진행 중</h3>
                <CardList
                    title="뉴진스 팬미팅"
                    location="부산"
                    date={futureDate}
                    deadLine={deadline}
                    currentPerson={3}
                    maxPerson={4}
                    openStatus="progressing"
                    wishList={true}
                    image="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=300&fit=crop"
                    createUser="뉴진스러버"
                    createUserProfileImg="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                    articleId={2}
                />
            </div>

            <div>
                <h3 style={{ color: 'white', marginBottom: '8px' }}>
                    모집 완료
                </h3>
                <CardList
                    title="르세라핌 콘서트"
                    location="대구"
                    date={futureDate}
                    deadLine={deadline}
                    currentPerson={4}
                    maxPerson={4}
                    openStatus="finished"
                    wishList={false}
                    image="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop"
                    createUser="르세라핌팬"
                    createUserProfileImg="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                    articleId={3}
                />
            </div>
        </div>
    ),
};
