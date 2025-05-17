//TODO 추후에 NEXTAuth로 대체 ? Nav에서 임시 사용
export default function useAuth() {
    const isLoggedIn = true;
    // 우선 작업을 위해 true로만 뒀음 

    // localStorage 체크 생략
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     setIsLoggedIn(!!token);
    // }, []);

    return { isLoggedIn };
}
