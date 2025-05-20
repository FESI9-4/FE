import Image from 'next/image';
import EditButton from './EditButton';
import clsx from 'clsx';

interface ProfileProps {
    size: 'small' | 'medium' | 'large';
    image?: string;
    edit?: boolean;
}

export default function Profile({
    size = 'large',
    image = '/icons/profile.svg',
    edit,
}: ProfileProps) {
    const ImageClassName = clsx(
        'relative flex items-center rounded-full overflow-hidden ',
        {
            'w-6 h-6': size === 'small',
            'w-10 h-10': size === 'medium',
            'w-14 h-14': size === 'large',
        }
    );
    const ContainerClassName = clsx('relative flex items-center', {
        'w-6 h-6': size === 'small',
        'w-10 h-10': size === 'medium',
        'w-14 h-14': size === 'large',
    });
    return (
        <div className={ContainerClassName}>
            <div className={ImageClassName}>
                <Image src={image} alt="profile" fill objectFit="contain" />
            </div>
            {edit && (
                <div className="flex absolute right-0 bottom-0">
                    <EditButton size="small" onClick={() => {}} />
                </div>
            )}
        </div>
    );
}
