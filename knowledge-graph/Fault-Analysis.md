# Fault Analysis - การวิเคราะห์ฟอลต์

## คำนิยาม
**Fault Analysis** คือการวิเคราะห์กระแสและแรงดันเมื่อเกิดความผิดปกติ (Fault) ในระบบไฟฟ้า เช่น ลัดวงจร (Short Circuit)

## ประเภทของ Fault

### 1. Symmetrical Fault (สมดุล)
- **3-Phase Fault (3LG)**: ลัดวงจร 3 เฟสพร้อมกัน
- เกิดน้อยที่สุด (5%)
- แต่กระแสสูงที่สุด!

### 2. Unsymmetrical Fault (ไม่สมดุล)
- **Single Line-to-Ground (SLG)**: 1 เฟสลงดิน (70%)
- **Line-to-Line (LL)**: 2 เฟสลัดกัน (15%)
- **Double Line-to-Ground (2LG)**: 2 เฟสลงดิน (10%)

## Sequence Networks (วงจรลำดับ)

### 1. Positive Sequence (ลำดับบวก)
- ทิศทาง: A → B → C (ปกติ)
- มีในทุกสภาวะ
- Z₁ = อิมพีแดนซ์ลำดับบวก

### 2. Negative Sequence (ลำดับลบ)
- ทิศทาง: A → C → B (กลับกัน)
- เกิดเมื่อไม่สมดุล
- Z₂ = อิมพีแดนซ์ลำดับลบ

### 3. Zero Sequence (ลำดับศูนย์)
- ทิศทาง: เฟสเดียวกันหมด
- เกิดเมื่อมีกระแสลงดิน
- Z₀ = อิมพีแดนซ์ลำดับศูนย์

## การต่อวงจรลำดับ

### 3-Phase Fault (3LG)
```
ใช้เฉพาะ Positive Sequence
I_f = V / Z₁
```

### Single Line-to-Ground (SLG)
```
ต่ออนุกรม: Z₁ - Z₂ - Z₀
I_f = 3V / (Z₁ + Z₂ + Z₀)
```

### Line-to-Line (LL)
```
ต่อขนาน: Z₁ // Z₂
I_f = √3 V / (Z₁ + Z₂)
```

### Double Line-to-Ground (2LG)
```
ซับซ้อน: Z₁ อนุกรมกับ (Z₂ // Z₀)
```

## สูตรการคำนวณ

### 3-Phase Fault
$I_f = \frac{V}{Z_1}$

### SLG Fault
$I_f = \frac{3V}{Z_1 + Z_2 + Z_0}$

### LL Fault
$I_f = \frac{\sqrt{3}V}{Z_1 + Z_2}$

## ตัวอย่างการคำนวณ

### ตัวอย่าง 1: 3-Phase Fault
```
V = 1.0 pu
Z₁ = 0.1 + j0.3 pu

I_f = V / Z₁
I_f = 1.0 / (0.1 + j0.3)
I_f = 1.0 / 0.316∠71.6°
I_f = 3.16∠-71.6° pu

ถ้า I_base = 1000A
I_f = 3.16 × 1000 = 3,160A
```

### ตัวอย่าง 2: SLG Fault
```
V = 1.0 pu
Z₁ = 0.1 + j0.3 pu
Z₂ = 0.1 + j0.3 pu
Z₀ = 0.2 + j0.6 pu

I_f = 3V / (Z₁ + Z₂ + Z₀)
I_f = 3 × 1.0 / (0.4 + j1.2)
I_f = 3 / 1.265∠71.6°
I_f = 2.37∠-71.6° pu

I_f = 2.37 × 1000 = 2,370A
```

## อิมพีแดนซ์ลำดับ

### เครื่องกำเนิด (Generator)
```
Z₁ = Z₂ = X_d'' (Subtransient Reactance)
Z₀ = X₀ (Zero Sequence Reactance)

มักเป็น: Z₀ < Z₁ ≈ Z₂
```

### หม้อแปลง ([[Transformer]])
```
Z₁ = Z₂ = Z_T (Leakage Impedance)
Z₀ = ขึ้นกับการต่อ

Y-Y: Z₀ = Z_T (ถ้ามี Neutral Ground)
Δ-Y: Z₀ = ∞ (ฝั่ง Δ)
```

### สายส่ง ([[Transmission-Line-Parameters]])
```
Z₁ = Z₂ = R + jX_L
Z₀ = R + jX_L + 3Z_ground

มักเป็น: Z₀ > Z₁ = Z₂
```

## ความสัมพันธ์กับแนวคิดอื่น

