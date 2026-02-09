# PUNN HUB - Knowledge Hub

> แหล่งรวมความรู้ ไอเดีย และเทคนิคต่างๆ สำหรับนักพัฒนา

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Bun](https://img.shields.io/badge/Bun-1.3+-f9f1e1?style=flat-square&logo=bun)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-ff69b4?style=flat-square)](https://www.framer.com/motion/)

## ✨ Features

- **⚡ Bun Runtime** - เร็วกว่า Node.js 10-20x
- **🚀 Next.js 16 + Turbopack** - Build เร็วขึ้น 10x
- **🎨 Modern Design** - มินิมอล คลีน และสวยงาม
- **📝 Blog System** - เชื่อมต่อกับ Notion API
- **💫 Smooth Animations** - ใช้ Framer Motion
- **📱 Responsive** - รองรับทุกขนาดหน้าจอ
- **🔍 SEO Optimized** - Sitemap, Robots.txt, Open Graph
- **📊 Analytics** - Vercel Analytics + Speed Insights
- **🧪 Testing** - Bun Test (เร็วกว่า Jest)
- **🎯 Type Safe** - TypeScript strict mode

## 🚀 Tech Stack

- **Runtime:** Bun 1.3+ (⚡ 10-20x faster than Node.js)
- **Framework:** Next.js 16 (App Router + Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **Animation:** Framer Motion 12
- **CMS:** Notion API
- **Icons:** Lucide React, React Icons
- **Markdown:** React Markdown
- **Analytics:** Vercel Analytics + Speed Insights

## 📦 Installation

### ติดตั้ง Bun

**Windows:**
```powershell
powershell -c "irm bun.sh/install.ps1|iex"
```

**macOS/Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

### Setup โปรเจค

```bash
# Clone repository
git clone https://github.com/DDME36/punn-hub.git
cd punn-hub

# Install dependencies (เร็วกว่า npm 10-20x!)
bun install

# Setup environment variables
cp .env.local.example .env.local
# แก้ไข NOTION_TOKEN และ NOTION_DATABASE_ID

# Run development server
bun dev
```

## 🎯 Scripts

```bash
bun dev              # รัน dev server (พร้อม Turbopack)
bun run build        # build production
bun start            # รัน production server
bun test             # รัน tests (Bun Test)
bun test:watch       # รัน tests แบบ watch mode
bun run lint         # รัน linter
bun run typecheck    # ตรวจสอบ TypeScript
bun run format       # format code ด้วย Prettier
bun run clean        # ลบ cache ทั้งหมด
bun run setup        # auto setup โปรเจค
bun run check-deps   # ตรวจสอบ dependencies ที่ล้าสมัย
bun run analyze      # วิเคราะห์ bundle size
```

## 🌍 Environment Variables

สร้างไฟล์ `.env.local`:

```env
NOTION_TOKEN=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 📁 Project Structure

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
│   ├── BlogList.tsx
│   ├── Navbar.tsx
│   └── ...
├── lib/                   # Utilities
│   ├── notion.ts          # Notion API
│   ├── cache.ts           # In-memory cache
│   ├── performance.ts     # Performance utilities
│   └── utils.ts
├── scripts/               # Bun scripts
│   ├── setup.js           # Auto setup
│   ├── clean.js           # Clean cache
│   └── ...
└── public/                # Static assets
```

## 🎨 Design System

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
- Gradient fade effects

## 📝 Notion Setup

1. สร้าง Integration ใน [Notion Integrations](https://www.notion.so/my-integrations)
2. สร้าง Database ใน Notion ด้วย properties:
   - **Name** (Title)
   - **Slug** (Rich Text)
   - **Tags** (Multi-select หรือ Rich Text)
   - **Date** (Date)
   - **Cover** (Files & Media)
3. Share database กับ Integration
4. Copy Token และ Database ID ไปใส่ใน `.env.local`

## 🚀 Deployment

### Vercel (แนะนำ)

โปรเจคนี้ใช้ Bun บน Vercel โดยอัตโนมัติ (ตาม `vercel.json`)

1. เชื่อมต่อ GitHub repository กับ Vercel
2. เพิ่ม Environment Variables:
   - `NOTION_TOKEN`
   - `NOTION_DATABASE_ID`
3. Deploy! 🚀

Vercel จะใช้:
- Install: `bun install` (เร็วกว่า npm)
- Build: `bun run build`
- Region: Singapore (sin1) - ใกล้ไทยที่สุด

## ⚡ Performance

- **Lighthouse Score:** 95+
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 2.5s
- **Bundle Size:** < 200KB (gzipped)
- **Install Speed:** ~2-5s (Bun) vs ~30-60s (npm)
- **Build Speed:** ~12s (Turbopack)
- **Dev Server:** Ready in 3.3s

## 🧪 Testing

```bash
# รัน tests
bun test

# รัน tests แบบ watch mode
bun test:watch

# รัน tests พร้อม coverage
bun test --coverage
```

## 🔧 CI/CD

- **GitHub Actions** - Auto CI/CD pipeline
- **Dependabot** - Auto dependency updates
- **Lighthouse CI** - Performance monitoring
- **Auto Deploy** - Deploy to Vercel on push

## 🤝 Contributing

Pull requests are welcome! สำหรับการเปลี่ยนแปลงใหญ่ กรุณาเปิด issue ก่อน

## 📄 License

MIT License - ใช้งานได้อย่างอิสระ

## 👨‍💻 Author

**Satayu Pongpan**
- Website: [satayupongpan.site](https://satayupongpan.site/)
- GitHub: [@DDME36](https://github.com/DDME36)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Bun](https://bun.sh/)
- [Vercel](https://vercel.com/)
- [Notion](https://notion.so/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

Made with ❤️ and ⚡ Bun in Thailand
