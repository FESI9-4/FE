import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/ui/Nav';
import QueryProvider from '@/components/providers/QueryProvider';

export const metadata: Metadata = {
    title: 'FanPal',
    description: '',
    viewport: 'width=device-width, initial-scale=1', // 이걸 추가하세요
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                {/* 명시적으로 넣고 싶으면 이렇게 해도 됨 */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
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
