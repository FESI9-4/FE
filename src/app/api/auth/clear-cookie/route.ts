import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete('refreshToken');
    cookieStore.delete('accessToken');
    console.log('쿠키 삭제 완료', cookieStore.get('accessToken'));
    return NextResponse.json({ success: true });
}
