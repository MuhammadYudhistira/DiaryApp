import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/global/(navbar)/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Global Diary App',
  description: 'Open Source Diary App',
};

type Params = Promise<{ locale: 'en' }>;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;
  return (
    <ClerkProvider>
      <html data-theme="black" lang={locale}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#090D14] h-screen`}>
          <Navbar />
          {children}
          <Toaster position="bottom-center" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
