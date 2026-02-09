# คู่มือการใช้งาน Notion สำหรับ PUNN HUB

## การเพิ่มรูปปกบทความ (Cover Image)

### วิธีที่ 1: Upload รูปจากเครื่อง
1. เปิดบทความใน Notion
2. คลิก **"Add cover"** ที่ด้านบนสุด
3. เลือก **"Upload"**
4. เลือกไฟล์รูป (แนะนำ: JPG, PNG, ขนาด 1200x630px)

### วิธีที่ 2: ใช้ URL รูปภาพ
1. คลิก **"Add cover"**
2. เลือก **"Link"**
3. วาง URL รูปภาพ เช่น:
   - `https://images.unsplash.com/photo-xxx`
   - `https://i.imgur.com/xxx.jpg`

### วิธีที่ 3: ใช้ Unsplash (แนะนำ - ฟรีและสวย)
1. คลิก **"Add cover"**
2. เลือก **"Unsplash"**
3. ค้นหาคำที่เกี่ยวข้อง เช่น:
   - "technology"
   - "coding"
   - "abstract"
   - "minimal"
4. คลิกเลือกรูปที่ชอบ

## โครงสร้าง Database ที่ต้องมี

ตรวจสอบว่า Notion Database มี Properties เหล่านี้:

### Properties ที่จำเป็น:
- **Name** (Title) - ชื่อบทความ
- **Slug** (Rich Text) - URL slug เช่น "my-first-post"
- **Tags** (Multi-select หรือ Rich Text) - หมวดหมู่
- **Date** (Date) - วันที่เผยแพร่
- **Cover** (ไม่ต้องสร้าง property - ใช้ Cover ของหน้าเลย)

### ตัวอย่าง Slug ที่ดี:
- ✅ `introduction-to-nextjs`
- ✅ `react-hooks-guide`
- ✅ `typescript-tips`
- ❌ `บทความแรก` (ไม่ควรใช้ภาษาไทย)
- ❌ `My First Post!` (ไม่ควรมีช่องว่างและอักขระพิเศษ)

## ขนาดรูปที่แนะนำ

### สำหรับ Cover Image:
- **ขนาด:** 1200 x 630 px (อัตราส่วน 1.91:1)
- **ไฟล์:** JPG หรือ PNG
- **ขนาดไฟล์:** ไม่เกิน 2 MB

### สำหรับรูปในเนื้อหา:
- **ขนาด:** 800-1200 px กว้าง
- **ไฟล์:** JPG, PNG, หรือ WebP
- **ขนาดไฟล์:** ไม่เกิน 1 MB

## แหล่งรูปฟรีที่แนะนำ

1. **Unsplash** - https://unsplash.com
   - รูปคุณภาพสูง ฟรี ไม่ต้องระบุแหล่งที่มา
   
2. **Pexels** - https://pexels.com
   - รูปและวิดีโอฟรี
   
3. **Pixabay** - https://pixabay.com
   - รูปและ vector ฟรี

## การเปลี่ยนหรือลบรูปปก

### เปลี่ยนรูป:
1. Hover เมาส์ที่รูปปก
2. คลิก **"Change cover"**
3. เลือกรูปใหม่

### ลบรูป:
1. Hover เมาส์ที่รูปปก
2. คลิก **"Remove"**

## Tips สำหรับรูปปกที่สวย

1. **ใช้สีที่สอดคล้องกับ Theme**
   - เว็บใช้สี Rose, Purple, Blue
   - เลือกรูปที่มีโทนสีใกล้เคียง

2. **ใช้รูปที่มีพื้นที่ว่าง**
   - เพื่อให้ชื่อบทความอ่านง่าย

3. **หลีกเลี่ยงรูปที่มีข้อความ**
   - เพราะจะซ้อนกับชื่อบทความ

4. **ใช้รูปที่เกี่ยวข้องกับเนื้อหา**
   - บทความเกี่ยว AI → ใช้รูป technology, AI
   - บทความเกี่ยว Design → ใช้รูป minimal, abstract

## ตัวอย่างการค้นหารูปใน Unsplash

สำหรับบทความเกี่ยวกับ:
- **Programming:** "coding", "developer", "technology"
- **AI/ML:** "artificial intelligence", "neural network", "data"
- **Web Design:** "minimal", "abstract", "gradient"
- **Tutorial:** "learning", "education", "workspace"

## การตรวจสอบว่ารูปแสดงผลหรือไม่

1. เปิดเว็บไซต์ที่ http://localhost:3000/blog
2. ดูว่ารูปปกแสดงผลหรือไม่
3. ถ้าไม่แสดง:
   - ตรวจสอบว่าใส่รูปปกใน Notion แล้ว
   - รอ 60 วินาที (ISR revalidate)
   - Refresh หน้าเว็บ

## ปัญหาที่พบบ่อย

### รูปไม่แสดง
- ✅ ตรวจสอบว่าใส่รูปปกใน Notion แล้ว
- ✅ ตรวจสอบว่า URL รูปถูกต้อง
- ✅ รอให้ cache หมดอายุ (60 วินาที)

### รูปแสดงช้า
- ✅ ใช้รูปขนาดเล็กกว่า 2 MB
- ✅ ใช้ JPG แทน PNG สำหรับรูปถ่าย

### รูปไม่สวย
- ✅ ใช้รูปขนาด 1200x630px
- ✅ เลือกรูปที่มีคุณภาพสูง
- ✅ หลีกเลี่ยงรูปที่มีข้อความ

---

**หมายเหตุ:** เว็บไซต์จะ cache รูปภาพอัตโนมัติเพื่อความเร็ว ถ้าเปลี่ยนรูปแล้วไม่เห็นผล ให้รอ 60 วินาทีหรือ restart dev server
