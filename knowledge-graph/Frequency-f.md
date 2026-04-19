# Frequency (f) - ความถี่

## คำนิยาม
**ความถี่ (Frequency)** คือจำนวนรอบของคลื่น AC ที่เกิดขึ้นในหนึ่งวินาที

## สัญลักษณ์
- **f** = Frequency (ความถี่)
- หน่วย: **Hertz (Hz)** = รอบ/วินาที

## ค่ามาตรฐาน
- **ไทย, ยุโรป**: 50 Hz
- **USA, ญี่ปุ่น**: 60 Hz
- **เครื่องบิน**: 400 Hz

## ความสัมพันธ์กับแนวคิดอื่น

### ⚡ Reactance
- [[Frequency-f]] → กำหนด [[Inductive-Reactance-XL]]: $X_L = 2\pi f L$
- [[Frequency-f]] → กำหนด [[Capacitive-Reactance-XC]]: $X_C = \frac{1}{2\pi f C}$
- [[Frequency-f]] → ส่งผลต่อ [[Impedance-Z]]

### ⚙️ มอเตอร์
- [[Frequency-f]] → กำหนด [[Synchronous-Speed]]: $N_s = \frac{120f}{P}$
- เปลี่ยน f → เปลี่ยนความเร็วมอเตอร์
- VSD (Variable Speed Drive) ปรับ f

## ความถี่เชิงมุม
$$\omega = 2\pi f$$
- ω = ความถี่เชิงมุม (rad/s)
- f = ความถี่ (Hz)

### ตัวอย่าง
```
f = 50 Hz
ω = 2π × 50 = 314.16 rad/s
```

## ผลของความถี่

### ต่อ Inductor
- f เพิ่ม → XL เพิ่ม → ต้านมากขึ้น
- f = 0 (DC) → XL = 0 → Short

### ต่อ Capacitor
- f เพิ่ม → XC ลด → ต้านน้อยลง
- f = 0 (DC) → XC = ∞ → Open

### ต่อ Resistor
- f ไม่มีผล → R คงที่

## Resonance Frequency
$$f_0 = \frac{1}{2\pi\sqrt{LC}}$$

เมื่อ $X_L = X_C$:
- [[Impedance-Z]] = R (ต่ำสุด)
- [[Current-I]] สูงสุด
- [[Power-Factor-PF]] = 1.0

## ตัวอย่างการคำนวณ

### ตัวอย่าง 1: หาความเร็วมอเตอร์
```
f = 50 Hz, P = 4 poles
N_s = 120f/P = 120 × 50 / 4 = 1500 rpm
```

### ตัวอย่าง 2: หา XL และ XC
```
L = 0.1 H, C = 100 μF, f = 50 Hz

X_L = 2πfL = 2π × 50 × 0.1 = 31.4 Ω
X_C = 1/(2πfC) = 1/(2π × 50 × 0.0001) = 31.8 Ω
```

### ตัวอย่าง 3: Resonance
```
L = 0.1 H, C = 100 μF
f_0 = 1/(2π√LC)
f_0 = 1/(2π√(0.1 × 0.0001))
f_0 = 50.3 Hz
```

## ข้อผิดพลาดที่พบบ่อย

❌ **ผิด:** ความถี่ไทยเป็น 60 Hz  
✅ **ถูก:** ไทยใช้ 50 Hz

❌ **ผิด:** ω = f  
✅ **ถูก:** ω = 2πf

❌ **ผิด:** ความถี่ไม่มีผลต่อ Reactance  
✅ **ถูก:** ความถี่กำหนด XL และ XC

## Tags
#AC #frequency #fundamental

