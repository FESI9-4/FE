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
    viewport: 'width=device-width, initial-scale=1',
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
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    return (
        <html lang="ko">
            <body className="bg-[#14151A]">
                <MSWComponent>
                    <ClientAuthProvider initialAccessToken={accessToken}>
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
