# Transmission Line Parameters - พารามิเตอร์สายส่ง

## คำนิยาม
**พารามิเตอร์สายส่ง** คือค่าต่างๆ ของสายส่งไฟฟ้าแรงสูง ได้แก่ ความต้านทาน (R), ความเหนี่ยวนำ (L), ความจุ (C), และคอนดักแตนซ์ (G)

## พารามิเตอร์ทั้ง 4 ตัว

### 1. Resistance (R) - ความต้านทาน
$R = \frac{\rho \times L}{A} \text{ Ω/km}$

- ρ = ความต้านทานจำเพาะ
  - ทองแดง: 1.72 × 10⁻⁸ Ω·m
  - อลูมิเนียม: 2.83 × 10⁻⁸ Ω·m
  - ACSR: 3.0-3.5 × 10⁻⁸ Ω·m
- L = ความยาว (m)
- A = พื้นที่หน้าตัด (m²)

### 2. Inductance (L) - ความเหนี่ยวนำ
$L = 2 \times 10^{-7} \ln\left(\frac{D_{eq}}{D_s}\right) \text{ H/m/phase}$

หรือ

$L = 0.2 \ln\left(\frac{D_{eq}}{D_s}\right) \text{ mH/km/phase}$

- Deq = [[GMD-and-GMR]] (Geometric Mean Distance)
- Ds = GMR (Geometric Mean Radius)

### 3. Capacitance (C) - ความจุ
$C = \frac{2\pi \epsilon_0}{\ln(D_{eq}/r)} \text{ F/m/phase}$

หรือ

$C = \frac{0.0556}{\ln(D_{eq}/r)} \text{ μF/km/phase}$

- ε₀ = 8.854 × 10⁻¹² F/m
- r = รัศมีสายจริง

### 4. Conductance (G) - คอนดักแตนซ์
$G \approx 0$ (มักละเลย)

- การรั่วไหลผ่านฉนวน
- มีค่าน้อยมาก

## GMD และ GMR ([[GMD-and-GMR]])

### GMD (Geometric Mean Distance)
**ระยะห่างเฉลี่ยเรขาคณิต** ระหว่างสาย 3 เฟส

$D_{eq} = \sqrt[3]{D_{12} \times D_{23} \times D_{31}}$

### GMR (Geometric Mean Radius)
**รัศมีเฉลี่ยเรขาคณิต** ของสายตัวนำ

$D_s = 0.7788 \times r$

- r = รัศมีสายจริง
- 0.7788 = e⁻¹/⁴

## การจัดเรียงสาย

### 1. Horizontal (แนวนอน)
```
A ---- B ---- C
   d      d
```
$D_{eq} = \sqrt[3]{d \times d \times 2d} = 1.26d$

### 2. Equilateral Triangle (สามเหลี่ยมด้านเท่า)
```
    A
   / \
  /   \
 B --- C
```
$D_{eq} = d$ (ทุกระยะเท่ากัน)

### 3. Vertical (แนวตั้ง)
```
A
|
B
|
C
```
$D_{eq} = \sqrt[3]{d \times d \times 2d} = 1.26d$

## Reactance (รีแอคแตนซ์)

### Inductive Reactance
$X_L = \omega L = 2\pi f L \text{ Ω/km}$

$X_L = 0.1257 f \ln\left(\frac{D_{eq}}{D_s}\right) \text{ Ω/km}$

ที่ f = 50 Hz:
$X_L = 6.28 \ln\left(\frac{D_{eq}}{D_s}\right) \text{ Ω/km}$

### Capacitive Reactance
$X_C = \frac{1}{\omega C} = \frac{1}{2\pi f C} \text{ Ω·km}$

$X_C = \frac{2.862 \times 10^6}{f \ln(D_{eq}/r)} \text{ Ω·km}$

ที่ f = 50 Hz:
$X_C = \frac{57,240}{\ln(D_{eq}/r)} \text{ Ω·km}$

## แบบจำลองสายส่ง

### 1. Short Line (< 80 km)
```
R ----jXL----
```
- ละเลย C
- ใช้ R และ XL เท่านั้น

### 2. Medium Line (80-250 km)
```
R ----jXL----
|            |
jXC/2      jXC/2
```
- Nominal π Model
- แบ่ง C ครึ่งหนึ่งแต่ละข้าง

### 3. Long Line (> 250 km)
```
Distributed Parameters
```
- ใช้ Hyperbolic Functions
- คำนวณซับซ้อน

## การคำนวณแรงดันตก (Voltage Drop)

### Short Line
$V_s = V_r + I(R + jX_L)$

$V_{drop} = I \times Z = I \times \sqrt{R^2 + X_L^2}$

### แรงดันตกประมาณ
$V_{drop} \approx I(R\cos\theta + X_L\sin\theta)$

- θ = มุม Power Factor
- cos θ = PF

### เปอร์เซ็นต์แรงดันตก
$\%V_{drop} = \frac{V_{drop}}{V_r} \times 100\%$

## Voltage Regulation

### คำนิยาม
$VR = \frac{V_{NL} - V_{FL}}{V_{FL}} \times 100\%$

- VNL = แรงดันไม่มีโหลด (No Load)
- VFL = แรงดันโหลดเต็ม (Full Load)

### สูตรประมาณ
$VR\% \approx \frac{IR\cos\theta + IX_L\sin\theta}{V_r} \times 100\%$

## ตัวอย่างการคำนวณ

