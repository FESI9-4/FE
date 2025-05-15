import Tap from '@/components/tap';

export default function Home() {
    return (
        <div className="flex gap-2 p-10">
            <Tap status="active" size="large">
                전체
            </Tap>
            <Tap status="active" size="small">
                전체
            </Tap>
            <Tap status="default" size="large">
                전체
            </Tap>
            <Tap status="default" size="small">
                전체
            </Tap>
        </div>
    );
}
