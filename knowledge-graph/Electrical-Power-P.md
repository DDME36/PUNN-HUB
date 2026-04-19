# Electrical Power (P) - กำลังไฟฟ้า

## คำนิยาม
**กำลังไฟฟ้า (Electrical Power)** คืออัตราการใช้หรือผลิตพลังงานไฟฟ้าต่อหนึ่งหน่วยเวลา

## สัญลักษณ์
- **P** = Power (วัตต์)
- หน่วย: **Watt (W)**, **Kilowatt (kW)**, **Megawatt (MW)**

## สูตรพื้นฐาน (DC)
$$P = V \times I$$

$$P = I^2 \times R$$

$$P = \frac{V^2}{R}$$

## ความสัมพันธ์กับแนวคิดอื่น

### ⚡ แนวคิดพื้นฐาน
- [[Voltage-V]] × [[Current-I]] → [[Electrical-Power-P]]
- [[Electrical-Power-P]] → ส่วนจริงของ [[Apparent-Power-S]]
- [[Electrical-Power-P]] = [[Real-Power-P]] (ในระบบ AC)

### 🔺 ในระบบ AC
- [[Electrical-Power-P]] → เรียกว่า [[Real-Power-P]]
- [[Real-Power-P]] + [[Reactive-Power-Q]] → [[Apparent-Power-S]]
- $P = S \times \cos\theta$ (ใช้ [[Power-Factor-PF]])

### 🏭 ในระบบ 3 เฟส
- **1 เฟส**: $P = V \times I \times \cos\theta$
- **3 เฟส**: $P = \sqrt{3} \times V_L \times I_L \times \cos\theta$
- ต้องใช้ [[Square-Root-3-Rule]]

### ⚙️ ในเครื่องจักร
- [[Motor]]: P (kW) บนเนมเพลต = กำลังขาออกที่เพลา
- [[Transformer]]: S (kVA) บนเนมเพลต = [[Apparent-Power-S]]

## หน่วยพลังงาน vs กำลัง
- **กำลัง (Power)**: W, kW → อัตราการใช้
- **พลังงาน (Energy)**: Wh, kWh → ปริมาณที่ใช้

$$\text{Energy (kWh)} = \text{Power (kW)} \times \text{Time (h)}$$

## ตัวอย่างการคำนวณ

### ตัวอย่าง 1: DC Circuit
```
V = 220V, I = 5A
P = V × I = 220 × 5 = 1,100W = 1.1kW
```

### ตัวอย่าง 2: AC 1-Phase
```
V = 220V, I = 10A, PF = 0.8
P = V × I × cosθ = 220 × 10 × 0.8 = 1,760W
```

### ตัวอย่าง 3: AC 3-Phase
```
V_L = 380V, I_L = 10A, PF = 0.85
P = √3 × V_L × I_L × cosθ
P = 1.732 × 380 × 10 × 0.85
P = 5,593W ≈ 5.6kW
```

## ค่าไฟบ้าน
```
หลอดไฟ LED 10W ใช้ 8 ชม./วัน
Energy = 10W × 8h = 80Wh = 0.08kWh/วัน
ต่อเดือน = 0.08 × 30 = 2.4 kWh
ค่าไฟ = 2.4 × 4 บาท = 9.6 บาท/เดือน
```

## ข้อผิดพลาดที่พบบ่อย
❌ **ผิด:** ใช้ P = V × I ใน AC โดยไม่คูณ PF  
✅ **ถูก:** ต้องใช้ $P = V \times I \times \cos\theta$

❌ **ผิด:** คิดว่า kW กับ kVA เหมือนกัน  
✅ **ถูก:** kW = [[Real-Power-P]], kVA = [[Apparent-Power-S]]

❌ **ผิด:** ลืมคูณ √3 ในระบบ 3 เฟส  
✅ **ถูก:** ต้องใช้ [[Square-Root-3-Rule]]

## การสูญเสียกำลัง
$$P_{loss} = I^2 R$$
- เหตุผลที่สายส่งใช้แรงดันสูง
- ลด I → ลด $I^2R$ loss

## Tags
#fundamental #power #DC #AC #พื้นฐาน #กำลัง
