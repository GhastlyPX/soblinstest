import { Providers } from '@/providers/chakra';
import './globals.css';
import { Inter } from 'next/font/google';
import Wallet from '@/providers/walletAdapter';
import Header from '@/components/layout/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Soblins',
  description: 'Soblins staking platform'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Wallet>
            <div
              className={
                'flex flex-col items-center min-h-screen w-full bg-soblinRed-2 p-3 md:px-16 md:py-14'
              }
            >
              <div className={'flex flex-col flex-1 w-full max-w-[1800px]'}>
                <Header />
                {children}
              </div>
            </div>
          </Wallet>
        </Providers>
      </body>
    </html>
  );
}
