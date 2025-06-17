import { LoginIllustration, SignupForm } from '@/components/auth';

export default function SignupPage() {
    return (
        <div className="flex flex-col xl:flex-row xl:gap-[186px] sm:justify-center bg-[#14151A] min-h-screen min-w-screen px-4 sm:py-10">
            <LoginIllustration className="hidden sm:flex" />
            <SignupForm />
        </div>
    );
}
