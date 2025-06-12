import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import SignupForm from '../app/(auth)/signup/SignupForm';

// SVG 아이콘들을 mock으로 처리
jest.mock('../assets', () => ({
    VisibilityOffIcon: 'svg',
    VisibilityOnIcon: 'svg',
}));

// Mock 설정
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
}));

jest.mock('../hooks/useMediaQuery', () => ({
    __esModule: true,
    default: jest.fn(() => false),
}));

jest.mock('../hooks/queries/useAuth', () => ({
    useSignup: jest.fn(() => ({
        mutate: jest.fn(),
    })),
    useCheckUserId: jest.fn(() => ({
        mutateAsync: jest.fn().mockResolvedValue({ statusCode: 200 }),
    })),
}));

// 테스트 유틸리티
const renderSignupForm = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });

    return render(
        <QueryClientProvider client={queryClient}>
            <SignupForm />
        </QueryClientProvider>
    );
};
const inputFields = [
    '닉네임을 입력해주세요',
    '이메일을 입력해주세요',
    '비밀번호를 입력해주세요',
    '비밀번호를 다시 한 번 입력해주세요',
];
describe('회원가입 폼 기본 렌더링 테스트', () => {
    test('회원가입 폼이 화면에 렌더링된다', () => {
        renderSignupForm();

        // 회원가입 제목이 있는지 확인
        expect(screen.getByText('회원가입')).toBeInTheDocument();
    });

    test('필수 입력 필드들이 모두 렌더링된다', () => {
        renderSignupForm();

        // placeholder로 입력 필드들 찾기
        inputFields.forEach((field) => {
            expect(screen.getByPlaceholderText(field)).toBeInTheDocument();
        });
    });

    test('회원가입 버튼이 렌더링된다', () => {
        renderSignupForm();
        expect(
            screen.getByRole('button', { name: '확인' })
        ).toBeInTheDocument();
    });
});
describe('회원가입 폼 포커스 테스트', () => {
    test('입력 필드에 포커스가 되는지 확인', async () => {
        const user = userEvent.setup();
        renderSignupForm();
        inputFields.forEach(async (field) => {
            const input = screen.getByPlaceholderText(field);
            await user.click(input);
            expect(input).toHaveFocus();
        });
    });
    test('입력 필드에 포커스 후 Tab 키를 누르면 다음 필드로 이동하는지 확인', async () => {
        const user = userEvent.setup();
        renderSignupForm();
        const inputs = screen.getByPlaceholderText(inputFields[0]);
        const nextInput = screen.getByPlaceholderText(inputFields[1]);
        await user.click(inputs);
        await user.tab();
        expect(nextInput).toHaveFocus();
    });
});
