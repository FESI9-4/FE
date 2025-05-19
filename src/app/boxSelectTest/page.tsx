import { BoxSelectGroup } from '@/components/ui';

function BoxSelectTest() {
    return (
        <div className="p-3 bg-[#aeb0b8] gap-5 min-h-screen flex items-center justify-center">
            <div className="boxSelectGroupContainer w-[600px] max-w-md">
                <BoxSelectGroup />
            </div>
        </div>
    );
}

export default BoxSelectTest;
