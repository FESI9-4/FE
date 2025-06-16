import { useTest } from '@/hooks/queries/useAuth';

function Test1() {
    const { data } = useTest();
    return <div>{data?.test}</div>;
}

export default Test1;
