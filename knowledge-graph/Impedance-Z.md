# Impedance (Z) - อิมพีแดนซ์

## คำนิยาม
**อิมพีแดนซ์ (Impedance)** คือความต้านทานรวมในวงจร AC ที่รวม [[Resistance-R]] และ [[Reactance]] เข้าด้วยกัน เป็นจำนวนเชิงซ้อน

## สัญลักษณ์
- **Z** = Impedance (อิมพีแดนซ์)
- หน่วย: **Ohm (Ω)**

## สูตรพื้นฐาน
$$Z = R + jX$$

$$Z = R + j(X_L - X_C)$$

$$|Z| = \sqrt{R^2 + X^2}$$

$$\angle Z = \tan^{-1}\left(\frac{X}{R}\right)$$

## รูปแบบการแสดง

### 1. Rectangular Form (รูปสี่เหลี่ยม)
$$Z = R + jX$$
- R = ส่วนจริง (Real part)
- X = ส่วนจินตภาพ (Imaginary part)

### 2. Polar Form (รูปเชิงขั้ว)
$$Z = |Z| \angle \theta$$
- |Z| = ขนาด (Magnitude)
- θ = มุม (Phase angle)

## ความสัมพันธ์กับแนวคิดอื่น

### ⚡ แนวคิดพื้นฐาน
- [[Resistance-R]] + [[Reactance]] → [[Impedance-Z]]
- [[Impedance-Z]] → ขยาย [[Ohms-Law]] สู่ AC: $\vec{V} = \vec{I} \times \vec{Z}$
- [[Impedance-Z]] → กำหนด [[Power-Factor-PF]]: $\cos\theta = \frac{R}{|Z|}$

### 🔌 ส่วนประกอบ
- [[Resistance-R]]: ส่วนจริง (แกน Real)
- [[Inductive-Reactance-XL]]: $+jX_L$ (แกน Imaginary บวก)
- [[Capacitive-Reactance-XC]]: $-jX_C$ (แกน Imaginary ลบ)

### 🔺 สามเหลี่ยมอิมพีแดนซ์
```
      |Z|
     /|
    / |
   /  | X
  /   |
 /θ___|
    R
```

### ⚙️ ในเครื่องจักร
- [[Transformer]]: [[Percent-Impedance-Z]] (% Z)
- [[Motor]]: อิมพีแดนซ์ขดลวด
- [[Short-Circuit-Current]]: $I_{sc} = \frac{V}{Z}$

## ตัวอย่างการคำนวณ

### ตัวอย่าง 1: R-L Series
```
R = 3Ω, X_L = 4Ω
Z = 3 + j4 Ω
|Z| = √(3² + 4²) = 5Ω
∠Z = tan⁻¹(4/3) = 53.13°
```

### ตัวอย่าง 2: R-L-C Series
```
R = 10Ω, X_L = 20Ω, X_C = 15Ω
X = X_L - X_C = 20 - 15 = 5Ω
Z = 10 + j5 Ω
|Z| = √(10² + 5²) = 11.18Ω
∠Z = tan⁻¹(5/10) = 26.57°
```

### ตัวอย่าง 3: หากระแส
```
V = 220∠0° V, Z = 10 + j5 Ω = 11.18∠26.57° Ω
I = V/Z = 220∠0° / 11.18∠26.57°
I = 19.68∠-26.57° A
```

## การต่อวงจร

### Series (อนุกรม)
$$Z_{total} = Z_1 + Z_2 + Z_3$$

### Parallel (ขนานกัน)
$$\frac{1}{Z_{total}} = \frac{1}{Z_1} + \frac{1}{Z_2}$$

## ข้อผิดพลาดที่พบบ่อย
❌ **ผิด:** Z = R + X (บวกตรงๆ)  
✅ **ถูก:** $Z = R + jX$ (ต้องใช้ [[Complex-Numbers-AC]])

❌ **ผิด:** |Z| = R + X  
✅ **ถูก:** $|Z| = \sqrt{R^2 + X^2}$ (ทฤษฎีพีทาโกรัส)

❌ **ผิด:** ใช้ V = IR ใน AC  
✅ **ถูก:** ต้องใช้ $\vec{V} = \vec{I} \times \vec{Z}$ และคำนึงมุม

## ความหมายของมุม θ
- **θ > 0** (บวก): Inductive (ล้าหลัง) → $X_L > X_C$
- **θ = 0**: Resistive (เฟส) → $X_L = X_C$ (Resonance)
- **θ < 0** (ลบ): Capacitive (นำหน้า) → $X_C > X_L$

## ความสัมพันธ์กับ Power Factor
$$PF = \cos\theta = \frac{R}{|Z|}$$

## Tags
#AC #impedance #complex-numbers #fundamental
