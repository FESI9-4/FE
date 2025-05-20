import Image from 'next/image';

interface EditButtonProps {
    onClick: () => void;
    size: 'small' | 'large';
}

export default function EditButton({
    onClick,
    size = 'large',
}: EditButtonProps) {
    return (
        <button onClick={onClick} className="hover:cursor-pointer">
            <Image
                src={`/icons/edit.svg`}
                alt="edit"
                width={size === 'large' ? 32 : 18}
                height={size === 'large' ? 32 : 18}
            />
        </button>
    );
}
