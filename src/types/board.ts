import { Card } from '@/types/card';

export type getListApiParams = {
    bigCategory: string;
    smallCategory?: string;
    location?: string;
    date?: number;
    sort: 'recent' | 'deadline' | 'person';
    sortAsc: boolean;
    lastArticleId: number;
    limit: number;
};

export type getListApiResponse = {
    statusCode: number;
    message: string;
    data: Card[];
};
