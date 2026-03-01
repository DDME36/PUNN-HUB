# Images Folder

วางรูปภาพสำหรับ Bento Grid Cards ที่นี่

## วิธีใช้งาน

1. วางไฟล์รูปภาพในโฟลเดอร์นี้ (เช่น `card-bg.jpg`)
2. ใช้ใน BentoGrid component แบบนี้:

```tsx
<Card
    href="your-link"
    bgImage="/images/card-bg.jpg"
    className="..."
>
```

## แนะนำ

- **ขนาดรูป:** 1200x800 px หรือมากกว่า
- **รูปแบบไฟล์:** JPG, PNG, WebP
- **ขนาดไฟล์:** ไม่เกิน 500KB (ใช้ TinyPNG หรือ Squoosh.app เพื่อบีบอัด)
- **ชื่อไฟล์:** ใช้ชื่อที่สื่อความหมาย เช่น `stock-bg.jpg`, `investing-bg.jpg`

## ตัวอย่างการใช้งาน

```tsx
// Card with background image
<Card
  href="https://example.com"
  bgImage="/images/my-background.jpg"
  className="!border-none !text-white"
>
  <h3>Card Title</h3>
  <p>Card description</p>
</Card>
```
