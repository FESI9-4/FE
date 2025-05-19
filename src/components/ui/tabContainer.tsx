import { motion } from 'motion/react';
import Tab from './tab';

interface TabContainerProps {
    currentCategory: string;
    setCurrentCategory: (category: string) => void;
}

export default function TabContainer({
    currentCategory,
    setCurrentCategory,
}: TabContainerProps) {
    return (
        <div className="flex gap-1 flex-col">
            <div className="flex gap-3">
                <Tab
                    active={currentCategory === 'do'}
                    icon="do"
                    onClick={() => setCurrentCategory('do')}
                >
                    <div>같이 가요</div>
                </Tab>
                <Tab
                    active={currentCategory === 'go'}
                    icon="go"
                    onClick={() => setCurrentCategory('go')}
                >
                    <div>같이 해요</div>
                </Tab>
            </div>
            <div>
                <motion.hr
                    className="w-23.5 h-0.5 bg-gray-900"
                    animate={{
                        x: currentCategory === 'do' ? '0%' : '114%',
                    }}
                    initial={{
                        x: '0%',
                    }}
                    transition={{
                        duration: 0.5,
                        ease: 'easeInOut',
                    }}
                />
            </div>
        </div>
    );
}
