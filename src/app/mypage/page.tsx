'use client';

import { CardListContainer, MyCardListContainer } from '@/components/mypage';
import { Tab } from '@/components/ui';
import ProfileSection from '@/components/ui/ProfileSection';
import { useState } from 'react';

export default function Mypage() {
    const [activeTab, setActiveTab] = useState('나의 팬팔');
    const tabs = ['나의 팬팔', '내가 만든 팬팔', '나의 질문', '나의 답변'];

    return (
        <div className="flex justify-center items-center px-6 pt-11 overflow-auto w-full">
            <div className="w-full max-w-249 flex flex-col gap-11">
                <div className="flex flex-col gap-5">
                    <div className="text-2xl font-semibold text-white">
                        마이페이지
                    </div>
                    <div>
                        <ProfileSection />
                    </div>
                </div>
                <div className="flex flex-col gap-7.5">
                    <div className="flex">
                        {tabs.map((tab) => (
                            <div key={tab} className="w-full max-w-31">
                                <Tab
                                    active={activeTab === tab}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </Tab>
                            </div>
                        ))}
                    </div>
                    {activeTab === '나의 팬팔' && <MyCardListContainer />}
                    {activeTab === '내가 만든 팬팔' && <CardListContainer />}
                    {activeTab === '나의 질문' && <MyCardListContainer />}
                    {activeTab === '나의 답변' && <CardListContainer />}
                </div>
            </div>
        </div>
    );
}
