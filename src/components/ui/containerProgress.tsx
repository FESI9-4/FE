import clsx from 'clsx';
import { motion } from 'framer-motion';

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
    const progress = `${((current / max) * 100).toFixed(0)}%`;
    const className = clsx(
        'h-1 rounded-md border-none',
        openStatus ? 'bg-orange-600' : 'bg-orange-400'
    );
    return (
        <div className="w-full h-1 bg-orange-50 rounded-md overflow-hidden">
            <motion.hr
                className={className}
                initial={{ width: '0%' }}
                animate={{ width: progress }}
                transition={{ duration: 1, ease: 'easeOut' }}
            />
        </div>
    );
}
