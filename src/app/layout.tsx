import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'PayPerInsight AI',
  description: 'AI Chat with Crypto Payments (Demo)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
