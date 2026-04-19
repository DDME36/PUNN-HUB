# Synchronous Motor - มอเตอร์ซิงโครนัส

## คำนิยาม
**มอเตอร์ซิงโครนัส (Synchronous Motor)** คือ [[Motor]] ที่หมุนด้วยความเร็วคงที่เท่ากับ [[Synchronous-Speed]] พอดี ไม่มี [[Slip]]

## หลักการทำงาน

### โครงสร้าง
- **Stator**: ขดลวด 3 เฟส (เหมือน Induction Motor)
- **Rotor**: แม่เหล็กถาวรหรือแม่เหล็กไฟฟ้า (DC Excitation)

### การทำงาน
```
1. Stator สร้างสนามแม่เหล็กหมุน (Ns)
2. Rotor มีสนามแม่เหล็กเอง (DC)
3. สนามทั้งสองดึงดูดกัน
4. Rotor หมุนตาม Stator พอดี
5. Nr = Ns (ไม่มี Slip!)
```

## ความเร็ว
$$N_s = \frac{120f}{P}$$

- ความเร็วคงที่ตลอดเวลา
- ไม่เปลี่ยนตามโหลด
- Nr = Ns เสมอ

## ประเภท

### 1. Wound Rotor (DC Excitation)
- โรเตอร์พันขดลวด
- ป้อนกระแส DC ผ่าน Slip Ring
- ปรับ [[Power-Factor-PF]] ได้

### 2. Permanent Magnet (PM)
- ใช้แม่เหล็กถาวร
- ไม่ต้องป้อน DC
- ประสิทธิภาพสูง

## การสตาร์ท

### ปัญหา
- ไม่สามารถสตาร์ทเองได้
- ต้องเร่งความเร็วให้ใกล้ Ns ก่อน

### วิธีสตาร์ท

#### 1. Damper Winding
- มีขดลวดเสริมบนโรเตอร์
- ทำงานเหมือน Induction Motor ตอนสตาร์ท
- พอใกล้ Ns ป้อน DC → Lock เข้า Sync

#### 2. Variable Frequency
- ใช้ [[VSD]] เริ่มที่ความถี่ต่ำ
- เพิ่มความถี่ค่อยๆ
- วิธีที่ดีที่สุด

#### 3. Pony Motor
- ใช้มอเตอร์ตัวเล็กหมุนให้
- พอใกล้ Ns ป้อน DC
- วิธีเก่า

## การควบคุม Power Factor

### Excitation Control
```
Under-excited (If ต่ำ):
→ PF Lagging (ล้าหลัง)
→ ดูด Q จากระบบ

Normal-excited:
→ PF = 1.0 (Unity)

Over-excited (If สูง):
→ PF Leading (นำหน้า)
→ จ่าย Q ให้ระบบ
```

### Synchronous Condenser
- Synchronous Motor ไม่มีโหลด
- Over-excited
- ทำหน้าที่เป็น [[Capacitor-Bank]]
- ใช้แก้ [[Power-Factor-PF]]

## ข้อดี

### 1. ความเร็วคงที่
- Nr = Ns เสมอ
- ไม่เปลี่ยนตามโหลด
- เหมาะกับงานที่ต้องการความแม่นยำ

### 2. ควบคุม PF ได้
- ปรับ Excitation
- แก้ PF ของระบบ
- ลดค่าไฟ

### 3. ประสิทธิภาพสูง
- ไม่มี Slip Loss
- η = 95-98%

### 4. แรงบิดคงที่
- แรงบิดไม่เปลี่ยนตามความเร็ว

## ข้อเสีย

### 1. สตาร์ทยาก
- ต้องมี Damper Winding
- หรือใช้ VSD

### 2. ราคาแพง
- มี Excitation System
- มี Slip Ring (ถ้าไม่ใช่ PM)
- ซับซ้อน

### 3. บำรุงรักษายาก
- มี Slip Ring และ Brush
- ต้องดูแล Excitation

### 4. Out of Step
- ถ้าโหลดเกินไป
- อาจหลุดจาก Sync
- ต้อง Re-synchronize

## การใช้งาน

### เหมาะกับ
- **เครื่องกำเนิดไฟฟ้า** (Generator)
- โรงงานที่ต้องการแก้ PF
- ปั๊มขนาดใหญ่
- คอมเพรสเซอร์

### ไม่เหมาะกับ
- งานที่ต้องปรับความเร็วบ่อย
- โหลดที่เปลี่ยนแปลงมาก
- งานทั่วไป (ใช้ Induction ดีกว่า)

## เปรียบเทียบกับ Induction Motor

| | Synchronous | Induction |
|---|---|---|
| ความเร็ว | Nr = Ns | Nr < Ns |
| Slip | 0% | 3-5% |
| PF | ปรับได้ | คงที่ (ล้าหลัง) |
| ราคา | แพง | ถูก |
| สตาร์ท | ยาก | ง่าย |
| ประสิทธิภาพ | สูงกว่า | ต่ำกว่า |

## Tags
#motor #synchronous #AC #generator #power-factor #excitation

