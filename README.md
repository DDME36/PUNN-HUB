# PUNN HUB - Knowledge Hub

> แหล่งรวมความรู้ ไอเดีย และเทคนิคต่างๆ สำหรับนักพัฒนา

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-ff69b4?style=flat-square)](https://www.framer.com/motion/)

## Features

- **Modern Design** - มินิมอล คลีน และสวยงาม
- **Blog System** - เชื่อมต่อกับ Notion API
- **Smooth Animations** - ใช้ Framer Motion
- **Responsive** - รองรับทุกขนาดหน้าจอ
- **Fast Performance** - Next.js 16 with Turbopack
- **Interactive UI** - Hover effects และ transitions
- **SEO Optimized** - Sitemap, Robots.txt, Open Graph
- **Scroll Progress** - แสดง progress bar ขณะเลื่อนหน้า

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **CMS:** Notion API
- **Icons:** Lucide React, React Icons
- **Markdown:** React Markdown

## Installation

```bash
# Clone repository
git clone https://github.com/yourusername/punn-hub.git

# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local
# แก้ไข NOTION_TOKEN และ NOTION_DATABASE_ID

# Run development server
npm run dev
```

## Environment Variables

สร้างไฟล์ `.env.local`:

```env
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_notion_database_id
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── Hero.tsx
│   ├── BentoGrid.tsx
│   ├── BlogList.tsx
│   ├── Navbar.tsx
│   └── ...
├── lib/                   # Utilities
│   ├── notion.ts          # Notion API
│   ├── readingTime.ts     # Reading time calculator
│   └── utils.ts
└── public/                # Static assets
```

## Design System

### Colors
- **Primary:** Rose (400) to Purple (400)
- **Secondary:** Blue, Gray
- **Accent:** Gradient combinations

### Typography
- **Display:** Clash Display
- **Body:** Inter, Kanit

### Components
- Glassmorphism cards
- Soft shadows
- Rounded corners (2xl, 3xl)
- Smooth transitions

## Notion Setup

1. สร้าง Integration ใน [Notion Integrations](https://www.notion.so/my-integrations)
2. สร้าง Database ใน Notion ด้วย properties:
   - **Name** (Title)
   - **Slug** (Rich Text)
   - **Tags** (Multi-select หรือ Rich Text)
   - **Date** (Date)
   - **Cover** (Files & Media)
3. Share database กับ Integration
4. Copy Token และ Database ID ไปใส่ใน `.env.local`

## Deployment

### Vercel (แนะนำ)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

หรือเชื่อมต่อ GitHub repository กับ Vercel โดยตรง

### Environment Variables บน Vercel
อย่าลืมเพิ่ม `NOTION_TOKEN` และ `NOTION_DATABASE_ID` ใน Vercel Dashboard

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Mobile Friendly
- Accessibility: AA Standard

## Contributing

Pull requests are welcome! สำหรับการเปลี่ยนแปลงใหญ่ กรุณาเปิด issue ก่อน

## License

MIT License - ใช้งานได้อย่างอิสระ

## Author

**Satayu Pongpan**
- Website: [satayupongpan.site](https://satayupongpan.site/)
- GitHub: [@DDME36](https://github.com/DDME36)

---

Made with care in Thailand

