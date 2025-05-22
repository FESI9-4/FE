import clsx from 'clsx';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TabProps {
    children: React.ReactNode;
    icon: 'do' | 'go';
    active: boolean;
    onClick?: () => void;
}

export default function Tab({ children, icon, active, onClick }: TabProps) {
    const className = clsx(
        'flex items-center gap-1 font-semibold text-lg hover:cursor-pointer'
    );

    return (
        <motion.div
            className={className}
            animate={{
                color: active ? '#111827' : '#9CA3AF', // gray-900 : gray-400
            }}
            transition={{
                duration: 0.5,
                ease: 'easeInOut',
            }}
            onClick={onClick}
        >
            {children}
            <motion.div
                animate={{
                    filter: active
                        ? 'none'
                        : 'invert(70%) sepia(5%) saturate(578%) hue-rotate(179deg) brightness(92%) contrast(92%)',
                }}
                transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                }}
            >
                <Image
                    src={`/icons/${icon}.svg`}
                    alt={icon}
                    width={24}
                    height={24}
                />
            </motion.div>
        </motion.div>
    );
}
