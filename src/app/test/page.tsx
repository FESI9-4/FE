'use client';

import React from 'react';

import ContainerInformation from '@/components/ui/ContainerInformation';

export default function DropdownTestPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 p-4 min-w-86" >
            <>
                <ContainerInformation
                    owner="정재형"
                    title="마감된 버스"
                    location="양평에서"
                    actionDate="1747698000"
                    limitedDate="1748140799"
                    minPeople={10}
                    maxPeople={20}
                    currentPeople={15}
                />

                <ContainerInformation
                    owner="정재형"
                    title="모집 중인 버스"
                    location="양평에서"
                    actionDate="1748385600"
                    limitedDate="1748639999"
                    minPeople={10}
                    maxPeople={20}
                    currentPeople={15}
                />

                <ContainerInformation
                    owner="정재형"
                    title="모집 대기 중인 버스"
                    location="양평에서"
                    actionDate="1748385600"
                    limitedDate="1748639999"
                    minPeople={10}
                    maxPeople={20}
                    currentPeople={5}
                />
            </>
        </div>
    );
}
