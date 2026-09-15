import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { SLMStoreProvider } from '@/app/providers/slm-store-provider';
import TopBar from '@/app/components/stateful/TopBar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `SLM [${process.env.NODE_ENV}]`,
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interFont.variable} h-full antialiased`}>
      <SLMStoreProvider initData={{ user: undefined }}>
        <body
          className={`min-h-full h-full flex flex-col ${interFont.className}`}
        >
          <TopBar />
          {children}
        </body>
      </SLMStoreProvider>
    </html>
  );
}
