'use client';

import Loading from '@/components/ui/Loading';
import { pressStart2P } from '@/lib/fonts';
import './globals.scss';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pressStart2P.variable}>
      <body>
        <Loading />
        {children}
      </body>
    </html>
  );
}
