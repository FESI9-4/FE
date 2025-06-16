import { fetchInstance } from '@/utils/apis/fetchInstance';
import { NextRequest, NextResponse } from 'next/server';
import { SignupMemberRequestDto } from '@/types/auth';

export async function POST(request: NextRequest) {
    try {
        const { email, password, nickname } =
            (await request.json()) as SignupMemberRequestDto;
        await fetchInstance('/api/auth/signup', {
            method: 'POST',
            body: { email, password, nickname },
        });
        return NextResponse.json({ message: '회원가입 성공' }, { status: 200 });
    } catch {
        return NextResponse.json({ message: '회원가입 실패' }, { status: 409 });
    }
}
