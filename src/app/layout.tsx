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
  title: 'AliʻiLuau - Authentic Polynesian and Pacific Luau Experience',
  description: 'Experience an authentic Polynesian and Pacific luau with traditional food, music, and dance performances at AliʻiLuau in Oahu, Hawaii.',
  keywords: 'Polynesian and Pacific luau, Oahu luau, traditional Polynesian and Pacific food, Polynesian dance, cultural experience',
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
