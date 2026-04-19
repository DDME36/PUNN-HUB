import type { Metadata } from 'next';
import { Inter, Kanit } from 'next/font/google';
import './globals.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { Navbar } from '@/components/Navbar';
import { SmoothScroller } from '@/components/SmoothScroller';
import { MeshGradient } from '@/components/MeshGradient';
import { getPublishedPosts } from '@/lib/mdx';
import { Analytics } from '@/components/Analytics';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { generateWebsiteSchema } from '@/lib/structured-data';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const kanit = Kanit({
  weight: ['300', '400', '600', '800'],
  subsets: ['latin', 'thai'],
  variable: '--font-kanit',
  display: 'swap',
});

// Since Clash Display isn't on Google Fonts, we'll keep it via CSS for now unless local font files exist.
// Wait, to fully optimize, we should use a local font if available, but since we don't have the woff2 files in the repo,
// we will load it efficiently via CSS but we will remove the Google Fonts @import.

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
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'PUNN HUB Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PUNN HUB - Knowledge Hub',
    description: 'แหล่งรวมความรู้สำหรับนักพัฒนา',
    images: ['/icon-512.png'],
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
    canonical: 'https://punn.site',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  verification: {
    // google: 'your-google-verification-code', // เพิ่มตอน deploy
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await getPublishedPosts().catch(() => []);
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="th" className={`${inter.variable} ${kanit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden font-sans antialiased">
        <a href="#main-content" className="skip-to-main">
          ข้ามไปยังเนื้อหาหลัก
        </a>
        <MeshGradient />
        <SmoothScroller />
        <Navbar posts={posts} />
        <ScrollProgressBar />
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
        <main id="main-content">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </body>
    </html>
  );
}
