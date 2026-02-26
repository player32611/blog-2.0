import { Press_Start_2P } from 'next/font/google';

import localFont from 'next/font/local';

export const marsNeedsCunnilingus = localFont({
  weight: '400',
  src: '../public/fonts/Mars_Needs_Cunnilingus.ttf',
  variable: '--font-mars-needs-cunnilingus',
  display: 'swap',
});

export const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p',
  display: 'swap',
});
