import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { isDevMode } from '@/util/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Demo Login Application',
  description: 'A demo login page with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${isDevMode() ? 'responsive-breakpoints-debug' : ''}`}>
        {/*<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>*/}
        {/*  {children}*/}
        {/*</ThemeProvider>*/}
        {children}
      </body>
    </html>
  );
}
