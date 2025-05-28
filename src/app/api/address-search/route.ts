import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json(
            { error: 'Query parameter is required.' },
            { status: 400 }
        );
    }

    try {
        const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;
        console.log('KAKAO_REST_API_KEY:', KAKAO_REST_API_KEY);

        const kakaoRes = await fetch(
            `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}`,
            {
                headers: {
                    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
                },
            }
        );

        const data = await kakaoRes.json();
        console.log('응답 상태 코드:', kakaoRes.status);
        console.log('응답 본문:', data);

        if (!kakaoRes.ok) {
            return NextResponse.json(data, { status: kakaoRes.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Kakao API 호출 중 오류 발생:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
