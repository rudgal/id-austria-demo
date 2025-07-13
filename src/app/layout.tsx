import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { isDevMode } from '@/util/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Analytics from '@/components/analytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Login Demo - ID Austria',
  description: 'Little app demonstrating the login process with ID Austria',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body className={`${inter.className} ${isDevMode() ? 'responsive-breakpoints-debug' : ''}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex h-screen flex-col overflow-hidden">
            <Header />
            <main className="flex flex-1 overflow-hidden">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
