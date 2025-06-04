import Link from 'next/link';
import { Button } from '@/components/ui';

interface BlankScreenProps {
    text: string;
    buttonText?: string;
    link?: string;
}

export default function BlankScreen({
    text,
    buttonText,
    link,
}: BlankScreenProps) {
    return (
        <div className="flex flex-col justify-center items-center gap-8">
            <div className="text-gray-500 text-sm font-medium text-center whitespace-pre-line">
                {text}
            </div>
            {buttonText && (
                <Link href={link || ''}>
                    <Button size="large" styled="solid" className="w-50 ">
                        {buttonText}
                    </Button>
                </Link>
            )}
        </div>
    );
}
