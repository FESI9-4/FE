'use client';

import { useState } from 'react';
import { TextField } from '@/components/ui';
import InputText from '@/components/ui/InputText';
import { validators } from '@/utils/validators';

export default function AuthTestPage() {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
    const { validateImage, validateNickname, validateEmail, validatePassword } =
        validators;
    // 로그인 폼 데이터
    const [loginData, setLoginData] = useState({
        loginEmail: '',
        loginPassword: '',
    });

    // 회원가입 폼 데이터
    const [signupData, setSignupData] = useState({
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: 20,
        profileImage: null as File | null,
        bio: '',
        terms: false,
    });

    // 🎯 로그인 핸들러들
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('=== 로그인 데이터 ===');
        console.log('State 데이터:', loginData);

        const formData = new FormData(e.target as HTMLFormElement);
        console.log('FormData 데이터:');
        console.log({
            email: formData.get('loginEmail'),
            password: formData.get('loginPassword'),
        });
        alert('로그인 시도! 콘솔 확인하세요.');
    };

    // 🎯 회원가입 핸들러들
    const handleSignupInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = e.target;
        setSignupData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleAgeChange = (age: number) => {
        setSignupData((prev) => ({ ...prev, age }));
    };

    const handleProfileImageChange = (file: File | null) => {
        setSignupData((prev) => ({ ...prev, profileImage: file }));
    };

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSignupData((prev) => ({ ...prev, bio: e.target.value }));
    };

    const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('=== 회원가입 데이터 ===');
        console.log('State 데이터:', signupData);

        const formData = new FormData(e.target as HTMLFormElement);
        console.log('FormData 데이터:');
        console.log({
            nickname: formData.get('nickname'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            age: formData.get('age'),
            profileImage:
                (formData.get('profileImage') as File)?.name || 'No file',
            bio: formData.get('bio'),
            terms: formData.get('terms'),
        });
        alert('회원가입 완료! 콘솔 확인하세요.');
    };

    return (
        <div className="min-h-screen bg-gray-800 p-4">
            <div className="max-w-4xl mx-auto">
                {/* 헤더 */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        🚀 TextField 컴포넌트 시스템 테스트
                    </h1>
                    <p className="text-gray-300">
                        모든 컴파운드 컴포넌트를 활용한 인증 시스템
                    </p>
                </div>

                {/* 탭 버튼 */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gray-700 rounded-lg p-1 flex">
                        <button
                            onClick={() => setActiveTab('login')}
                            className={`px-6 py-2 rounded-md font-medium transition-colors ${
                                activeTab === 'login'
                                    ? 'bg-green-500 text-white'
                                    : 'text-gray-300 hover:text-white'
                            }`}
                        >
                            로그인
                        </button>
                        <button
                            onClick={() => setActiveTab('signup')}
                            className={`px-6 py-2 rounded-md font-medium transition-colors ${
                                activeTab === 'signup'
                                    ? 'bg-green-500 text-white'
                                    : 'text-gray-300 hover:text-white'
                            }`}
                        >
                            회원가입
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 🎮 로그인 폼 (제어 컴포넌트) */}
                    <div className="bg-gray-700 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                🎮 로그인
                            </h2>
                            <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                                제어 컴포넌트
                            </span>
                        </div>

                        <form
                            onSubmit={handleLoginSubmit}
                            className="space-y-4"
                        >
                            {/* 이메일 (제어) */}
                            <TextField fieldName="loginEmail">
                                <TextField.Label labelSize="small">
                                    이메일
                                </TextField.Label>
                                <TextField.Input
                                    name="loginEmail"
                                    type="email"
                                    value={loginData.loginEmail}
                                    onChange={handleLoginChange}
                                    onValidate={validateEmail}
                                    placeholder="이메일을 입력하세요"
                                    inputSize="small"
                                    autoComplete="email"
                                    required
                                />
                                <TextField.HelperText />
                            </TextField>

                            {/* 비밀번호 (제어) */}
                            <TextField fieldName="loginPassword">
                                <TextField.Label labelSize="small">
                                    비밀번호
                                </TextField.Label>
                                <TextField.Input
                                    name="loginPassword"
                                    type="password"
                                    value={loginData.loginPassword}
                                    onChange={handleLoginChange}
                                    onValidate={validatePassword}
                                    placeholder="비밀번호를 입력하세요"
                                    inputSize="small"
                                    autoComplete="current-password"
                                    required
                                />
                                <TextField.HelperText />
                            </TextField>

                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                            >
                                로그인
                            </button>
                        </form>

                        {/* 현재 상태 표시 */}
                        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-300 mb-2">
                                현재 상태 (제어):
                            </h3>
                            <pre className="text-xs text-green-400 overflow-auto">
                                {JSON.stringify(loginData, null, 2)}
                            </pre>
                        </div>
                    </div>

                    {/* 🎯 회원가입 폼 (제어 + 비제어 혼합) */}
                    <div className="bg-gray-700 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                🎯 회원가입
                            </h2>
                            <span className="bg-purple-500 text-white px-2 py-1 rounded text-sm">
                                혼합
                            </span>
                        </div>

                        <form
                            onSubmit={handleSignupSubmit}
                            className="space-y-4"
                        >
                            {/* 닉네임 (제어) */}
                            <TextField fieldName="signupNickname">
                                <TextField.Label labelSize="small">
                                    닉네임 *
                                </TextField.Label>
                                <TextField.Input
                                    name="nickname"
                                    type="text"
                                    value={signupData.nickname}
                                    onChange={handleSignupInputChange}
                                    onValidate={validateNickname}
                                    placeholder="닉네임을 입력하세요"
                                    inputSize="small"
                                    required
                                />
                                <TextField.HelperText />
                            </TextField>

                            {/* 이메일 (제어) */}
                            <TextField fieldName="signupEmail">
                                <TextField.Label labelSize="small">
                                    이메일 *
                                </TextField.Label>
                                <TextField.Input
                                    name="email"
                                    type="email"
                                    value={signupData.email}
                                    onChange={handleSignupInputChange}
                                    onValidate={validateEmail}
                                    placeholder="이메일을 입력하세요"
                                    inputSize="small"
                                    autoComplete="email"
                                    required
                                />
                                <TextField.HelperText />
                            </TextField>

                            {/* 비밀번호 (제어) */}
                            <TextField fieldName="signupPassword">
                                <TextField.Label labelSize="small">
                                    비밀번호 *
                                </TextField.Label>
                                <TextField.Input
                                    name="password"
                                    type="password"
                                    value={signupData.password}
                                    onChange={handleSignupInputChange}
                                    onValidate={validatePassword}
                                    placeholder="비밀번호를 입력하세요"
                                    inputSize="small"
                                    autoComplete="new-password"
                                    required
                                />
                                <TextField.HelperText />
                            </TextField>

                            {/* 비밀번호 확인 (제어) */}
                            <TextField fieldName="confirmPassword">
                                <TextField.Label labelSize="small">
                                    비밀번호 확인 *
                                </TextField.Label>
                                <TextField.Input
                                    name="confirmPassword"
                                    type="password"
                                    value={signupData.confirmPassword}
                                    onChange={handleSignupInputChange}
                                    onValidate={validatePassword}
                                    placeholder="비밀번호를 다시 입력하세요"
                                    inputSize="small"
                                    autoComplete="new-password"
                                    required
                                />
                                <TextField.HelperText />
                            </TextField>

                            {/* 나이 (NumberInput - 항상 제어) */}
                            <TextField fieldName="signupAge">
                                <TextField.Label labelSize="small">
                                    나이 *
                                </TextField.Label>
                                <TextField.NumberInput
                                    name="age"
                                    value={signupData.age}
                                    onChange={handleAgeChange}
                                    onValidate={validatePassword}
                                    min={14}
                                    max={99}
                                    step={1}
                                    inputSize="small"
                                />
                                <TextField.HelperText />
                            </TextField>

                            {/* 프로필 이미지 (FileInput - 제어) */}
                            <TextField fieldName="profileImage">
                                <TextField.Label labelSize="small">
                                    프로필 이미지
                                </TextField.Label>
                                <TextField.FileInput
                                    name="profileImage"
                                    selectedFile={signupData.profileImage}
                                    onFileChange={handleProfileImageChange}
                                    onValidate={validateImage}
                                    accept="image/*"
                                    buttonText="이미지 선택"
                                    emptyText="프로필 이미지를 선택하세요"
                                    inputSize="small"
                                />
                                <TextField.HelperText />
                            </TextField>

                            {/* 자기소개 (InputText - 별도 컴포넌트) */}
                            <div>
                                <InputText
                                    label="자기소개"
                                    name="bio"
                                    value={signupData.bio}
                                    onChange={handleBioChange}
                                    placeholder="자기소개를 작성해주세요 (선택사항)"
                                />
                            </div>

                            {/* 약관 동의 체크박스 */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="terms"
                                    checked={signupData.terms}
                                    onChange={handleSignupInputChange}
                                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                    required
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-sm text-gray-300"
                                >
                                    이용약관 및 개인정보처리방침에 동의합니다 *
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={!signupData.terms}
                                className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
                            >
                                회원가입
                            </button>
                        </form>

                        {/* 현재 상태 표시 */}
                        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-300 mb-2">
                                현재 상태 (제어):
                            </h3>
                            <pre className="text-xs text-purple-400 overflow-auto max-h-40">
                                {JSON.stringify(
                                    {
                                        ...signupData,
                                        profileImage:
                                            signupData.profileImage?.name ||
                                            null,
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                        </div>
                    </div>
                </div>

                {/* 🎲 비제어 컴포넌트 테스트 섹션 */}
                <div className="mt-8 bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <h2 className="text-2xl font-bold text-white">
                            🎲 비제어 컴포넌트 테스트
                        </h2>
                        <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm">
                            비제어
                        </span>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(
                                e.target as HTMLFormElement
                            );
                            console.log('=== 비제어 컴포넌트 데이터 ===');
                            console.log({
                                username: formData.get('username'),
                                userEmail: formData.get('userEmail'),
                                userImage:
                                    (formData.get('userImage') as File)?.name ||
                                    'No file',
                            });
                            alert('비제어 폼 제출! 콘솔 확인하세요.');
                        }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                        {/* 사용자명 (비제어) */}
                        <TextField fieldName="uncontrolledUsername">
                            <TextField.Label labelSize="small">
                                사용자명
                            </TextField.Label>
                            <TextField.Input
                                name="username"
                                type="text"
                                onValidate={validateNickname}
                                placeholder="사용자명 입력"
                                inputSize="small"
                            />
                            <TextField.HelperText />
                        </TextField>

                        {/* 이메일 (비제어) */}
                        <TextField fieldName="uncontrolledEmail">
                            <TextField.Label labelSize="small">
                                이메일
                            </TextField.Label>
                            <TextField.Input
                                name="userEmail"
                                type="email"
                                onValidate={validateEmail}
                                placeholder="이메일 입력"
                                inputSize="small"
                            />
                            <TextField.HelperText />
                        </TextField>

                        {/* 이미지 (비제어) */}
                        <TextField fieldName="uncontrolledImage">
                            <TextField.Label labelSize="small">
                                이미지
                            </TextField.Label>
                            <TextField.FileInput
                                name="userImage"
                                onValidate={validateImage}
                                accept="image/*"
                                buttonText="파일 선택"
                                inputSize="small"
                            />
                            <TextField.HelperText />
                        </TextField>

                        <div className="md:col-span-3">
                            <button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                            >
                                비제어 컴포넌트 테스트 제출
                            </button>
                        </div>
                    </form>
                </div>

                {/* 사용법 가이드 */}
                <div className="mt-8 bg-gray-700 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        📚 테스트 가이드
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
                        <div>
                            <h3 className="font-semibold text-white mb-2">
                                🎮 제어 컴포넌트:
                            </h3>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>value와 onChange로 상태 관리</li>
                                <li>실시간 validation 가능</li>
                                <li>State에서 값 확인 가능</li>
                                <li>NumberInput은 항상 제어</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-2">
                                🎲 비제어 컴포넌트:
                            </h3>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>DOM이 값 관리</li>
                                <li>blur 시점에 validation</li>
                                <li>FormData로 값 수집</li>
                                <li>성능상 이점</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
