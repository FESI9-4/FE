export async function initMocks() {
    // 개발 환경이 아니거나, mocking 비활성화 상태라면 종료
    if (
        process.env.NODE_ENV !== 'development' ||
        process.env.NEXT_PUBLIC_API_MOCKING === 'disabled'
    ) {
        console.log('[MSW] mocking disabled');
        return;
    }

    if (process.env.NODE_ENV !== 'development') return;    // 나중에 msw .. 

    if (typeof window === 'undefined') {
        const { server } = await import('./server');
        server.listen();
    } else {
        const { worker } = await import('./browser');
        await worker.start({
            onUnhandledRequest: 'bypass',
            quiet: true,
            serviceWorker: {
                options: {
                    scope: '/',
                },
            },
        });
    }
}
