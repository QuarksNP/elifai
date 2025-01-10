import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/modules/core/components/ui/toaster';
import { JetBrains_Mono } from 'next/font/google';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Elifai',
  description: 'Intuitive and easy financial control',
};

export default function RootLayout({
  auth,
  children,
}: Readonly<{
  auth: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrains.className} antialiased bg-black text-foreground`}
      >
        <div>{auth}</div>
        <div>{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
