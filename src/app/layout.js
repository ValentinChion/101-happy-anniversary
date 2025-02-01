import './globals.css';
import localFont from 'next/font/local';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const geistSans = localFont({
  src: './Geist-VariableFont_wght.ttf',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const metadata = {
  title: 'Counter Levels',
  description: 'A fun counter game with levels',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geistSans.className}>{children}</body>
    </html>
  );
}
