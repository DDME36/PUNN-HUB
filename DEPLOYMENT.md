# 🚀 Deployment Guide - PUNN HUB

## 📋 Pre-Deployment Checklist

### ✅ ที่ทำเสร็จแล้ว

- [x] เปลี่ยน revalidate เป็น 3600 วินาที (1 ชั่วโมง)
- [x] เพิ่ม manifest.ts สำหรับ PWA
- [x] สร้าง favicon และ icons
- [x] อัพเดท metadata ให้ใช้ https://punn.site
- [x] สร้าง .env.local.example
- [x] ตั้งค่า SEO (sitemap, robots.txt)
- [x] เพิ่ม Analytics placeholder

### 📝 ที่ต้องทำก่อน Deploy

- [ ] สร้าง icon-192.png และ icon-512.png ใส่ใน /public
- [ ] ตรวจสอบ .env.local มี NOTION_API_KEY และ NOTION_DATABASE_ID
- [ ] ทดสอบ build ด้วย `npm run build`

---

## 🔄 Push ไป GitHub (Force Push - ลบไฟล์เก่า)

```bash
# 1. ตรวจสอบว่าอยู่ใน branch ที่ถูกต้อง
git branch

# 2. ลบ git history เก่าและเริ่มใหม่
rm -rf .git
git init

# 3. เพิ่มไฟล์ทั้งหมด (จะข้าม node_modules และ .next อัตโนมัติ)
git add .

# 4. Commit
git commit -m "Production ready - Complete rebuild"

# 5. เชื่อมกับ GitHub repo
git remote add origin https://github.com/DDME36/PUNN-HUB.git

# 6. Force push (ลบไฟล์เก่าทั้งหมด)
git push -u origin main --force
```

**⚠️ คำเตือน:** `--force` จะลบ history เก่าทั้งหมด ตรวจสอบให้แน่ใจก่อน!

---

## 🌐 Deploy บน Vercel

### วิธีที่ 1: ผ่าน Vercel Dashboard (แนะนำ)

1. ไปที่ [vercel.com](https://vercel.com)
2. คลิก "Add New Project"
3. Import GitHub repository: `DDME36/PUNN-HUB`
4. ตั้งค่า Environment Variables:
   ```
   NOTION_API_KEY=your_notion_integration_token
   NOTION_DATABASE_ID=your_notion_database_id
   ```
5. ตั้งค่า Custom Domain:
   - ไปที่ Project Settings → Domains
   - เพิ่ม `punn.site` และ `www.punn.site`
   - ตั้งค่า DNS ตามที่ Vercel แนะนำ
6. คลิก "Deploy"

### วิธีที่ 2: ผ่าน Vercel CLI

```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# เพิ่ม Environment Variables
vercel env add NOTION_API_KEY
vercel env add NOTION_DATABASE_ID

# เพิ่ม Custom Domain
vercel domains add punn.site
```

---

## 🔧 ตั้งค่า Custom Domain (punn.site)

### DNS Settings ที่ต้องเพิ่ม:

**A Record:**

```
Type: A
Name: @
Value: 76.76.21.21 (Vercel IP)
```

**CNAME Record:**

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**หรือใช้ Nameservers ของ Vercel:**

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

---

## 📊 Post-Deployment

### 1. ตรวจสอบเว็บไซต์

- [ ] เปิด https://punn.site ดูว่าทำงานปกติ
- [ ] ทดสอบหน้าบทความ
- [ ] ทดสอบ responsive design
- [ ] ตรวจสอบ SEO ด้วย [PageSpeed Insights](https://pagespeed.web.dev/)

### 2. เพิ่ม Analytics (Optional)

**Vercel Analytics:**

```bash
npm install @vercel/analytics
```

แก้ไข `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Google Analytics:**

1. สร้าง GA4 property
2. เพิ่ม Measurement ID ใน `components/Analytics.tsx`

### 3. Submit Sitemap

- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters

Submit sitemap: `https://punn.site/sitemap.xml`

---

## 🐛 Troubleshooting

### Build Error

```bash
# ลอง build ใน local ก่อน
npm run build
npm start
```

### Environment Variables ไม่ทำงาน

- ตรวจสอบว่าเพิ่มใน Vercel Dashboard แล้ว
- Redeploy หลังเพิ่ม env vars

### Domain ไม่ทำงาน

- รอ DNS propagation (24-48 ชั่วโมง)
- ตรวจสอบ DNS ด้วย: https://dnschecker.org/

---

## 📞 Support

- GitHub Issues: https://github.com/DDME36/PUNN-HUB/issues
- Vercel Support: https://vercel.com/support

---

**Made with ❤️ by Satayu Pongpan**
