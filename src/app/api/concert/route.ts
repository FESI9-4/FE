import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://www.kopis.or.kr/openApi/restful/pblprfr';
const SERVICE_KEY = process.env.NEXT_PUBLIC_KOPIS_SERVICE_KEY;

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const stdate = searchParams.get('stdate');
        const eddate = searchParams.get('eddate');
        const capge = searchParams.get('capge');
        const rows = searchParams.get('rows');

        if (!stdate || !eddate || !capge || !rows) {
            return NextResponse.json(
                { error: 'Missing required parameters' },
                { status: 400 }
            );
        }

        const response = await fetch(
            `${BASE_URL}?service=${SERVICE_KEY}&stdate=${stdate}&eddate=${eddate}&cpage=${capge}&rows=${rows}&shcate=CCCD`
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
