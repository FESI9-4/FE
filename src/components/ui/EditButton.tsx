import { EditIcon, EditNoBgIcon } from '@/assets';
import { ButtonHTMLAttributes } from 'react';

interface EditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size: 'small' | 'large';
    color: 'green' | 'gray';
}

export default function EditButton({
    onClick,
    size = 'large',
    color = 'gray',
}: EditButtonProps) {
    return (
        <button onClick={onClick} className="hover:cursor-pointer">
            {color === 'green' ? (
                <EditIcon
                    width={size === 'large' ? 32 : 18}
                    className="fill-gray-800 text-green-400"
                />
            ) : (
                <EditNoBgIcon
                    width={size === 'large' ? 32 : 18}
                    className="fill-gray-100"
                />
            )}
        </button>
    );
}
