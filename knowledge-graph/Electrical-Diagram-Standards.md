# Electrical Diagram Standards - มาตรฐานการเขียนแบบไฟฟ้า

## ประเภทของแบบไฟฟ้า

```
┌─────────────────────────────────────────────────┐
│         ประเภทแบบไฟฟ้า                          │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. Single Line Diagram (SLD)                   │
│  2. Schematic Diagram                           │
│  3. Wiring Diagram                              │
│  4. Block Diagram                               │
│  5. Layout/Installation Diagram                 │
│  6. As-Built Drawing                            │
│                                                 │
└─────────────────────────────────────────────────┘
```

## 1. Single Line Diagram (SLD)

### คำนิยาม
**แบบเส้นเดียว** แสดงระบบไฟฟ้าทั้งหมดด้วยเส้นเดียว ไม่สนใจจำนวนเฟส

### ตัวอย่าง SLD
```
22 kV
  │
  ├─ CT 200/5A
  │
  ├─ VT 22000/110V
  │
  ├─ CB 630A
  │
  ├─ Transformer 1000 kVA
  │   22kV/380V, Dyn11
  │
380V ├─ Main MCCB 1600A
  │
  ├─── Feeder 1 ─── MCCB 400A ─── Motor 200 kW
  │
  ├─── Feeder 2 ─── MCCB 250A ─── Lighting Panel
  │
  └─── Feeder 3 ─── MCCB 160A ─── Socket Panel
```

### สัญลักษณ์ที่ใช้บ่อย

#### แหล่งจ่าย
```
Generator:    ⊕ หรือ ⊗
Utility:      ═╪═
Battery:      ─┤├─
```

#### หม้อแปลง
```
2 Winding:    ○─||─○
3 Winding:    ○─||─○
              │
Auto:         ○─┤├─○
```

#### เบรกเกอร์
```
Circuit Breaker:  ─┤├─ หรือ ═╪═
Disconnect:       ─/─
Fuse:            ─┤├─
```

#### มอเตอร์
```
Motor:           ⊕M
                 
Induction:       ⊕IM

Synchronous:     ⊕SM
```

#### อุปกรณ์วัด
```
CT:  ─⊂⊃─
VT:  ─||─
A:   ─(A)─
V:   ─(V)─
W:   ─(W)─
```

### ข้อมูลที่ต้องมีใน SLD

#### 1. แรงดันระบบ
```
22 kV, 380V, 220V
```

#### 2. ขนาดอุปกรณ์
```
Transformer: 1000 kVA
CB: 630A, 25 kA
Cable: 240 mm², 4C
```

#### 3. การป้องกัน
```
Relay: 50/51, 87T
CT Ratio: 200/5A
VT Ratio: 22000/110V
```

#### 4. Vector Group (หม้อแปลง)
```
Dyn11: Delta-Star, -30°
Yyn0: Star-Star, 0°
Dyn1: Delta-Star, -30°
```

## 2. Schematic Diagram

### คำนิยาม
**แบบวงจร** แสดงการทำงานของวงจรอย่างละเอียด แสดงทุกเฟส

### ตัวอย่าง Schematic (3 เฟส)
```
R ─┤├─────⊂⊃─────┤├─────⊕M
S ─┤├─────⊂⊃─────┤├─────⊕
T ─┤├─────⊂⊃─────┤├─────⊕
   MCB    CT     Contactor Motor
```

### ตัวอย่าง Control Circuit
```
+24V ─┤├─────( )─────(K1)
      PB      OL      Relay
       │
       └─────(K1)────┤
            Contact
```

## 3. Wiring Diagram

### คำนิยาม
**แบบต่อสาย** แสดงการต่อสายจริง มีหมายเลขสาย

### ตัวอย่าง
```
Terminal Block TB1
┌─────────────────┐
│ 1  R  ─────────┼──→ Motor U
│ 2  S  ─────────┼──→ Motor V
│ 3  T  ─────────┼──→ Motor W
│ 4  N  ─────────┼──→ Motor N
│ 5  PE ─────────┼──→ Motor PE
└─────────────────┘

Cable: 4C × 10 mm² + 10 mm² (PE)
```