### ⚡ พื้นฐาน
- [[Fault-Analysis]] → คำนวณ [[Short-Circuit-Current]]
- [[Fault-Analysis]] → ใช้ [[Per-Unit-System]]
- [[Fault-Analysis]] → ใช้ [[Complex-Numbers-AC]]

### 🔌 ระบบไฟฟ้า
- ใช้กับ [[Three-Phase-System]]
- ใช้ร่วมกับ [[Load-Flow-Analysis]]
- ออกแบบ [[Circuit-Breaker]]
- ตั้งค่า [[Distance-Relay]]

## การประยุกต์ใช้

### 1. เลือกอุปกรณ์ป้องกัน
```
I_f = 25 kA
เลือก [[Circuit-Breaker]] ≥ 25 kA
```

### 2. ตั้งค่ารีเลย์
```
คำนวณ I_f ที่จุดต่างๆ
ตั้งค่า [[Overload-Relay]]
ตั้งค่า [[Distance-Relay]]
```

### 3. ออกแบบระบบลงดิน
```
คำนวณกระแสลงดิน (I₀)
ออกแบบ Ground Grid
```

## MVA Method (วิธี MVA)

### หลักการ
```
MVA_f = MVA_base / Z_pu

I_f = MVA_f / (√3 × V_kV)
```

### ตัวอย่าง
```
MVA_base = 100 MVA
Z_pu = 0.2 pu
V = 22 kV

MVA_f = 100 / 0.2 = 500 MVA
I_f = 500,000 / (√3 × 22) = 13,123A
```

## ข้อผิดพลาดที่พบบ่อย

### ❌ ลืมแปลง pu
```
ผิด: ใช้ Z (Ω) ตรงๆ
ถูก: แปลงเป็น Z_pu ก่อน
     Z_pu = Z / Z_base
```

### ❌ สับสนวงจรลำดับ
```
ผิด: SLG ใช้แค่ Z₁
ถูก: SLG ต่ออนุกรม Z₁ + Z₂ + Z₀
```

### ❌ ลืมคูณ 3 (SLG)
```
ผิด: I_f = V / (Z₁ + Z₂ + Z₀)
ถูก: I_f = 3V / (Z₁ + Z₂ + Z₀)
```

### ❌ ใช้ Z₀ ผิด
```
ผิด: Z₀ = Z₁ (เสมอ)
ถูก: Z₀ ขึ้นกับอุปกรณ์และการต่อ
     Generator: Z₀ < Z₁
     Line: Z₀ > Z₁
```

## Fault Level (ระดับฟอลต์)

### คำนิยาม
```
Fault Level = MVA_f = √3 × V × I_f

ยิ่งสูง → อันตรายมาก
```

### การลด Fault Level
- เพิ่ม [[Impedance-Z]] (Reactor)
- แยกระบบ (Sectionalizing)
- ใช้ Fault Current Limiter

## Transient vs Steady-State

### Subtransient (0-0.1 s)
```
I'' = V / X_d''
กระแสสูงสุด!
ใช้เลือก Circuit Breaker
```

### Transient (0.1-1 s)
```
I' = V / X_d'
กระแสลดลง
```

### Steady-State (> 1 s)
```
I = V / X_d
กระแสต่ำสุด
ใช้ตั้งค่ารีเลย์
```

## Software ที่ใช้
- **ETAP**: ครบเครื่อง
- **SKM PowerTools**: เฉพาะทาง
- **MATLAB**: ยืดหยุ่น
- **DIgSILENT**: ยุโรป

## ตัวอย่างโจทย์ยาก

### โจทย์: ระบบ 3 Bus
```
Bus 1: Generator (V = 1.0 pu)
Bus 2: Transformer
Bus 3: Load (Fault ที่นี่)

Z_gen: Z₁ = Z₂ = j0.2, Z₀ = j0.05
Z_T: Z₁ = Z₂ = Z₀ = j0.1
Z_line: Z₁ = Z₂ = j0.3, Z₀ = j0.9

หา: I_f สำหรับ SLG Fault ที่ Bus 3

วิธีทำ:
Z₁_total = j0.2 + j0.1 + j0.3 = j0.6
Z₂_total = j0.2 + j0.1 + j0.3 = j0.6
Z₀_total = j0.05 + j0.1 + j0.9 = j1.05

I_f = 3 × 1.0 / (j0.6 + j0.6 + j1.05)
I_f = 3 / j2.25
I_f = -j1.33 pu

ถ้า I_base = 1000A
I_f = 1.33 × 1000 = 1,330A
```

## Tags
#power-system #fault-analysis #short-circuit #sequence #protection
