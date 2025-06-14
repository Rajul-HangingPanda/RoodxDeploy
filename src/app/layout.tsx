import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CombinedProvider } from '@/providers/combined.provider';
import { getLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { ToasterComponent } from '@/components/ui/toaster';

const inter = Inter({
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const messages = (await import(`@/locales/${locale}.json`)).default;

  return (
    <html dir={direction} lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <CombinedProvider locale={locale} messages={messages}>
          {children}
          <ToasterComponent />
        </CombinedProvider>
      </body>
    </html>
  );
}
