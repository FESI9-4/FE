import type { Meta, StoryObj } from '@storybook/nextjs';
import Image from 'next/image';
import dateConverter from '@/utils/dateConverter';
import Profile from '@/components/ui/Profile';
import ContainerProgress from '@/components/ui/ContainerProgress';
import Like from '@/components/ui/Like';
import Tag from '@/components/ui/Tag';
import { HandIcon } from '@/assets';

interface CardListProps {
    title: string;
    location: string;
    date: number;
    deadLine: number;
    currentPerson: number;
    maxPerson: number;
    openStatus:
        | 'PENDING_STATUS'
        | 'CONFIRMED_STATUS'
        | 'PROGRESSING_STATUS'
        | 'CANCELED_STATUS';
    wishList?: boolean;
    image: string;
    createUser: string;
    createUserProfileImg: string;
    onLikeClick?: (event: React.MouseEvent, isLiked: boolean) => void;
    articleId: number;
}

// CardList과 똑같은 구조의 컴포넌트 (useGetUser 없이)
const MockCardList = ({
    title,
    location,
    date,
    deadLine,
    currentPerson,
    maxPerson,
    openStatus,
    image,
    createUser,
    createUserProfileImg,
    onLikeClick,
    wishList = true,
}: CardListProps) => {
    const convertedDate = dateConverter(Number(date), 'korea');
    const convertedDeadLine = dateConverter(Number(deadLine), 'korea-short');

    // 임시로 찜 상태 관리
    const isLiked = false;

    const handleLikeClick = async (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        console.log('좋아요 클릭');
        onLikeClick?.(event, !isLiked);
    };

    const getDeadlineText = () => {
        if (!deadLine) return null;

        const now = new Date();
        const deadline = new Date(deadLine * 1000);

        const nowDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );
        const deadlineDate = new Date(
            deadline.getFullYear(),
            deadline.getMonth(),
            deadline.getDate()
        );

        if (nowDate.getTime() === deadlineDate.getTime()) {
            const deadlineHour = deadline.getHours();
            return `오늘 ${deadlineHour}시 마감`;
        }

        return null;
    };

    return (
        <div className="w-full flex flex-col sm:flex-row sm:py-3 sm:pl-3 sm:pr-6 sm:gap-6 gap-0 sm:min-h-67.5 min-h-97 hover:bg-gray-900 active:opacity-50 hover:cursor-pointer">
            <div className="w-full sm:w-1/4 relative h-50 sm:h-auto">
                <Image src={image} alt="image" fill objectFit="cover" />
                {openStatus === 'CONFIRMED_STATUS' && (
                    <div className="absolute bg-black/80 w-full h-full flex flex-col justify-center items-center gap-6">
                        <HandIcon width={32} height={32} />
                        <div className="flex justify-center items-center text-gray-100 text-sm text-center">
                            모집이 마감되었어요.
                            <br />
                            다음기회에 만나요!
                        </div>
                    </div>
                )}
                {getDeadlineText() && <Tag>{getDeadlineText()}</Tag>}
            </div>
            <div className="sm:w-3/4 w-full flex flex-col justify-between pt-5.5 sm:gap-0 gap-5">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1 text-sm">
                            <div className="flex gap-2  text-gray-400 items-center">
                                <div className="text-xl font-semibold text-white">
                                    {title}
                                </div>
                                <div className="hidden sm:block">|</div>
                                <div className="font-medium hidden sm:block">
                                    {location}
                                </div>
                            </div>
                            <div className="flex sm:text-white text-gray-400 items-center font-normal gap-2">
                                <div className="font-medium sm:hidden">
                                    {location}
                                </div>
                                <div className="sm:hidden">|</div>
                                {convertedDate}
                            </div>
                        </div>
                        <div className="flex gap-2 text-sm text-gray-400 items-center">
                            <Profile
                                size="small"
                                image={createUserProfileImg}
                            />
                            <p>{createUser}</p>
                        </div>
                    </div>
                    {wishList && (
                        <div>
                            <Like like={isLiked} onClick={handleLikeClick} />
                        </div>
                    )}
                </div>
                <ContainerProgress
                    current={currentPerson}
                    max={maxPerson}
                    openStatus={openStatus}
                    deadLine={convertedDeadLine}
                />
            </div>
        </div>
    );
};

const meta: Meta<typeof MockCardList> = {
    title: 'UI/CardList',
    component: MockCardList,
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
            options: [
                'PENDING_STATUS',
                'CONFIRMED_STATUS',
                'PROGRESSING_STATUS',
                'CANCELED_STATUS',
            ],
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
        openStatus: 'PENDING_STATUS',
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
        <div className="p-8 flex flex-col gap-10 min-h-screen">
            <div>
                <h3 style={{ color: 'white', marginBottom: '8px' }}>모집 중</h3>
                <MockCardList
                    title="아이브 콘서트"
                    location="서울"
                    date={futureDate}
                    deadLine={deadline}
                    currentPerson={2}
                    maxPerson={4}
                    openStatus="PENDING_STATUS"
                    wishList={false}
                    image="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"
                    createUser="아이브팬123"
                    createUserProfileImg="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
                    articleId={1}
                />
            </div>

            <div>
                <h3 style={{ color: 'white', marginBottom: '8px' }}>진행 중</h3>
                <MockCardList
                    title="뉴진스 팬미팅"
                    location="부산"
                    date={futureDate}
                    deadLine={deadline}
                    currentPerson={3}
                    maxPerson={4}
                    openStatus="PROGRESSING_STATUS"
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
                <MockCardList
                    title="르세라핌 콘서트"
                    location="대구"
                    date={futureDate}
                    deadLine={deadline}
                    currentPerson={4}
                    maxPerson={4}
                    openStatus="CONFIRMED_STATUS"
                    wishList={false}
                    image="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop"
                    createUser="르세라핌팬"
                    createUserProfileImg="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                    articleId={3}
                />
            </div>
            <div>
                <h3 style={{ color: 'white', marginBottom: '8px' }}>
                    모집 취소
                </h3>
                <MockCardList
                    title="르세라핌 콘서트"
                    location="대구"
                    date={futureDate}
                    deadLine={deadline}
                    currentPerson={4}
                    maxPerson={4}
                    openStatus="CANCELED_STATUS"
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
