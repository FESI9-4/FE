import Image from 'next/image';

export default function IcCheck() {
    return (
        <div>
            <div className="w-6 h-6 relative overflow-hidden">
                <Image
                    src="/icons/check.svg"
                    alt="check"
                    width={16}
                    height={16}
                />
                <div className="w-4 h-4 left-[3px] top-[3px] bg-gray-900 rounded-full" />
            </div>
        </div>
    );
}
