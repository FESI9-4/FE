import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/ui/Nav';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export const metadata: Metadata = {
    title: 'FanPal',
    description: '',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60, // 1분
                        retry: 1,
                    },
                },
            })
    );

    return (
        <html lang="en">
            <body>
                <QueryClientProvider client={queryClient}>
                    <Nav />
                    {children}
                </QueryClientProvider>
            </body>
        </html>
    );
}
