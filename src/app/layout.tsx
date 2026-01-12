import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PayPerInsight - AI Chat with Crypto Payments',
  description: 'Pay per query AI assistant with Circle Wallet integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6">
              <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
                <p>Powered by Circle Programmable Wallets & Groq AI • Built for ETHGlobal Hackathon</p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
