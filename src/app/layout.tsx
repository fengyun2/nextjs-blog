import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: "Spring's Blog",
  description: 'Created by Spring',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='dark:bg-slate-800'>
        <Navbar />
        <main className='prose prose-xl prose-slate mx-auto px-4 dark:prose-invert md:px-6'>{children}</main>
      </body>
    </html>
  );
}
