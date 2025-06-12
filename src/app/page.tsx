'use client';

import { useState, useEffect } from 'react';
import { TabSection, FilterSection, CardSection } from '@/components/main';
import { CATEGORY_DATA } from '@/types/categories';
import { boardApi } from '@/utils/apis/boardApi';
import { Card } from '@/types/card';

export default function Home() {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
    const [selectedRegion, setSelectedRegion] = useState<string>('전체');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSortOption, setSelectedSortOption] = useState<
        'recent' | 'deadline' | 'person'
    >('recent');

    const [sortAsc, setSortAsc] = useState<boolean>(false);

    const [articles, setArticles] = useState<Card[]>([]);

    useEffect(() => {
        async function fetchArticles() {
            const bigCategory = CATEGORY_DATA[activeTab].id;

            try {
                const response = await boardApi.getArticles({
                    bigCategory,
                    smallCategory:
                        selectedCategory === 'ALL' ? '' : selectedCategory,
                    location: selectedRegion === '전체' ? '' : selectedRegion,
                    date: selectedDate
                        ? Math.floor(selectedDate.getTime() / 1000)
                        : Math.floor(Date.now() / 1000),

                    sort: selectedSortOption,
                    sortAsc,
                    lastArticleId: 0,
                    limit: 10,
                });
                setArticles(response.data);
            } catch (error) {
                console.error('게시글 불러오기 실패:', error);
                setArticles([]);
            }
        }

        fetchArticles();
    }, [
        activeTab,
        selectedCategory,
        selectedRegion,
        selectedDate,
        selectedSortOption,
        sortAsc,
    ]);

    useEffect(() => {
        setSelectedCategory('ALL');
    }, [activeTab]);

    return (
        <div className="w-full px-4 sm:px-6 pt-6 sm:pt-5 xl:pt-8 flex justify-center min-w-93.75 min-h-screen max-w-249 m-auto ">
            <div className="w-full flex flex-col gap-4 sm:gap-8 xl:gap-10 mt-13.25 sm:mt-16 xl:mt-18.25 ">
                <TabSection
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    showCreateButton={true}
                />
                <FilterSection
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedSortOption={selectedSortOption}
                    setSelectedSortOption={setSelectedSortOption}
                    setSortAsc={setSortAsc}
                />
                <CardSection cards={articles} />
            </div>
        </div>
    );
}
