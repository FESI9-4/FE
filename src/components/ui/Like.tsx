import Image from 'next/image';

interface LikeProps {
    like?: boolean;
    onClick?: () => void;
}

export default function Like({ like = true, onClick }: LikeProps) {
    return (
        <button onClick={onClick} className="hover:cursor-pointer">
            <Image
                src={like ? '/icons/like.svg' : '/icons/unlike.svg'}
                alt="like"
                width={24}
                height={24}
            />
        </button>
    );
}
