'use client';

import { EditButton } from '@/components/ui';

export default function Home() {
    return (
        <div className="text-3xl font-bold">
            <EditButton onClick={() => {}} size="large" />
            <EditButton onClick={() => {}} size="small" />
        </div>
    );
}
