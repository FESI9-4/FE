'use client';
import { FormEvent } from 'react';
import BoxSelect from '@/components/ui/BoxSelect';
import { CATEGORY_DATA } from '@/types/categories';

function BoxPage() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const serviceValue = formData.get('selectedCategory'); // "GO_TYPE_BUSRENTAL_TYPE"
        console.log(serviceValue);
    };
    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <form onSubmit={handleSubmit}>
                <BoxSelect categories={CATEGORY_DATA} />
                <button type="submit">제출</button>
            </form>
        </div>
    );
}

export default BoxPage;
