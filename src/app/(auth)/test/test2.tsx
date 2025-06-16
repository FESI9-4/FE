import { useTest2 } from '@/hooks/queries/useAuth';

function Test2() {
    const { data } = useTest2();
    return <div>{data?.test}</div>;
}

export default Test2;
