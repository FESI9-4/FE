import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://www.kopis.or.kr/openApi/restful/pblprfr';
const SERVICE_KEY = process.env.NEXT_PUBLIC_KOPIS_SERVICE_KEY;

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const queryString = searchParams.toString();

        if (searchParams.get('id')) {
            const id = searchParams.get('id');
            const response = await fetch(
                `${BASE_URL}/${id}?service=${SERVICE_KEY}&${queryString}`
            );
            const data = await response.text();
            return NextResponse.json(data);
        }

        const response = await fetch(
            `${BASE_URL}?service=${SERVICE_KEY}&${queryString}`
        );
        const data = await response.text();
        return NextResponse.json(data);
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
