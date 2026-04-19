# Reactive Power (Q) - กำลังรีแอคทีฟ

## คำนิยาม
**กำลังรีแอคทีฟ (Reactive Power)** คือกำลังไฟฟ้าที่ไม่ได้ใช้งาน แต่เก็บและคืนกลับในสนามแม่เหล็กและสนามไฟฟ้า

## สัญลักษณ์
- **Q** = Reactive Power
- หน่วย: **VAR (Volt-Ampere Reactive)**, **kVAR**, **MVAR**

## สูตร

### 1 เฟส
$$Q = V \times I \times \sin\theta$$
$$Q = S \times \sin\theta$$

### 3 เฟส
$$Q = \sqrt{3} \times V_L \times I_L \times \sin\theta$$

### จากสามเหลี่ยมกำลัง
$$Q = \sqrt{S^2 - P^2}$$
$$Q = P \times \tan\theta$$

## ประเภท

### Q ล้าหลัง (+Q) - Lagging
- เกิดจาก [[Inductor-L]]
- [[Motor]], [[Transformer]]
- [[Inductive-Reactance-XL]]
- กระแสล้าหลังแรงดัน

### Q นำหน้า (-Q) - Leading
- เกิดจาก [[Capacitor-C]]
- [[Capacitor-Bank]]
- [[Capacitive-Reactance-XC]]
- กระแสนำหน้าแรงดัน

## ความสัมพันธ์กับแนวคิดอื่น

### 🔺 สามเหลี่ยมกำลัง
```
      S
     /|
    / |
   /  | Q
  /   |
 /θ___|
    P
```

### ⚡ Power Factor
$$PF = \cos\theta = \frac{P}{S}$$
$$\tan\theta = \frac{Q}{P}$$

Q สูง → PF ต่ำ

## ตัวอย่างการคำนวณ

### ตัวอย่าง 1: หา Q จาก S และ P
```
S = 10 kVA, P = 8 kW
Q = √(S² - P²) = √(10² - 8²)
Q = √(100 - 64) = √36 = 6 kVAR
```

### ตัวอย่าง 2: หา Q จาก P และ PF
```
P = 10 kW, PF = 0.7
θ = cos⁻¹(0.7) = 45.57°
Q = P × tan θ = 10 × tan(45.57°)
Q = 10 × 1.02 = 10.2 kVAR
```

### ตัวอย่าง 3: การแก้ PF
```
มอเตอร์: P = 100 kW, PF = 0.7
Q₁ = 100 × tan(45.57°) = 102 kVAR (ล้าหลัง)

ต้องการ PF = 0.95
Q₂ = 100 × tan(18.19°) = 33 kVAR

ติดตั้ง Capacitor Bank:
Q_C = Q₁ - Q₂ = 102 - 33 = 69 kVAR
```

## ผลกระทบของ Q สูง
- [[Power-Factor-PF]] ต่ำ
- กระแสสูง
- สูญเสียในสายมาก
- ค่าปรับจากการไฟฟ้า

## การแก้ไข
- ใช้ [[Capacitor-Bank]]
- [[Power-Factor-Correction]]
- ลด Q ล้าหลัง

## Tags
#power #AC #reactive-power #kVAR

