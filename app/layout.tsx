import ConfigProviderWrapper from '@/components/provider/ConfigProvider';
import Loading from '@/components/ui/Loading';

import { marsNeedsCunnilingus, pressStart2P } from '@/lib/fonts';
import './globals.scss';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${pressStart2P.variable} ${marsNeedsCunnilingus.variable}`}>
      <body>
        <ConfigProviderWrapper>
          <Loading />
          {children}
        </ConfigProviderWrapper>
      </body>
    </html>
  );
}