## 4. Block Diagram

### คำนิยาม
**แบบบล็อก** แสดงการทำงานเป็นบล็อก

### ตัวอย่าง
```
┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐
│ Grid │──→│ Xfmr │──→│ Panel│──→│ Load │
└──────┘   └──────┘   └──────┘   └──────┘
 22 kV      1000kVA     380V       500kW
```

## 5. Layout/Installation Diagram

### คำนิยาม
**แบบติดตั้ง** แสดงตำแหน่งติดตั้งจริง

### ตัวอย่าง
```
        ┌─────────────────┐
        │   Transformer   │
        │    Room         │
        │   ┌───────┐     │
        │   │ 1000  │     │
        │   │  kVA  │     │
        │   └───────┘     │
        └────────┬────────┘
                 │
        ┌────────┴────────┐
        │   MV Panel      │
        │  ┌──┬──┬──┐     │
        │  │CB│CB│CB│     │
        │  └──┴──┴──┘     │
        └─────────────────┘
```

## มาตรฐานการเขียนแบบ

### IEC (International Electrotechnical Commission)
- ใช้ในยุโรป, เอเชีย, ไทย
- สัญลักษณ์: IEC 60617
- สี: IEC 60446

### ANSI (American National Standards Institute)
- ใช้ในอเมริกา
- สัญลักษณ์: IEEE Std 315
- แตกต่างจาก IEC

### มาตรฐานสีสาย

#### IEC (ไทยใช้)
```
3 เฟส:
- R (Red):    สีน้ำตาล (Brown)
- S (Yellow): สีดำ (Black)
- T (Blue):   สีเทา (Grey)
- N:          สีฟ้า (Blue)
- PE:         สีเขียว-เหลือง (Green-Yellow)

1 เฟส:
- L (Live):   สีน้ำตาล (Brown)
- N:          สีฟ้า (Blue)
- PE:         สีเขียว-เหลือง
```

#### ANSI (อเมริกา)
```
3 เฟส:
- A: สีดำ (Black)
- B: สีแดง (Red)
- C: สีฟ้า (Blue)
- N: สีขาว (White)
- PE: สีเขียว (Green)
```

## การต่อวงจร

### 1. Series Connection ([[Series-Connection]])
```
─┤R1├─┤R2├─┤R3├─

R_total = R1 + R2 + R3
I_total = I1 = I2 = I3
V_total = V1 + V2 + V3

ใช้เมื่อ:
- ต้องการแบ่งแรงดัน
- หลอดไฟตกแต่ง
- ตัวต้านทานแบ่งแรงดัน
```

### 2. Parallel Connection ([[Parallel-Connection]])
```
    ┌─┤R1├─┐
─┬──┼─┤R2├─┼──┬─
 │  └─┤R3├─┘  │

1/R_total = 1/R1 + 1/R2 + 1/R3
I_total = I1 + I2 + I3
V_total = V1 = V2 = V3

ใช้เมื่อ:
- ต้องการเพิ่มกำลัง
- ปลั๊กในบ้าน
- แบตเตอรี่เพิ่มกระแส
```

### 3. Series-Parallel (ผสม)
```
    ┌─┤R1├─┤R2├─┐
─┬──┤           ├──┬─
 │  └─┤R3├─┤R4├─┘  │

คำนวณทีละส่วน:
1. R12 = R1 + R2 (อนุกรม)
2. R34 = R3 + R4 (อนุกรม)
3. R_total = R12 // R34 (ขนาน)
```

## การเลือกวิธีต่อ

### ใช้ Series เมื่อ:
- ต้องการแบ่งแรงดัน
- ต้องการกระแสเท่ากัน
- ประหยัดสาย

### ใช้ Parallel เมื่อ:
- ต้องการแรงดันเท่ากัน
- ต้องการเพิ่มกำลัง
- ต้องการ Redundancy (สำรอง)

### ตัวอย่างการใช้งาน

