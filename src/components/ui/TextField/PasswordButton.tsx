import { VisibilityOffIcon } from '@/assets';
import { VisibilityOnIcon } from '@/assets';
import { cn } from '@/utils/cn';
import { ButtonHTMLAttributes } from 'react';

interface PasswordButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    showPassword: boolean;
}
export default function PasswordButton({
    showPassword,
    className,
    name,
    onClick,
}: PasswordButtonProps) {
    return (
        <button
            type="button"
            name={name}
            className={cn(
                'absolute right-2.5 cursor-pointer px-1 hover:bg-gray-800 rounded h-[80%] top-1/2 -translate-y-1/2',
                className
            )}
            onClick={onClick}
        >
            {showPassword ? (
                <VisibilityOnIcon
                    width={24}
                    height={24}
                    className="text-gray-500"
                />
            ) : (
                <VisibilityOffIcon
                    width={24}
                    height={24}
                    className="text-gray-500"
                />
            )}
        </button>
    );
}
