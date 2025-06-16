import type { Metadata, Viewport } from 'next';
import './globals.css';
import Nav from '@/components/ui/Nav';
import QueryProvider from '@/components/providers/QueryProvider';
import { ClientAuthProvider } from '@/components/providers/ClientAuthProvider';
import { cookies } from 'next/headers';
import { MSWComponent } from '@/components/providers/MSWComponent';
export const metadata: Metadata = {
    title: 'FanPal',
    description: '',
    icons: {
        icon: '/icons/navMobile.svg',
    },
};
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    if (process.env.NODE_ENV === 'development') {
        const { initMocks } = await import('@/mocks');
        await initMocks(); // 서버 사이드 MSW 초기화
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const hasRefreshToken = refreshToken ? true : false;
    return (
        <html lang="ko">
            <body className="bg-[#14151A]">
                <MSWComponent>
                    <ClientAuthProvider
                        initialAccessToken={accessToken}
                        hasRefreshToken={hasRefreshToken}
                    >
                        <QueryProvider>
                            <Nav />
                            {children}
                        </QueryProvider>
                    </ClientAuthProvider>
                </MSWComponent>
                <div id="modal-root" />
            </body>
        </html>
    );
}
