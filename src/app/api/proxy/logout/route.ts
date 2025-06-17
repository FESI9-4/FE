import { fetchInstance } from '@/utils/apis/fetchInstance';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    await fetchInstance('/api/auth/logout', {
        method: 'POST',
        returnFullResponse: true,
        headers: {
            Cookie: `refreshToken=${refreshToken}`,
        },
    });
    cookieStore.delete('refreshToken');
    cookieStore.delete('accessToken');
    return NextResponse.json({ status: 200, message: '로그아웃 성공' });
}
