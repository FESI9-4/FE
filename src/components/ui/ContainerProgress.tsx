'use client';

import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { UserIcon } from '@/assets';
import { ProgressChip } from '@/components/ui';

interface ContainerProgressProps {
    max: number;
    current: number;
    openStatus: 'waiting' | 'finished' | 'progressing'; //이것도  어떤건 4가지
    deadline?: string; // deadLine과 혼용됨
}

export default function ContainerProgress({
    max,
    current,
    openStatus,
    deadline,
}: ContainerProgressProps) {
    const progress = `${((current / max) * 100).toFixed(0)}%`;
    const className = cva('h-2 rounded-md border-none', {
        variants: {
            openStatus: {
                waiting: 'bg-gray-300',
                progressing: 'bg-green-400',
                finished: 'bg-green-800',
            },
        },
        defaultVariants: {
            openStatus: 'waiting',
        },
    });

    return (
        <div className="flex flex-col gap-2 pt-2 pb-4">
            <div className="flex justify-between text-gray-50 text-sm font-normal">
                <div className="flex gap-4 items-center justify-center">
                    <div className="flex gap-0.5 items-center justify-center font-medium">
                        <UserIcon width={16} height={16} />
                        <div>
                            {current} / {max}
                        </div>
                    </div>
                    {openStatus === 'progressing' && (
                        <ProgressChip openStatus={openStatus}>
                            개설확정
                        </ProgressChip>
                    )}
                </div>

                {openStatus === 'finished' ? (
                    <ProgressChip openStatus={openStatus}>
                        모집마감
                    </ProgressChip>
                ) : deadline ? (
                    <div className="flex gap-2 items-center justify-center">
                        <div className="text-green-400">마감</div>
                        <div>{deadline}</div>
                    </div>
                ) : null}
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-md overflow-hidden">
                <motion.hr
                    className={className({ openStatus })}
                    initial={{ width: '0%' }}
                    animate={{ width: progress }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
}
