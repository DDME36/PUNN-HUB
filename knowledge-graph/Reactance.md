# Reactance (X) - รีแอคแตนซ์

## คำนิยาม
**รีแอคแตนซ์ (Reactance)** คือความต้านทานในวงจร AC ที่เกิดจาก [[Inductor-L]] และ [[Capacitor-C]] ซึ่งไม่สูญเสียพลังงานเป็นความร้อน แต่เก็บและคืนพลังงานกลับ

## สัญลักษณ์
- **X** = Reactance (รีแอคแตนซ์)
- หน่วย: **Ohm (Ω)**

## ประเภท

### 1. Inductive Reactance (XL)
$$X_L = 2\pi f L = \omega L$$
- เกิดจาก [[Inductor-L]]
- เพิ่มตาม [[Frequency-f]]
- ทำให้กระแสล้าหลังแรงดัน 90°

### 2. Capacitive Reactance (XC)
$$X_C = \frac{1}{2\pi f C} = \frac{1}{\omega C}$$
- เกิดจาก [[Capacitor-C]]
- ลดลงตาม [[Frequency-f]]
- ทำให้กระแสนำหน้าแรงดัน 90°

## ความสัมพันธ์กับแนวคิดอื่น

### ⚡ อิมพีแดนซ์
$$Z = R + jX$$
$$X = X_L - X_C$$

- [[Reactance]] + [[Resistance-R]] → [[Impedance-Z]]
- [[Inductive-Reactance-XL]] → $+jX_L$
- [[Capacitive-Reactance-XC]] → $-jX_C$

### 🔺 กำลังไฟฟ้า
- [[Reactance]] → สร้าง [[Reactive-Power-Q]]
- ไม่สร้าง [[Real-Power-P]]
- ส่งผลต่อ [[Power-Factor-PF]]

## ตัวอย่างการคำนวณ

### ตัวอย่าง 1: วงจร R-L
```
R = 3Ω, X_L = 4Ω
X = X_L = 4Ω
Z = 3 + j4 = 5∠53.13° Ω
```

### ตัวอย่าง 2: วงจร R-L-C
```
R = 10Ω, X_L = 20Ω, X_C = 15Ω
X = X_L - X_C = 20 - 15 = 5Ω (Inductive)
Z = 10 + j5 Ω
```

### ตัวอย่าง 3: Resonance
```
X_L = X_C = 50Ω
X = X_L - X_C = 0Ω
Z = R (เหลือแค่ความต้านทาน)
PF = 1.0 (Unity)
```

## คุณสมบัติ

### ความถี่ต่ำ
- $X_L$ ต่ำ → Inductor ต้านน้อย
- $X_C$ สูง → Capacitor ต้านมาก

### ความถี่สูง
- $X_L$ สูง → Inductor ต้านมาก
- $X_C$ ต่ำ → Capacitor ต้านน้อย

### Resonance (เรโซแนนซ์)
$$X_L = X_C$$
$$X = 0$$
- [[Impedance-Z]] = R (ต่ำสุด)
- [[Current-I]] สูงสุด
- [[Power-Factor-PF]] = 1.0

## ข้อแตกต่างระหว่าง R และ X

| คุณสมบัติ | Resistance (R) | Reactance (X) |
|---|---|---|
| พลังงาน | สูญเสียเป็นความร้อน | เก็บและคืนกลับ |
| เฟส | ไม่เลื่อนเฟส | เลื่อนเฟส 90° |
| ความถี่ | ไม่ขึ้นกับความถี่ | ขึ้นกับความถี่ |
| กำลัง | สร้าง P (Real) | สร้าง Q (Reactive) |
| ใน DC | มีผล | ไม่มีผล |

## ข้อผิดพลาดที่พบบ่อย

❌ **ผิด:** X = X_L + X_C  
✅ **ถูก:** X = X_L - X_C

❌ **ผิด:** Reactance สูญเสียพลังงาน  
✅ **ถูก:** Reactance เก็บและคืนพลังงาน (ไม่สูญเสีย)

❌ **ผิด:** X คงที่เหมือน R  
✅ **ถูก:** X ขึ้นกับความถี่

## Tags
#AC #reactance #impedance #fundamental

