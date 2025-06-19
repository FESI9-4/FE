import { LoginIllustration, LoginForm } from '@/components/auth';

export default function LoginPage() {
    return (
        <div className="flex flex-col xl:flex-row xl:gap-[186px] justify-center bg-[#14151A] min-h-screen min-w-screen px-4">
            <LoginIllustration />
            <LoginForm />
        </div>
    );
}
