import { BoxSelectGroup } from '@/components/ui';
import { CATEGORY_DATA } from '@/types/categories';

function BoxPage() {
    return <BoxSelectGroup name="test" categories={CATEGORY_DATA} />;
}

export default BoxPage;
