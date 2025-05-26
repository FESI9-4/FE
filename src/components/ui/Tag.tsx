import { AlarmIcon } from '@/assets';

interface TagProps {
    children: React.ReactNode;
}

export default function Tag({ children }: TagProps) {
    return (
        <div className="bg-green-500 rounded-tr-3xl flex gap-1 py-1 pr-4 pl-2 justify-center items-center max-w-31 text-black">
            <AlarmIcon width={15} height={13} />
            <div className=" text-xs font-medium">{children}</div>
        </div>
    );
}
