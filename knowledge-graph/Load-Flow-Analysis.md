# Load Flow Analysis - การวิเคราะห์การไหลของกำลังไฟฟ้า

## คำนิยาม
**Load Flow Analysis** หรือ **Power Flow Analysis** คือการคำนวณหาแรงดัน กำลังไฟฟ้า และกระแสในระบบไฟฟ้ากำลังขนาดใหญ่

## วัตถุประสงค์
- หาแรงดันที่ Bus ทุกตัว
- หากำลังไฟฟ้าที่ไหลในสายส่ง
- หาการสูญเสียในระบบ
- วางแผนการขยายระบบ

## Bus Types (ประเภทของ Bus)

### 1. Slack Bus (Swing Bus)
- **กำหนด**: V, θ (แรงดันและมุม)
- **หา**: P, Q (กำลังจริงและกำลังรีแอคทีฟ)
- **จำนวน**: 1 Bus (เครื่องกำเนิดหลัก)
- **หน้าที่**: รับภาระที่เหลือทั้งหมด

### 2. PV Bus (Generator Bus)
- **กำหนด**: P, V (กำลังจริงและแรงดัน)
- **หา**: Q, θ (กำลังรีแอคทีฟและมุม)
- **จำนวน**: หลาย Bus (เครื่องกำเนิดอื่นๆ)
- **หน้าที่**: ควบคุมแรงดันและกำลัง

### 3. PQ Bus (Load Bus)
- **กำหนด**: P, Q (กำลังจริงและกำลังรีแอคทีฟ)
- **หา**: V, θ (แรงดันและมุม)
- **จำนวน**: หลาย Bus (โหลด)
- **หน้าที่**: รับกำลังไฟฟ้า

## สมการพื้นฐาน

### กำลังที่ Bus
$P_i = \sum_{k=1}^{n} |V_i||V_k||Y_{ik}|\cos(\theta_{ik} - \delta_i + \delta_k)$

$Q_i = -\sum_{k=1}^{n} |V_i||V_k||Y_{ik}|\sin(\theta_{ik} - \delta_i + \delta_k)$

### ในรูป Complex
$S_i = P_i + jQ_i = V_i \sum_{k=1}^{n} Y_{ik}^* V_k^*$

## วิธีการแก้

### 1. Gauss-Seidel Method
- วิธีแบบวนซ้ำ (Iterative)
- ง่าย แต่ช้า
- เหมาะกับระบบเล็ก

### 2. Newton-Raphson Method
- วิธีแบบวนซ้ำ
- เร็ว แม่นยำ
- ใช้กันมากที่สุด

### 3. Fast Decoupled Method
- ประมาณจาก Newton-Raphson
- เร็วมาก
- เหมาะกับระบบใหญ่

## ขั้นตอนการวิเคราะห์

### 1. เตรียมข้อมูล
```
- ข้อมูล Bus: V, P, Q
- ข้อมูลสายส่าง: R, X, B
- ข้อมูล [[Transformer]]: Z, Tap ratio
```

### 2. สร้าง Y-Bus Matrix
```
Y_bus = [Y₁₁  Y₁₂  Y₁₃]
        [Y₂₁  Y₂₂  Y₂₃]
        [Y₃₁  Y₃₂  Y₃₃]

Y_ii = ผลรวม Admittance ที่ต่อกับ Bus i
Y_ij = -Admittance ระหว่าง Bus i และ j
```

### 3. กำหนดค่าเริ่มต้น
```
Slack Bus: V = 1.0∠0° (กำหนด)
PV Bus: V = 1.0 (กำหนด), θ = 0° (เดา)
PQ Bus: V = 1.0∠0° (เดา)
```

### 4. วนซ้ำจนลู่เข้า
```
คำนวณ P, Q ใหม่
เปรียบเทียบกับค่าที่กำหนด
ปรับ V, θ
วนซ้ำจนผิดพลาด < ε (เช่น 0.001)
```

### 5. คำนวณผลลัพธ์
```
- กำลังที่ Slack Bus
- กระแสในสายส่ง
- การสูญเสีย
```

## ตัวอย่างการใช้งาน

### ตัวอย่าง 1: ระบบ 3 Bus
```
Bus 1 (Slack): V = 1.05∠0° pu
Bus 2 (PV): P = 0.5 pu, V = 1.0 pu
Bus 3 (PQ): P = -0.8 pu, Q = -0.6 pu

สายส่าง:
1-2: Z = 0.02 + j0.06 pu
1-3: Z = 0.08 + j0.24 pu
2-3: Z = 0.06 + j0.18 pu

หา: V₂, V₃, θ₂, θ₃, P₁, Q₁, Q₂

ใช้ Newton-Raphson:
V₂ = 1.0∠-2.06° pu
V₃ = 0.956∠-3.69° pu
P₁ = 1.32 pu
Q₁ = 0.78 pu
Q₂ = 0.18 pu
```

