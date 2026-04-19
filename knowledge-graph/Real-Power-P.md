# Real Power (P) - กำลังจริง

## คำนิยาม
**กำลังจริง (Real Power)** คือกำลังไฟฟ้าที่ใช้งานได้จริง แปลงเป็นงานหรือความร้อน

## สัญลักษณ์
- **P** = Real Power (Active Power)
- หน่วย: **Watt (W)**, **kW**, **MW**

## สูตร

### 1 เฟส
$$P = V \times I \times \cos\theta$$
$$P = S \times PF$$

### 3 เฟส
$$P = \sqrt{3} \times V_L \times I_L \times \cos\theta$$

### จากสามเหลี่ยมกำลัง
$$P = S \times \cos\theta$$
$$P = \sqrt{S^2 - Q^2}$$

## ความสัมพันธ์กับแนวคิดอื่น

### 🔺 สามเหลี่ยมกำลัง
- [[Real-Power-P]] = ด้านประชิด
- [[Reactive-Power-Q]] = ด้านตรงข้าม
- [[Apparent-Power-S]] = ด้านตรงข้ามมุมฉาก
- [[Power-Factor-PF]] = P/S

### ⚡ รูปแบบเชิงซ้อน
$$\vec{S} = P + jQ$$
- P = ส่วนจริง (Real part)
- Q = ส่วนจินตภาพ (Imaginary part)

## ตัวอย่างการคำนวณ

### ตัวอย่าง 1: หา P จาก S และ PF
```
S = 10 kVA, PF = 0.8
P = S × PF = 10 × 0.8 = 8 kW
```

### ตัวอย่าง 2: ระบบ 3 เฟส
```
V_L = 380V, I_L = 100A, PF = 0.85
P = √3 × V_L × I_L × cosθ
P = 1.732 × 380 × 100 × 0.85
P = 55,944 W ≈ 56 kW
```

### ตัวอย่าง 3: หา P จาก S และ Q
```
S = 10 kVA, Q = 6 kVAR
P = √(S² - Q²) = √(10² - 6²)
P = √(100 - 36) = √64 = 8 kW
```

## การใช้งาน
- ค่าไฟบ้าน: คิดจาก kWh
- [[Motor]]: P (kW) บนเนมเพลต = Output
- [[Transformer]]: ระบุเป็น S (kVA)

## Tags
#power #AC #real-power #kW

