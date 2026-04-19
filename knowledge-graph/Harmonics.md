# Harmonics - ฮาร์มอนิกส์

## คำนิยาม
**ฮาร์มอนิกส์ (Harmonics)** คือคลื่นความถี่ที่เป็นจำนวนเท่าของความถี่พื้นฐาน (50 Hz) ที่ปนเปื้อนในระบบไฟฟ้า

## ความถี่ฮาร์มอนิกส์
$$f_n = n \times f_1$$

- f₁ = ความถี่พื้นฐาน (50 Hz)
- n = ลำดับฮาร์มอนิกส์ (1, 2, 3, ...)
- fₙ = ความถี่ฮาร์มอนิกส์

### ตัวอย่าง
```
Fundamental (1st): 50 Hz
2nd Harmonic: 100 Hz
3rd Harmonic: 150 Hz
5th Harmonic: 250 Hz
7th Harmonic: 350 Hz
```

## สาเหตุ

### โหลด Non-linear
1. **[[VSD]]** (Variable Speed Drive)
2. **UPS** (Uninterruptible Power Supply)
3. **SMPS** (Switched Mode Power Supply)
4. **Rectifier** (เรียงกระแส)
5. **หลอดฟลูออเรสเซนต์**
6. **LED Driver**

### ลักษณะ
- ดึงกระแสเป็นพัลส์
- ไม่ใช่ Sine Wave
- สร้างฮาร์มอนิกส์

## ประเภท

### Odd Harmonics (คี่)
- 3rd, 5th, 7th, 9th, 11th, ...
- พบมากที่สุด
- อันตรายกว่า

### Even Harmonics (คู่)
- 2nd, 4th, 6th, 8th, ...
- พบน้อย
- มักเกิดจากความผิดปกติ

### Triplen Harmonics
- 3rd, 9th, 15th, 21st, ...
- รวมกันใน Neutral
- ทำให้ Neutral ร้อน

## ผลกระทบ

### 1. ความร้อน
- **Transformer**: ร้อนขึ้น, อายุสั้นลง
- **Motor**: ร้อนขึ้น, แรงบิดลด
- **Neutral**: ร้อนมาก (Triplen)
- **Capacitor**: ร้อน, ระเบิด

### 2. การสูญเสีย
- เพิ่มการสูญเสีย I²R
- ลดประสิทธิภาพ
- เพิ่มค่าไฟ

### 3. อุปกรณ์
- **Circuit Breaker**: ทำงานผิดพลาด
- **Relay**: ทำงานผิดพลาด
- **Meter**: วัดผิด
- **PF Capacitor**: เสียหาย

### 4. สัญญาณรบกวน
- รบกวนอุปกรณ์อิเล็กทรอนิกส์
- รบกวนสัญญาณสื่อสาร
- EMI/RFI

## การวัด

### THD (Total Harmonic Distortion)
$$THD = \frac{\sqrt{I_2^2 + I_3^2 + I_5^2 + ...}}{I_1} \times 100\%$$

### เกณฑ์
- **THD < 5%**: ดีมาก
- **THD 5-10%**: ยอมรับได้
- **THD 10-20%**: มีปัญหา
- **THD > 20%**: อันตราย

## การแก้ไข

### 1. Passive Filter
- ใช้ L-C Filter
- กรองความถี่เฉพาะ
- ราคาถูก

### 2. Active Filter
- ใช้อิเล็กทรอนิกส์
- ฉีดกระแสต้านฮาร์มอนิกส์
- แพงแต่ดีกว่า

### 3. K-Factor Transformer
- หม้อแปลงทนฮาร์มอนิกส์
- K-4, K-13, K-20
- ใช้กับโหลด Non-linear

### 4. Detuned Reactor
- ต่ออนุกรมกับ [[Capacitor-Bank]]
- ป้องกัน Resonance
- ป้องกัน Capacitor เสียหาย

### 5. 12-Pulse Rectifier
- ใช้ Rectifier 12 พัลส์
- ลดฮาร์มอนิกส์
- ใช้ใน [[VSD]] ขนาดใหญ่

## การออกแบบ

### Neutral Sizing
```
ถ้ามี Triplen Harmonics สูง
→ Neutral ต้องใหญ่กว่า Phase
→ หรือใช้ 2 เท่า
```

### Transformer Derating
```
ถ้ามีฮาร์มอนิกส์
→ ลดกำลังหม้อแปลง 10-30%
→ หรือใช้ K-Factor Transformer
```

## มาตรฐาน
- **IEEE 519**: Harmonic Limits
- **IEC 61000**: EMC Standards

## Tags
#harmonics #power-quality #THD #filter #non-linear

