'use client';

import { Tab } from '@/components/ui';
import {
    MyCardListContainer,
    CardListContainer,
    QuestionList,
    AnswerList,
} from '.';
import { useState } from 'react';

export default function TabContainer() {
    const [activeTab, setActiveTab] = useState('나의 팬팔');
    const tabs = ['나의 팬팔', '내가 만든 팬팔', '나의 질문', '나의 답변'];

    return (
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
            {activeTab === '나의 질문' && <QuestionList />}
            {activeTab === '나의 답변' && <AnswerList />}
        </div>
    );
}
