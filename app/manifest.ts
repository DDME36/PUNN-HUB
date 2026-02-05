import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PUNN HUB - Knowledge Hub สำหรับนักพัฒนา',
    short_name: 'PUNN HUB',
    description: 'แหล่งรวมความรู้ ไอเดีย และเทคนิคต่างๆ สำหรับการพัฒนาเว็บไซต์และเทคโนโลยี',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#fb7185',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
