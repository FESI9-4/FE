import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignupForm from '../app/(auth)/signup/SignupForm';
import userEvent from '@testing-library/user-event';

// Mock 설정
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
}));

jest.mock('../hooks/useMediaQuery', () => ({
    __esModule: true,
    default: jest.fn(() => false), // 데스크톱 모드
}));

jest.mock('../hooks/queries/useAuth', () => ({
    useSignup: jest.fn(() => ({
        mutate: jest.fn(),
    })),
    useCheckUserId: jest.fn(() => ({
        mutateAsync: jest.fn().mockResolvedValue({ statusCode: 200 }),
    })),
}));

jest.mock('../assets', () => ({
    __esModule: true,
    default: {},
    VisibilityOffIcon: () => 'svg',
    VisibilityOnIcon: () => 'svg',
}));
// 테스트 유틸리티
const createTestQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });
};

const renderSignupForm = () => {
    const queryClient = createTestQueryClient();
    return render(
        <QueryClientProvider client={queryClient}>
            <SignupForm />
        </QueryClientProvider>
    );
};

// 입력 필드들을 배열로 정리
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
    test('회원가입 폼 입력 필드가 렌더링된다', () => {
        renderSignupForm();
        // 회원가입 폼 입력 필드가 렌더링된다
        inputFields.forEach((placeholder) => {
            expect(
                screen.getByPlaceholderText(placeholder)
            ).toBeInTheDocument();
        });
    });
    test('회원가입 버튼이 렌더링된다', () => {
        renderSignupForm();
        // 확인 버튼이 있는지 확인
        expect(
            screen.getByRole('button', { name: '확인' })
        ).toBeInTheDocument();
    });
});
describe('회원가입 폼 입력 필드 테스트', () => {
    describe('입력 필드에 포커스 테스트', () => {
        test('입력 필드에 포커스가 되는지 테스트', async () => {
            const user = userEvent.setup();
            renderSignupForm();
            for (const placeholder of inputFields) {
                const input = screen.getByPlaceholderText(placeholder);
                await user.click(input);
                expect(input).toHaveFocus();
            }
        });
        test('Tab 키를 누르면 다음 필드로 이동하는지 테스트', async () => {
            const user = userEvent.setup();
            renderSignupForm();
            const nicknameInput = screen.getByPlaceholderText(inputFields[0]);
            await user.click(nicknameInput);
            expect(nicknameInput).toHaveFocus();
            await user.tab();
            const emailInput = screen.getByPlaceholderText(inputFields[1]);
            expect(emailInput).toHaveFocus();
            await user.tab();
            const passwordInput = screen.getByPlaceholderText(inputFields[2]);
            expect(passwordInput).toHaveFocus();
            await user.tab(); // 비밀번호 숨기기 버튼 때문에 탭 2번
            await user.tab();
            const passwordConfirmInput = screen.getByPlaceholderText(
                inputFields[3]
            );
            expect(passwordConfirmInput).toHaveFocus();
            await user.tab();
            await user.tab();
            const button = screen.getByRole('button', { name: '확인' });
            expect(button).toHaveFocus();
        });
    });
    describe('입력 필드 기본 기능 테스트', () => {
        test('닉네임 필드 입력 테스트', async () => {
            const user = userEvent.setup();
            renderSignupForm();
            const nicknameInput = screen.getByPlaceholderText(inputFields[0]);
            await user.type(nicknameInput, 'test');
            expect(nicknameInput).toHaveValue('test');
        });

        test('이메일 필드 입력 테스트', async () => {
            const user = userEvent.setup();
            renderSignupForm();
            const emailInput = screen.getByPlaceholderText(inputFields[1]);
            await user.type(emailInput, 'test@example.com');
            expect(emailInput).toHaveValue('test@example.com');
        });

        test('비밀번호 필드 입력 테스트', async () => {
            const user = userEvent.setup();
            renderSignupForm();
            const passwordInput = screen.getByPlaceholderText(inputFields[2]);
            await user.type(passwordInput, 'password123!');
            expect(passwordInput).toHaveValue('password123!');
        });

        test('비밀번호 확인 필드 입력 테스트', async () => {
            const user = userEvent.setup();
            renderSignupForm();
            const passwordCheckInput = screen.getByPlaceholderText(
                inputFields[3]
            );
            await user.type(passwordCheckInput, 'password123!');
            expect(passwordCheckInput).toHaveValue('password123!');
        });
    });
    describe('입력 필드 유효성 검사 테스트', () => {
        test('닉네임 유효성 검사', async () => {
            const user = userEvent.setup();
            renderSignupForm();
            const nicknameInput = screen.getByPlaceholderText(inputFields[0]);
            await user.type(nicknameInput, '123');
            await user.tab();
            await waitFor(() => {
                expect(screen.getByText(/닉네임은 3-5자/)).toBeInTheDocument();
            });
        });
        test('이메일 유효성 검사', async () => {
            const user = userEvent.setup();
            renderSignupForm();

            const emailInput = screen.getByPlaceholderText(inputFields[1]);
            await user.type(emailInput, 'invalid-email');
            await user.tab(); // 포커스 이동으로 유효성 검사 트리거

            // 에러 메시지 확인
            await waitFor(() => {
                expect(screen.getByText(/올바른 이메일/)).toBeInTheDocument();
            });
        });

        test('비밀번호 유효성 검사', async () => {
            const user = userEvent.setup();
            renderSignupForm();

            const passwordInput = screen.getByPlaceholderText(inputFields[2]);
            await user.type(passwordInput, 'weak');
            await user.tab();

            await waitFor(() => {
                expect(
                    screen.getByText(/비밀번호는 8-16자/)
                ).toBeInTheDocument();
            });
        });
    });
});
