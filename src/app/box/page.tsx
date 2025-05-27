import { GoTogetherIcon } from '@/assets';

export default function BoxPage() {
    return (
        <div className="w-screen h-screen">
            <div className="w-full h-full bg-gray-100">
                <div>
                    <label>선택 서비스</label>
                    <div>
                        <span>같이가요</span>
                        <GoTogetherIcon
                            width={20}
                            height={20}
                            className="text-gray-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
