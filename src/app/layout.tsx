import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/ui/Nav';
import QueryProvider from '@/components/providers/QueryProvider';

export const metadata: Metadata = {
    title: 'FanPal',
    description: '',
    viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-[#14151A]">
                <QueryProvider>
                    <Nav />
                    {children}
                </QueryProvider>
                <div id="modal-root" />
            </body>
        </html>
    );
}
