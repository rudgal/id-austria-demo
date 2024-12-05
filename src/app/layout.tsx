import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { isDevMode } from '@/util/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Login Demo - ID Austria',
  description: 'Little app demonstrating the login process with ID Austria',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${isDevMode() ? 'responsive-breakpoints-debug' : ''}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
      {!isDevMode() && <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />}
    </html>
  );
}
