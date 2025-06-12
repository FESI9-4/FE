export async function initMocks() {
    if (process.env.NODE_ENV !== 'development') return;

    if (typeof window === 'undefined') {
        // 서버 사이드
        const { server } = await import('./server');
        server.listen();
    } else {
        // 클라이언트 사이드
        const { worker } = await import('./browser');
        await worker.start({
            onUnhandledRequest: 'bypass', // 처리되지 않은 요청은 그냥 통과
            serviceWorker: {
                options: {
                    scope: '/',
                },
            },
        });
    }
}
