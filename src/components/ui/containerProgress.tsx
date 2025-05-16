import clsx from 'clsx';

interface ContainerProgressProps {
    max: number;
    current: number;
    openStatus: boolean;
}

export default function ContainerProgress({
    max,
    current,
    openStatus,
}: ContainerProgressProps) {
    const progress = `${(current / max) * 100}%`;
    const className = clsx(
        `h-1 rounded-md border-none w-[${progress}] `,
        openStatus ? `bg-orange-600` : 'bg-orange-400'
    );
    return (
        <div className="w-full h-1 bg-orange-50 rounded-md">
            <hr className={className} />
        </div>
    );
}
