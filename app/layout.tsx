import type { Metadata } from 'next';
import './globals.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { Analytics } from '@/components/Analytics';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export const metadata: Metadata = {
  metadataBase: new URL('https://punn.site'),
  title: {
    default: 'PUNN HUB - Knowledge Hub สำหรับนักพัฒนา',
    template: '%s | PUNN HUB',
  },
  description:
    'แหล่งรวมความรู้ ไอเดีย และเทคนิคต่างๆ สำหรับการพัฒนาเว็บไซต์และเทคโนโลยี | Next.js, React, TypeScript',
  keywords: [
    'PUNN HUB',
    'Knowledge Hub',
    'Web Development',
    'React',
    'Next.js',
    'TypeScript',
    'Programming',
    'นักพัฒนา',
    'เว็บไซต์',
  ],
  authors: [{ name: 'Satayu Pongpan', url: 'https://satayupongpan.site' }],
  creator: 'Satayu Pongpan',
  publisher: 'PUNN HUB',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: 'https://punn.site',
    title: 'PUNN HUB - Knowledge Hub สำหรับนักพัฒนา',
    description: 'แหล่งรวมความรู้ ไอเดีย และเทคนิคต่างๆ สำหรับการพัฒนาเว็บไซต์และเทคโนโลยี',
    siteName: 'PUNN HUB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PUNN HUB - Knowledge Hub',
    description: 'แหล่งรวมความรู้สำหรับนักพัฒนา',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  verification: {
    // google: 'your-google-verification-code', // เพิ่มตอน deploy
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className="min-h-screen overflow-x-hidden antialiased"
        style={{ scrollBehavior: 'smooth' }}
      >
        <ScrollProgressBar />
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
        <div className="bg-noise pointer-events-none fixed inset-0 -z-10 opacity-[0.04]" />
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
