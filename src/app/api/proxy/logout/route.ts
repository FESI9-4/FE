import { fetchInstance } from '@/utils/apis/fetchInstance';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    const cookieStore = await cookies();
    await fetchInstance('/api/auth/logout', {
        method: 'POST',
        returnFullResponse: true,
    });
    cookieStore.delete('refreshToken');
    cookieStore.delete('accessToken');
    return NextResponse.json({ status: 200, message: '로그아웃 성공' });
}
