import { useState } from 'react';

//TODO 추후에 NEXTAuth로 대체 ? Nav에서 임시 사용
export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // ← 무조건 true

    // localStorage 체크 생략
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     setIsLoggedIn(!!token);
    // }, []);

    return { isLoggedIn };
}