## Per Unit System ([[Per-Unit-System]])

### ทำไมใช้ pu?
- ทำให้ตัวเลขอยู่ใกล้ 1
- ง่ายต่อการเปรียบเทียบ
- ไม่ต้องแปลงผ่าน [[Transformer]]

### Base Values
```
S_base = 100 MVA
V_base = 22 kV (แต่ละระดับแรงดัน)
Z_base = V_base² / S_base
I_base = S_base / (√3 × V_base)
```

## ความสัมพันธ์กับแนวคิดอื่น

### ⚡ พื้นฐาน
- [[Load-Flow-Analysis]] → ใช้ [[Kirchhoffs-Laws]]
- [[Load-Flow-Analysis]] → ใช้ [[Complex-Numbers-AC]]
- [[Load-Flow-Analysis]] → ใช้ [[Per-Unit-System]]

### 🔌 ระบบไฟฟ้า
- ใช้กับ [[Three-Phase-System]]
- คำนวณ [[Transmission-Line-Parameters]]
- วิเคราะห์ [[Transformer]]

## การประยุกต์ใช้

### 1. การวางแผนระบบ
- ขยายสายส่ง
- เพิ่มเครื่องกำเนิด
- ติดตั้ง [[Capacitor-Bank]]

### 2. การดำเนินการ
- ตรวจสอบแรงดัน
- ตรวจสอบโหลดสายส่ง
- ควบคุม [[Power-Factor-PF]]

### 3. การศึกษา
- วิเคราะห์ Contingency (N-1)
- วิเคราะห์ Stability
- วิเคราะห์ [[Fault-Analysis]]

## ข้อจำกัดและเงื่อนไข

### Voltage Limits
```
0.95 ≤ V ≤ 1.05 pu

ถ้าเกิน → ปรับ Tap Changer
ถ้าต่ำ → เพิ่ม Capacitor Bank
```

### Line Limits
```
S_line ≤ S_max

ถ้าเกิน → โอเวอร์โหลด
แก้: เพิ่มสายส่าง, เปลี่ยนเส้นทาง
```

### Generator Limits
```
P_min ≤ P ≤ P_max
Q_min ≤ Q ≤ Q_max

ถ้าเกิน → ปรับ PV Bus → PQ Bus
```

## ข้อผิดพลาดที่พบบ่อย

### ❌ ลืมแปลง pu
```
ผิด: ใช้ค่า MW, kV ตรงๆ
ถูก: แปลงเป็น pu ก่อน
     P_pu = P_MW / S_base
```

### ❌ Slack Bus ผิด
```
ผิด: ไม่มี Slack Bus
ถูก: ต้องมี 1 Slack Bus เสมอ
     (รับภาระที่เหลือ)
```

### ❌ Y-Bus ผิด
```
ผิด: Y_ij = Admittance (บวก)
ถูก: Y_ij = -Admittance (ลบ)
     Y_ii = ผลรวม (บวก)
```

### ❌ ไม่ลู่เข้า
```
สาเหตุ:
- ค่าเริ่มต้นไม่ดี
- ระบบไม่มีคำตอบ
- Voltage Collapse

แก้: ปรับค่าเริ่มต้น, เพิ่ม Reactive Support
```

## Software ที่ใช้
- **PSS/E**: มาตรฐานอุตสาหกรรม
- **PowerWorld**: ง่าย มี GUI
- **ETAP**: ครบเครื่อง
- **MATLAB**: ยืดหยุ่น
- **DIgSILENT**: ยุโรป

## ผลลัพธ์ที่ได้

### 1. Voltage Profile
```
แสดงแรงดันที่ Bus ทุกตัว
ตรวจสอบว่าอยู่ในขอบเขต
```

### 2. Power Flow
```
แสดงกำลังที่ไหลในสายส่ง
ตรวจสอบโอเวอร์โหลด
```

### 3. Losses
```
การสูญเสียรวม = P_gen - P_load
มักเป็น 2-5% ของกำลังรวม
```

### 4. Reactive Power
```
Q ที่เครื่องกำเนิด
Q ที่ Capacitor Bank
Q ที่สูญเสีย
```

## Tips & Tricks

### 1. ค่าเริ่มต้นดีๆ
- ใช้ Flat Start (V = 1.0, θ = 0)
- หรือใช้ผลลัพธ์ครั้งก่อน

### 2. ตรวจสอบข้อมูล
- ตรวจ Base Values
- ตรวจ Bus Types
- ตรวจ Line Data

### 3. วิเคราะห์ผล
- ดู Voltage Profile
- ดู Line Loading
- ดู Losses

## Tags
#power-system #load-flow #power-flow #analysis #bus
