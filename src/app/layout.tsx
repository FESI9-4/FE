import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/ui/Nav';
import QueryProvider from '@/components/providers/QueryProvider';
import { ClientAuthProvider } from '@/components/providers/ClientAuthProvider';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
    title: 'FanPal',
    description: '',
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
            <body>
                <ClientAuthProvider initialAccessToken={accessToken}>
                    <QueryProvider>
                        <Nav />
                        {children}
                    </QueryProvider>
                </ClientAuthProvider>
                <div id="modal-root" />
            </body>
        </html>
    );
}
