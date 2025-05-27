//TODO 추후에 NEXTAuth로 대체 ? Nav에서 임시 사용

interface User {
    id: string;
    nickname: string;
    profileImage: string;
    description: string;
}

interface UseAuthReturn {
    isLoggedIn: boolean;
    user: User;
}

export default function useAuth(): UseAuthReturn {
    const isLoggedIn = true;
    // 우선 작업을 위해 true로만 뒀음

    // localStorage 체크 생략
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     setIsLoggedIn(!!token);
    // }, []);

    //임시값 테스트
    //임시값 테스트
    const user = {
        id: 'user123',
        name: '재형',
        profileImage: 'https://randomuser.me/api/portraits/men/75.jpg',
        nickname: '재형',
        profileImage: 'https://randomuser.me/api/portraits/men/75.jpg',
        description: '안녕하세요 정재형입니다',
    };

    return { isLoggedIn, user };
}
