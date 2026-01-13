import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // 👈 Make sure this file exists in src/app/
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PayPerInsight AI',
  description: 'AI Chat with Crypto Payments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
