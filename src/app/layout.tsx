import type { Metadata } from 'next';
import './globals.css';
import { WishlistProvider } from '@/context/WishlistContext'; 
import Nav from '@/components/ui/Nav';

export const metadata: Metadata = {
    title: 'FanPal',
    description: '',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <WishlistProvider>
                    <Nav />
                    {children}
                </WishlistProvider>
            </body>
        </html>
    );
}
