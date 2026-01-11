import type { Metadata } from 'next';
import { Inter, Montserrat, Space_Grotesk } from 'next/font/google';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Desafio Loomi',
  description: 'Created by Lucas E. Rocha',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-space-grotesk',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-montserrat',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={inter.variable + ' ' + spaceGrotesk.variable + ' ' + montserrat.variable} >
      <body className="font-inter">
        {children}
      </body>
    </html>
  );
}
