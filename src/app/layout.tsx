import type { Metadata } from 'next';
import { Poppins, Montserrat } from 'next/font/google';
import './globals.css';

// Font configuration
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// Metadata for SEO
export const metadata: Metadata = {
  title: 'AliʻiLuau - Authentic Hawaiian Luau Experience',
  description: 'Experience an authentic Hawaiian luau with traditional food, music, and dance performances at AliʻiLuau in Oahu, Hawaii.',
  keywords: 'Hawaiian luau, Oahu luau, traditional Hawaiian food, Polynesian dance, Hawaii cultural experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${montserrat.variable} antialiased bg-[color:var(--natural-light)]`}>
        {children}
      </body>
    </html>
  );
}
