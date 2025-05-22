import { EditIcon } from '@/assets';

interface EditButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size: 'small' | 'large';
}

export default function EditButton({
    onClick,
    size = 'large',
}: EditButtonProps) {
    return (
        <button onClick={onClick} className="hover:cursor-pointer">
            <EditIcon width={size === 'large' ? 32 : 18} />
        </button>
    );
}
