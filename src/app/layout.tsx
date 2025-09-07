import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { isDevMode } from '@/util/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Analytics from '@/components/analytics';
import { TailwindBreakpointHelper } from '@/components/tailwind-breakpoint-helper';

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
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col sm:h-screen sm:overflow-hidden">
            <Header className="sticky top-0 z-50 sm:static" />
            <main className="flex flex-1 overflow-y-auto sm:overflow-hidden">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
        {isDevMode() && <TailwindBreakpointHelper />}
      </body>
    </html>
  );
}
