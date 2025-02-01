import './globals.css';
import { geist } from './fonts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const metadata = {
  title: 'Counter Levels',
  description: 'A fun counter game with levels',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  );
}