#### หลอดไฟในบ้าน: Parallel
```
220V ─┬─ หลอด 1 (100W)
      ├─ หลอด 2 (60W)
      └─ หลอด 3 (40W)

เปิด-ปิดอิสระ
แรงดันเท่ากัน 220V
```

#### แบตเตอรี่รถยนต์: Series
```
12V ─┤├─┤├─ 24V
     Bat1 Bat2

เพิ่มแรงดัน
กระแสเท่ากัน
```

#### Solar Panel: Series-Parallel
```
    ┌─ Panel 1 ─ Panel 2 ─┐
─┬──┤                      ├──┬─
 │  └─ Panel 3 ─ Panel 4 ─┘  │

เพิ่มทั้งแรงดันและกระแส
```

## ข้อมูลที่ต้องมีในแบบ

### 1. Title Block
```
┌─────────────────────────────────┐
│ Project: ABC Factory            │
│ Drawing: Single Line Diagram    │
│ Drawing No: E-001               │
│ Scale: NTS                      │
│ Date: 2024-01-01                │
│ Drawn by: [Name]                │
│ Checked by: [Name]              │
│ Approved by: [Name]             │
└─────────────────────────────────┘
```

### 2. Legend (สัญลักษณ์)
```
─┤├─  Circuit Breaker
⊕M   Motor
─||─  Transformer
⊂⊃   Current Transformer
```

### 3. Notes
```
NOTES:
1. All dimensions in mm
2. Cable size in mm²
3. Voltage in V
4. Power in kW
```

## ความสัมพันธ์กับแนวคิดอื่น

### ⚡ พื้นฐาน
- [[Electrical-Diagram-Standards]] → แสดง [[Circuit-Breaker]]
- [[Electrical-Diagram-Standards]] → แสดง [[Transformer]]
- [[Electrical-Diagram-Standards]] → แสดง [[Motor]]

### 🔌 การต่อ
- [[Series-Connection]]
- [[Parallel-Connection]]
- [[Star-Connection]]
- [[Delta-Connection]]

### 📐 การออกแบบ
- ใช้ใน [[Wire-Sizing]]
- ใช้ใน [[Load-Flow-Analysis]]
- ใช้กับ [[MCB-MCCB-RCCB-RCBO]]

## ข้อผิดพลาดที่พบบ่อย

### ❌ ไม่ระบุขนาดอุปกรณ์
```
ผิด: แสดงแค่สัญลักษณ์
ถูก: ระบุ CB 630A, Cable 240 mm²
```

### ❌ ไม่ระบุแรงดัน
```
ผิด: ไม่บอกว่า 380V หรือ 220V
ถูก: ระบุแรงดันทุกจุด
```

### ❌ สัญลักษณ์ไม่ตรงมาตรฐาน
```
ผิด: ใช้สัญลักษณ์แปลกๆ
ถูก: ใช้ตาม IEC 60617
```

### ❌ ต่อ Series-Parallel ผิด
```
ผิด: คำนวณรวมกันเลย
ถูก: คำนวณทีละส่วน
     Series ก่อน → Parallel ทีหลัง
```

## Software ที่ใช้

### AutoCAD Electrical
- มาตรฐานอุตสาหกรรม
- สัญลักษณ์ครบ
- Auto Numbering

### EPLAN
- ยุโรปนิยม
- Database ครบ
- Auto Generate

### Visio
- ง่าย, ราคาถูก
- เหมาะกับ SLD

### SketchUp
- 3D Layout
- ง่าย

## Tips การเขียนแบบ

### 1. SLD ต้องชัดเจน
- แสดงการไหลของกำลังไฟฟ้า
- ระบุขนาดทุกอย่าง
- ใช้สัญลักษณ์มาตรฐาน

### 2. Schematic ต้องละเอียด
- แสดงทุกเฟส
- แสดง Control Circuit
- ระบุหมายเลขสาย

### 3. Layout ต้องถูกต้อง
- ระยะห่างตามมาตรฐาน
- ทางเดินสาย
- พื้นที่บำรุงรักษา

## Tags
#diagram #standards #SLD #schematic #wiring #IEC #ANSI
