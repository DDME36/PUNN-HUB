# Three-Phase System - ระบบ 3 เฟส

## คำนิยาม
**ระบบ 3 เฟส (Three-Phase System)** คือระบบไฟฟ้ากระแสสลับที่มี 3 แรงดันที่แยกเฟสกัน 120° ใช้ในโรงงานและสายส่งกำลังไฟฟ้า

## ลักษณะเฉพาะ
- **3 เฟส**: A, B, C (หรือ R, S, T)
- **เฟสต่างกัน**: 120° (360°/3)
- **ความถี่**: 50 Hz (ไทย) หรือ 60 Hz (USA)

## ข้อดีของระบบ 3 เฟส
1. **ประหยัดสาย**: ใช้สาย 3-4 เส้น แทน 6 เส้น
2. **กำลังคงที่**: P ไม่เต้นเหมือน [[Single-Phase-System]]
3. **มอเตอร์ดีกว่า**: สตาร์ทง่าย, แรงบิดสม่ำเสมอ
4. **ประสิทธิภาพสูง**: สูญเสียน้อยกว่า

## ความสัมพันธ์กับแนวคิดอื่น

### ⚡ พื้นฐาน
- [[Single-Phase-System]] × 3 → [[Three-Phase-System]]
- [[Three-Phase-System]] → ใช้ [[Square-Root-3-Rule]]
- [[Three-Phase-System]] → มี 2 แบบ: [[Star-Connection]], [[Delta-Connection]]

### 🔌 แรงดันและกระแส
- [[Line-Voltage-vs-Phase-Voltage]]
- **Star**: $V_L = \sqrt{3} \times V_P$, $I_L = I_P$
- **Delta**: $V_L = V_P$, $I_L = \sqrt{3} \times I_P$

### ⚡ กำลังไฟฟ้า
$$P_{3\phi} = \sqrt{3} \times V_L \times I_L \times \cos\theta$$

$$S_{3\phi} = \sqrt{3} \times V_L \times I_L$$

$$Q_{3\phi} = \sqrt{3} \times V_L \times I_L \times \sin\theta$$

## การต่อแบบต่างๆ

### 1. Star (Y) - [[Star-Connection]]
```
     A
     |
N----+----B
     |
     C
```
- 4 สาย: A, B, C, N
- $V_L = \sqrt{3} \times V_P = 380V$ (ถ้า $V_P = 220V$)
- $I_L = I_P$

### 2. Delta (Δ) - [[Delta-Connection]]
```
    A---B
    |\ /|
    | X |
    |/ \|
    C---
```
- 3 สาย: A, B, C (ไม่มี N)
- $V_L = V_P$
- $I_L = \sqrt{3} \times I_P$

## แรงดันมาตรฐานในไทย
- **220V**: เฟสกับนิวทรัล (1 เฟส)
- **380V**: เฟสกับเฟส (3 เฟส)
- **380V = 220V × √3**

## ตัวอย่างการคำนวณ

### ตัวอย่าง 1: หากำลัง 3 เฟส
```
V_L = 380V, I_L = 50A, PF = 0.85
P = √3 × V_L × I_L × cosθ
P = 1.732 × 380 × 50 × 0.85
P = 28,000W = 28 kW
```

### ตัวอย่าง 2: Star Connection
```
V_L = 380V
V_P = V_L / √3 = 380 / 1.732 = 220V
(นี่คือเหตุผลที่บ้านได้ 220V จากระบบ 380V)
```

### ตัวอย่าง 3: Delta Connection
```
I_L = 100A
I_P = I_L / √3 = 100 / 1.732 = 57.7A
(กระแสในขดลวดน้อยกว่ากระแสสาย)
```

## การใช้งาน

### Single-Phase (1 เฟส)
- บ้านเรือน
- เครื่องใช้ไฟฟ้าขนาดเล็ก
- แสงสว่าง

### Three-Phase (3 เฟส)
- โรงงาน
- [[Motor]] ขนาดใหญ่
- [[Transformer]] กำลังสูง
- ลิฟต์, ปั๊มน้ำ
- ระบบสายส่ง ([[Transmission-Line-Parameters]])
- การวิเคราะห์ระบบ ([[Load-Flow-Analysis]], [[Fault-Analysis]])

## ข้อผิดพลาดที่พบบ่อย
❌ **ผิด:** 380V = 220V × 2  
✅ **ถูก:** 380V = 220V × √3 = 220V × 1.732

❌ **ผิด:** ลืมคูณ √3 ตอนหากำลัง 3 เฟส  
✅ **ถูก:** $P_{3\phi} = \sqrt{3} \times V_L \times I_L \times \cos\theta$

❌ **ผิด:** คิดว่า 3 เฟส = 1 เฟส × 3  
✅ **ถูก:** $P_{3\phi} = \sqrt{3} \times P_{1\phi}$ (ไม่ใช่ 3 เท่า!)

❌ **ผิด:** ใช้สูตร 1 เฟสกับ 3 เฟส  
✅ **ถูก:** ต้องใช้ [[Square-Root-3-Rule]]

## ความสมดุล (Balance)
- **Balanced**: โหลด 3 เฟสเท่ากัน → ไม่มีกระแสใน N
- **Unbalanced**: โหลดไม่เท่ากัน → มีกระแสใน N

## Tags
#three-phase #AC #power-system #3-phase
