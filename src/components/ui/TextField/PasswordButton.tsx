import { VisibilityOffIcon } from '@/assets';
import { VisibilityOnIcon } from '@/assets';
import { useTextFieldStore } from '@/store/textfieldStore';
import { cn } from '@/utils/cn';
import { ButtonHTMLAttributes } from 'react';

interface PasswordButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    fieldName?: string;
}
export default function PasswordButton(props: PasswordButtonProps) {
    const { className, fieldName: fieldName, ...rest } = props;
    const field = useTextFieldStore((state) => state.getField(fieldName || ''));
    const { togglePassword } = useTextFieldStore();
    // 패스워드 숨기기 버튼 클릭 이벤트
    function handleClick() {
        if (fieldName) togglePassword(fieldName);
    }
    return (
        <button
            type="button"
            className={cn(
                '',
                'absolute h-[80%] right-2.5 top-1/2 -translate-y-1/2 cursor-pointer px-1 hover:bg-gray-800 rounded',
                className
            )}
            onClick={handleClick}
            {...rest}
        >
            {field?.showPassword ? (
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
