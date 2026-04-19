# Field Winding - ขดลวดสนาม

## คำนิยาม
**ขดลวดสนาม (Field Winding)** คือขดลวดที่พันรอบขั้วแม่เหล็กของ [[DC-Motor]] หรือ DC Generator เพื่อสร้างสนามแม่เหล็กหลัก

## ตำแหน่ง
- ติดตั้งบน Stator (ส่วนนิ่ง)
- พันรอบ Pole (ขั้วแม่เหล็ก)
- ต่อกับแหล่งจ่ายไฟ DC

## ประเภทตามการต่อ

### 1. Series Field (สนามอนุกรม)
```
ต่ออนุกรมกับ Armature
I_field = I_armature
```

#### คุณสมบัติ
- ลวดหนา รอบน้อย
- กระแสสูง
- ใช้ใน Series Motor

### 2. Shunt Field (สนามขนาน)
```
ต่อขนานกับ Armature
V_field = V_armature
```

#### คุณสมบัติ
- ลวดบาง รอบมาก
- กระแสต่ำ
- ใช้ใน Shunt Motor

### 3. Compound Field
- มีทั้ง Series และ Shunt
- **Cumulative**: Series ช่วยเสริม Shunt
- **Differential**: Series ต้าน Shunt

## การควบคุมสนามแม่เหล็ก

### Field Rheostat
- ตัวต้านทานปรับค่าได้
- ควบคุมกระแสสนาม
- ปรับความเร็วมอเตอร์

### ความสัมพันธ์
$$\Phi \propto I_f$$
$$N \propto \frac{1}{\Phi}$$

- เพิ่ม If → เพิ่ม Φ → ลด N
- ลด If → ลด Φ → เพิ่ม N

## Field Weakening

### คำนิยาม
การลดสนามแม่เหล็กเพื่อเพิ่มความเร็ว

### การใช้งาน
- เพิ่มความเร็วเหนือพิกัด
- ใช้ใน Traction (รถไฟฟ้า)

### ข้อระวัง
- อย่าลด Φ มากเกินไป
- อาจทำให้มอเตอร์หมุนเร็วเกินไป
- Series Motor อันตราย!

## การทดสอบ

### 1. Resistance Test
- วัดความต้านทาน Rf
- ตรวจสอบขดลวดขาด/ลัด

### 2. Insulation Test
- ใช้ Megger วัด
- ตรวจสอบฉนวน

### 3. Polarity Test
- ตรวจสอบขั้ว N-S
- ใช้เข็มทิศ

## ปัญหาที่พบบ่อย

### 1. Open Circuit
- ขดลวดขาด
- มอเตอร์หมุนเร็วมาก (Series)
- มอเตอร์ไม่หมุน (Shunt)

### 2. Short Circuit
- ขดลวดลัดวงจร
- สนามแม่เหล็กลดลง
- ความเร็วเพิ่มขึ้น

### 3. Ground Fault
- ขดลวดชนโครง
- อันตราย!

## Tags
#DC #field #winding #motor #excitation

