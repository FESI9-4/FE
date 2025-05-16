'use client';

export default function Nav() {
    return (
        <nav className="w-full h-14 md:h-15 bg-yellow-300 flex justify-between">
            <div className="w-full-32px">
                <div className="bg-black w-57 h-14">
                    <div>이미지로대체 근데 md:부터 이미지 다른걸로 교체됨.</div>
                    <div>목록들</div>
                </div>
                <p>로그인</p>
            </div>
        </nav>
    );
}
