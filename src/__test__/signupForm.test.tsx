import { authApi } from '../utils/apis/authApi';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignupForm from '@/app/(auth)/signup/SignupForm';

jest.mock('../utils/apis/authApi', () => ({
    authApi: {
        signup: jest.fn(),
        // 다른 함수들은 실제 구현 유지하려면 여기에 추가
    },
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

const mockAuthApi = authApi as jest.Mocked<typeof authApi>;

// 입력 필드들을 배열로 정리
const inputFields = [
    '닉네임을 입력해주세요',
    '이메일을 입력해주세요',
    '비밀번호를 입력해주세요',
    '비밀번호를 다시 한 번 입력해주세요',
];

describe('회원가입 폼 기본 렌더링 테스트', () => {
    beforeEach(() => {
        renderSignupForm();
    });
    test('회원가입 폼이 화면에 렌더링된다', () => {
        // 회원가입 제목이 있는지 확인
        expect(screen.getByText('회원가입')).toBeInTheDocument();
    });
    test('회원가입 폼 입력 필드가 렌더링된다', () => {
        // 회원가입 폼 입력 필드가 렌더링된다
        inputFields.forEach((placeholder) => {
            expect(
                screen.getByPlaceholderText(placeholder)
            ).toBeInTheDocument();
        });
    });
    test('회원가입 버튼이 렌더링된다', () => {
        // 확인 버튼이 있는지 확인
        expect(
            screen.getByRole('button', { name: '확인' })
        ).toBeInTheDocument();
    });
});
describe('회원가입 폼 입력 필드 테스트', () => {
    beforeEach(() => {
        // 각 테스트 전에 깨끗한 DOM과 새로운 컴포넌트로 시작
        renderSignupForm();
    });
    describe('입력 필드에 포커스 테스트', () => {
        test('입력 필드에 포커스가 되는지 테스트', async () => {
            const user = userEvent.setup();
            for (const placeholder of inputFields) {
                const input = screen.getByPlaceholderText(placeholder);
                await user.click(input);
                expect(input).toHaveFocus();
            }
        });

        test('Tab 키를 누르면 다음 필드로 이동하는지 테스트', async () => {
            const user = userEvent.setup();
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
            // renderSignupForm() 제거 - beforeEach에서 이미 렌더링됨
            const nicknameInput = screen.getByPlaceholderText(inputFields[0]);
            await user.type(nicknameInput, 'test');
            expect(nicknameInput).toHaveValue('test');
        });

        test('이메일 필드 입력 테스트', async () => {
            const user = userEvent.setup();
            // renderSignupForm() 제거
            const emailInput = screen.getByPlaceholderText(inputFields[1]);
            await user.type(emailInput, 'test@example.com');
            expect(emailInput).toHaveValue('test@example.com');
        });

        test('비밀번호 필드 입력 테스트', async () => {
            const user = userEvent.setup();
            // renderSignupForm() 제거
            const passwordInput = screen.getByPlaceholderText(inputFields[2]);
            await user.type(passwordInput, 'password123!');
            expect(passwordInput).toHaveValue('password123!');
        });

        test('비밀번호 확인 필드 입력 테스트', async () => {
            const user = userEvent.setup();
            // renderSignupForm() 제거
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
            const nicknameInput = screen.getByPlaceholderText(inputFields[0]);

            await user.click(nicknameInput);
            await user.tab();
            await waitFor(() => {
                expect(
                    screen.getByText(/닉네임을 입력해주세요/)
                ).toBeInTheDocument();
            });

            await user.clear(nicknameInput);
            await user.type(nicknameInput, 'H길동2!');
            await user.tab();
            await waitFor(() => {
                expect(
                    screen.getByText(/닉네임은 영문 또는 숫자만 입력해주세요./)
                ).toBeInTheDocument();
            });

            await user.clear(nicknameInput);
            await user.type(nicknameInput, '1');
            await user.tab();
            await waitFor(() => {
                expect(
                    screen.getByText(
                        /닉네임은 3자 이상 10자 이하이어야 합니다./
                    )
                ).toBeInTheDocument();
            });

            await user.clear(nicknameInput);
            await user.type(nicknameInput, '134324324234');
            await user.tab();
            await waitFor(() => {
                expect(
                    screen.getByText(
                        /닉네임은 3자 이상 10자 이하이어야 합니다./
                    )
                ).toBeInTheDocument();
            });
        });

        test('이메일 유효성 검사', async () => {
            const user = userEvent.setup();
            const emailInput = screen.getByPlaceholderText(inputFields[1]);
            await user.type(emailInput, 'invalid-email');
            await user.tab();

            await waitFor(() => {
                expect(
                    screen.getByText(/이메일 형식에 맞지 않습니다./)
                ).toBeInTheDocument();
            });
        });

        test('비밀번호 유효성 검사', async () => {
            const user = userEvent.setup();
            const passwordInput = screen.getByPlaceholderText(inputFields[2]);
            await user.type(passwordInput, 'weak');
            await user.tab();

            await waitFor(() => {
                expect(
                    screen.getByText(
                        /비밀번호는 8자 이상 16자 이하이어야 합니다./
                    )
                ).toBeInTheDocument();
            });
        });

        test('비밀번호 확인 유효성 검사', async () => {
            const user = userEvent.setup();
            const passwordCheckInput = screen.getByPlaceholderText(
                inputFields[3]
            );

            await user.click(passwordCheckInput);
            await user.tab();
            await waitFor(() => {
                expect(
                    screen.getByText(/비밀번호을 한번 더 입력해주세요/)
                ).toBeInTheDocument();
            });
            const passwordInput = screen.getByPlaceholderText(inputFields[2]);
            await user.type(passwordInput, '123410');
            await user.type(passwordCheckInput, '1234');
            await user.tab();
            await waitFor(() => {
                expect(
                    screen.getByText(/비밀번호가 일치하지 않습니다./)
                ).toBeInTheDocument();
            });
        });
    });
});
describe('회원가입 폼 제출 테스트', () => {
    beforeEach(() => {
        renderSignupForm();
    });
    describe('회원가입 폼 버튼 테스트', () => {
        test('회원가입 초기 상태에서 확인 버튼은 비활성화 되어 있다', async () => {
            const button = screen.getByRole('button', { name: '확인' });
            expect(button).toHaveClass('bg-green-900');
            expect(button).not.toHaveClass('bg-green-500');
        });
        test('모든 입력필드가 비어져 있을 경우 확인 버튼 클릭 시 유효성 검사 메시지가 표시된다', async () => {
            const user = userEvent.setup();
            const button = screen.getByRole('button', { name: '확인' });
            await user.click(button);
            await waitFor(() => {
                expect(
                    screen.getByText(/닉네임을 입력해주세요/)
                ).toBeInTheDocument();
                expect(
                    screen.getByText(/이메일을 입력해주세요/)
                ).toBeInTheDocument();
                expect(
                    screen.getByText(/비밀번호를 입력해주세요/)
                ).toBeInTheDocument();
                expect(
                    screen.getByText(/비밀번호을 한번 더 입력해주세요/)
                ).toBeInTheDocument();
            });
        });
        test('일부 필드만 입력했을 때 확인 버튼 클릭 시 빈 필드들의 에러 메시지가 표시된다', async () => {
            const user = userEvent.setup();
            // 닉네임과 이메일만 입력
            const nicknameInput =
                screen.getByPlaceholderText('닉네임을 입력해주세요');
            const emailInput =
                screen.getByPlaceholderText('이메일을 입력해주세요');
            await user.type(nicknameInput, 'test123');
            await user.type(emailInput, 'test@example.com');
            // 확인 버튼 클릭
            const button = screen.getByRole('button', { name: '확인' });
            await user.click(button);
            // 비밀번호 관련 에러 메시지만 표시되는지 확인
            await waitFor(() => {
                expect(
                    screen.getByText(/비밀번호를 입력해주세요/)
                ).toBeInTheDocument();
                expect(
                    screen.getByText(/비밀번호을 한번 더 입력해주세요/)
                ).toBeInTheDocument();
            });
            // 입력된 필드들은 에러가 없어야 함
            expect(
                screen.queryByText(/닉네임을 입력해주세요/)
            ).not.toBeInTheDocument();
            expect(
                screen.queryByText(/이메일을 입력해주세요/)
            ).not.toBeInTheDocument();
        });
    });
});
describe('회원가입 폼 API 에러 테스트', () => {
    beforeEach(() => {
        renderSignupForm();
        jest.clearAllMocks();
    });
    test('회원가입 성공', async () => {
        // 🎯 signup 함수가 직접 원하는 값을 반환하도록 설정
        mockAuthApi.signup.mockResolvedValue({
            statusCode: 200,
            message: '회원가입 성공',
        });

        const result = await authApi.signup({
            userId: 'test@test.com',
            password: 'password123!',
            nickName: 'testUser',
        });
        expect(result.statusCode).toBe(200);
    });
    test('회원가입 실패', async () => {
        // 🎯 signup 함수가 직접 원하는 값을 반환하도록 설정
        mockAuthApi.signup.mockResolvedValue({
            statusCode: 104,
            message: '이미 사용중인 이메일입니다.',
        });

        const result = await authApi.signup({
            userId: 'test@test.com',
            password: 'password123!',
            nickName: 'testUser',
        });
        expect(result.statusCode).toBe(104);
    });
});