### ตัวอย่าง 1: คำนวณ L และ XL
```
สาย 3 เฟส, 115 kV, 50 Hz
r = 1.5 cm = 0.015 m
D12 = D23 = D31 = 6 m

1. GMD:
D_eq = ∛(6 × 6 × 6) = 6 m

2. GMR:
D_s = 0.7788 × 0.015 = 0.0117 m

3. Inductance:
L = 2×10⁻⁷ × ln(6/0.0117)
L = 2×10⁻⁷ × 6.24
L = 1.248 × 10⁻⁶ H/m
L = 1.248 mH/km

4. Reactance:
X_L = 2π × 50 × 1.248 × 10⁻³
X_L = 0.392 Ω/km
```

### ตัวอย่าง 2: คำนวณ C และ XC
```
ใช้ข้อมูลเดิม

1. Capacitance:
C = 0.0556 / ln(6/0.015)
C = 0.0556 / 5.99
C = 0.00928 μF/km

2. Reactance:
X_C = 57,240 / ln(6/0.015)
X_C = 57,240 / 5.99
X_C = 9,557 Ω·km
```

### ตัวอย่าง 3: แรงดันตก Short Line
```
สายส่ง 115 kV, 50 km
R = 0.15 Ω/km, X_L = 0.4 Ω/km
โหลด: 50 MW, PF = 0.85 lagging

1. กระแส:
I = P / (√3 × V × PF)
I = 50,000,000 / (1.732 × 115,000 × 0.85)
I = 295 A

2. อิมพีแดนซ์รวม:
R_total = 0.15 × 50 = 7.5 Ω
X_L_total = 0.4 × 50 = 20 Ω
Z = √(7.5² + 20²) = 21.36 Ω

3. แรงดันตก:
V_drop = I × Z = 295 × 21.36 = 6,301 V

4. เปอร์เซ็นต์:
%V_drop = 6,301 / 115,000 × 100% = 5.48%

5. แรงดันฝั่งส่ง:
V_s = 115 + 6.3 = 121.3 kV
```

### ตัวอย่าง 4: Voltage Regulation
```
ใช้ข้อมูลเดิม
θ = cos⁻¹(0.85) = 31.8°
sin θ = 0.527

VR = (IR cos θ + IX_L sin θ) / V_r × 100%
VR = (295×7.5×0.85 + 295×20×0.527) / 115,000 × 100%
VR = (1,881 + 3,109) / 115,000 × 100%
VR = 4.34%
```

## ความสัมพันธ์กับแนวคิดอื่น

### ⚡ พื้นฐาน
- [[Transmission-Line-Parameters]] → ใช้ [[Resistance-R]]
- [[Transmission-Line-Parameters]] → ใช้ [[Inductor-L]]
- [[Transmission-Line-Parameters]] → ใช้ [[Capacitor-C]]
- [[Transmission-Line-Parameters]] → ใช้ [[Impedance-Z]]

### 🔌 ระบบไฟฟ้า
- ใช้กับ [[Three-Phase-System]]
- ใช้ใน [[High-Voltage-Engineering]]
- ใช้ใน [[Load-Flow-Analysis]]
- คำนวณ [[Fault-Analysis]]

### 📐 การคำนวณ
- ใช้ [[GMD-and-GMR]]
- ใช้ [[Complex-Numbers-AC]]
- ใช้ [[Per-Unit-System]]

## ข้อผิดพลาดที่พบบ่อย

### ❌ ลืมแปลงหน่วย
```
ผิด: L = 1.248 mH/km ใช้ตรงๆ
ถูก: L = 1.248 × 10⁻³ H/km
     หรือ L × ความยาว (km)
```

### ❌ สับสน GMD กับ GMR
```
ผิด: ใช้ GMD แทน GMR
ถูก: GMD = ระยะห่างระหว่างสาย
     GMR = รัศมีของสาย
```

### ❌ ลืมคูณ √3
```
ผิด: I = P / (V × PF)
ถูก: I = P / (√3 × V × PF)  (3 เฟส)
```

### ❌ ใช้แบบจำลองผิด
```
ผิด: ใช้ Short Line กับสาย 200 km
ถูก: < 80 km → Short Line
     80-250 km → Medium Line
     > 250 km → Long Line
```

## Bundled Conductors (สายมัด)

### คำนิยาม
ใช้หลายสายต่อเฟส เพื่อลด Corona Loss

### GMR ของ Bundle
**2 สาย:**
$D_{s,bundle} = \sqrt{D_s \times d}$

**3 สาย:**
$D_{s,bundle} = \sqrt[3]{D_s \times d^2}$

**4 สาย:**
$D_{s,bundle} = 1.09 \sqrt[4]{D_s \times d^3}$

- d = ระยะห่างระหว่างสายใน Bundle

## Charging Current (กระแสชาร์จ)

### คำนิยาม
กระแสที่ไหลเข้า Capacitance ของสายส่ง

$I_C = \frac{V}{\sqrt{3} \times X_C}$ (per phase)

### ตัวอย่าง
```
V = 115 kV, X_C = 9,557 Ω·km, L = 100 km

X_C_total = 9,557 / 100 = 95.57 Ω

I_C = 115,000 / (√3 × 95.57)
I_C = 694 A per phase

สาย 3 เฟส: 694 × 3 = 2,082 A
```

## Ferranti Effect

### คำนิยาม
แรงดันปลายรับสูงกว่าปลายส่ง (เมื่อไม่มีโหลด)

### สาเหตุ
- Charging Current ผ่าน XL
- เกิดกับสายยาว, โหลดเบา

### แก้ไข
- ติด Shunt Reactor
- ลด Capacitance

## Corona Loss

### คำนิยาม
การสูญเสียจากการคายประจุในอากาศ

### ปัจจัย
- แรงดันสูง (> 230 kV)
- รัศมีสายเล็ก
- อากาศชื้น

### แก้ไข
- ใช้ Bundled Conductors
- เพิ่มรัศมีสาย

## Tags
#transmission-line #parameters #voltage-drop #power-system #advanced
