import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignupForm from '../app/(auth)/signup/SignupForm';

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

describe('회원가입 폼 상호작용 테스트', () => {
    describe('폼 렌더링 및 초기 상태', () => {
        test('모든 입력 필드와 버튼이 올바르게 렌더링된다', () => {
            renderSignupForm();

            // 제목 확인
            expect(screen.getByText('회원가입')).toBeInTheDocument();

            // 입력 필드들 확인
            expect(screen.getByPlaceholderText('닉네임')).toBeInTheDocument();
            expect(
                screen.getByPlaceholderText('이메일을 입력해주세요')
            ).toBeInTheDocument();
            expect(
                screen.getByPlaceholderText('비밀번호를 입력해주세요')
            ).toBeInTheDocument();
            expect(
                screen.getByPlaceholderText(
                    '비밀번호를 다시 한 번 입력해주세요'
                )
            ).toBeInTheDocument();

            // 버튼 확인
            expect(
                screen.getByRole('button', { name: '확인' })
            ).toBeInTheDocument();

            // 링크 확인
            expect(screen.getByText('이미 회원이신가요?')).toBeInTheDocument();
            expect(screen.getByText('로그인')).toBeInTheDocument();
        });

        test('초기 상태에서 확인 버튼이 비활성화되어 있다', () => {
            renderSignupForm();

            const submitButton = screen.getByRole('button', { name: '확인' });
            expect(submitButton).toBeDisabled();
        });
    });

    describe('포커스 이동 테스트', () => {
        test('Tab 키로 입력 필드 간 포커스가 순서대로 이동한다', async () => {
            const user = userEvent.setup();
            renderSignupForm();

            const nicknameInput = screen.getByPlaceholderText('닉네임');
            const emailInput =
                screen.getByPlaceholderText('이메일을 입력해주세요');
            const passwordInput =
                screen.getByPlaceholderText('비밀번호를 입력해주세요');
            const passwordCheckInput = screen.getByPlaceholderText(
                '비밀번호를 다시 한 번 입력해주세요'
            );
            const submitButton = screen.getByRole('button', { name: '확인' });

            // 첫 번째 필드에 포커스
            await user.click(nicknameInput);
            expect(nicknameInput).toHaveFocus();

            // Tab으로 다음 필드로 이동
            await user.tab();
            expect(emailInput).toHaveFocus();

            await user.tab();
            expect(passwordInput).toHaveFocus();

            await user.tab();
            expect(passwordCheckInput).toHaveFocus();

            await user.tab();
            expect(submitButton).toHaveFocus();
        });

        test('Enter 키로 다음 필드로 포커스가 이동한다', async () => {
            const user = userEvent.setup();
            renderSignupForm();

            const nicknameInput = screen.getByPlaceholderText('닉네임');
            const emailInput =
                screen.getByPlaceholderText('이메일을 입력해주세요');

            await user.click(nicknameInput);
            await user.type(nicknameInput, 'testuser');
            await user.keyboard('{Enter}');

            expect(emailInput).toHaveFocus();
        });
    });

    describe('입력 상호작용 테스트', () => {
        test('닉네임 입력이 올바르게 작동한다', async () => {
            const user = userEvent.setup();
            renderSignupForm();

            const nicknameInput = screen.getByPlaceholderText('닉네임');

            await user.type(nicknameInput, '테스트유저');
            expect(nicknameInput).toHaveValue('테스트유저');
        });

        test('이메일 입력이 올바르게 작동한다', async () => {
            const user = userEvent.setup();
            renderSignupForm();

            const emailInput =
                screen.getByPlaceholderText('이메일을 입력해주세요');

            await user.type(emailInput, 'test@example.com');
            expect(emailInput).toHaveValue('test@example.com');
        });

        test('비밀번호 입력이 마스킹되어 표시된다', async () => {
            const user = userEvent.setup();
            renderSignupForm();

            const passwordInput =
                screen.getByPlaceholderText('비밀번호를 입력해주세요');

            await user.type(passwordInput, 'password123');
            expect(passwordInput).toHaveAttribute('type', 'password');
            expect(passwordInput).toHaveValue('password123');
        });

        test('입력 필드를 지우고 다시 입력할 수 있다', async () => {
            const user = userEvent.setup();
            renderSignupForm();

            const nicknameInput = screen.getByPlaceholderText('닉네임');

            // 입력
            await user.type(nicknameInput, 'wrongname');
            expect(nicknameInput).toHaveValue('wrongname');

            // 지우기
            await user.clear(nicknameInput);
            expect(nicknameInput).toHaveValue('');

            // 다시 입력
            await user.type(nicknameInput, 'correctname');
            expect(nicknameInput).toHaveValue('correctname');
        });
    });

    describe('실시간 검증 테스트', () => {
        test('이메일 형식이 틀리면 에러 메시지가 표시된다', async () => {
            const user = userEvent.setup();
            renderSignupForm();

            const emailInput =
                screen.getByPlaceholderText('이메일을 입력해주세요');

            await user.type(emailInput, 'invalid-email');
            await user.tab(); // blur 이벤트 발생

            await waitFor(() => {
                expect(
                    screen.getByText('이메일 형식에 맞지 않습니다.')
                ).toBeInTheDocument();
            });
        });

        test('비밀번호가 8자 미만이면 에러 메시지가 표시된다', async () => {
            const user = userEvent.setup();
            renderSignupForm();

            const passwordInput =
                screen.getByPlaceholderText('비밀번호를 입력해주세요');

            await user.type(passwordInput, '1234567'); // 7자
            await user.tab(); // blur 이벤트 발생

            await waitFor(() => {
                expect(
                    screen.getByText('비밀번호는 8자 이상이어야 합니다.')
                ).toBeInTheDocument();
            });
        });

        test('필수 필드가 비어있으면 에러 메시지가 표시된다', async () => {
            const user = userEvent.setup();
            renderSignupForm();

            const nicknameInput = screen.getByPlaceholderText('닉네임');

            await user.click(nicknameInput);
            await user.tab(); // 포커스 후 바로 벗어남

            await waitFor(() => {
                expect(
                    screen.getByText('닉네임을 입력해주세요')
                ).toBeInTheDocument();
            });
        });
    });

    describe('버튼 상태 테스트', () => {
        test('모든 필드가 유효하게 입력되면 확인 버튼이 활성화된다', async () => {
            const user = userEvent.setup();
            renderSignupForm();

            // 모든 필드 입력
            await user.type(screen.getByPlaceholderText('닉네임'), 'testuser');
            await user.type(
                screen.getByPlaceholderText('이메일을 입력해주세요'),
                'test@example.com'
            );
            await user.type(
                screen.getByPlaceholderText('비밀번호를 입력해주세요'),
                'password123'
            );
            await user.type(
                screen.getByPlaceholderText(
                    '비밀번호를 다시 한 번 입력해주세요'
                ),
                'password123'
            );

            await waitFor(() => {
                const submitButton = screen.getByRole('button', {
                    name: '확인',
                });
                expect(submitButton).not.toBeDisabled();
            });
        });

        test('하나라도 유효하지 않으면 확인 버튼이 비활성화된다', async () => {
            const user = userEvent.setup();
            renderSignupForm();

            // 일부 필드만 입력
            await user.type(screen.getByPlaceholderText('닉네임'), 'testuser');
            await user.type(
                screen.getByPlaceholderText('이메일을 입력해주세요'),
                'invalid-email'
            ); // 잘못된 형식

            const submitButton = screen.getByRole('button', { name: '확인' });
            expect(submitButton).toBeDisabled();
        });
    });

    describe('링크 테스트', () => {
        test('로그인 링크가 올바른 경로를 가리킨다', () => {
            renderSignupForm();

            const loginLink = screen.getByText('로그인');
            expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
        });
    });
});
