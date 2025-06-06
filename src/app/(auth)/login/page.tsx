'use client';
import LoginIllustration from '../LoginIllustration';
import LoginForm from './LoginForm';

function LoginPage() {
    return (
        <div className="flex flex-col xl:flex-row xl:gap-[186px] sm:justify-center bg-[#14151A] min-h-screen min-w-screen px-4">
            <LoginIllustration />
            <LoginForm />
        </div>
    );
}

export default LoginPage;
