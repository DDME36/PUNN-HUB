import type { NextConfig } from 'next';

// Suppress DEP0169 warning (url.parse() deprecation) globally for both Webpack and Turbopack
const originalEmit = process.emit;
// @ts-expect-error - Suppressing Node warning
process.emit = function (name: string, data: unknown, ...args: unknown[]) {
  if (
    name === 'warning' &&
    data &&
    typeof data === 'object' &&
    (data as Error).name === 'DeprecationWarning' &&
    (data as Error).message?.includes('url.parse()')
  ) {
    return false;
  }
  // @ts-expect-error - Applying arguments to process
  return originalEmit.apply(process, [name, data, ...args]);
};

const nextConfig: NextConfig = {
  // Performance optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  webpack: (config) => {
    return config;
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', 'framer-motion'],
  },

  // Turbopack config (empty to silence warning)
  turbopack: {},

  images: {
    localPatterns: [
      {
        pathname: '/api/image-proxy/**',
      },
      {
        pathname: '/api/image-proxy',
      },
      {
        pathname: '/images/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.notion.so',
      },
      {
        protocol: 'https',
        hostname: 'notion.so',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'wpblogassets.paytm.com',
      },
      {
        protocol: 'https',
        hostname: 'melonloader.co',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year (Fixes Notion AWS S3 URL expiration)
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
