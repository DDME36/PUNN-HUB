# Circuit Breaker - เซอร์กิตเบรกเกอร์

## คำนิยาม
**เซอร์กิตเบรกเกอร์ (Circuit Breaker)** คืออุปกรณ์ป้องกันวงจรไฟฟ้าจากกระแสเกิน และลัดวงจร สามารถตัดและต่อวงจรได้

## ประเภท

### ตามแรงดัน
- **LV (Low Voltage)**: < 1 kV
- **MV (Medium Voltage)**: 1-36 kV
- **HV (High Voltage)**: > 36 kV

### ตามการทำงาน
- **MCB (Miniature CB)**: บ้านเรือน
- **MCCB (Molded Case CB)**: โรงงานเล็ก
- **ACB (Air CB)**: โรงงานใหญ่
- **VCB (Vacuum CB)**: แรงดันสูง

## พารามิเตอร์

### 1. Rated Current (In)
- กระแสทำงานปกติ
- เช่น 100A, 200A, 400A

### 2. Breaking Capacity (Icu)
- กระแสลัดวงจรสูงสุดที่ตัดได้
- เช่น 10 kA, 25 kA, 50 kA

### 3. Trip Curve
- **B**: 3-5 × In (บ้าน)
- **C**: 5-10 × In (ทั่วไป)
- **D**: 10-20 × In (มอเตอร์)

## การทำงาน

### Thermal Trip (ความร้อน)
- ป้องกันโอเวอร์โหลด
- ตัดช้า (วินาที-นาที)

### Magnetic Trip (แม่เหล็ก)
- ป้องกันลัดวงจร
- ตัดเร็ว (มิลลิวินาที)

## การเลือกใช้
```
โหลด 100A
เลือก CB ≥ 100A (เช่น 125A)
Breaking Capacity ≥ กระแสลัดวงจร
```

## ความสัมพันธ์กับแนวคิดอื่น
- ใช้ร่วมกับ [[RCD]] (ป้องกันไฟรั่ว)
- ใช้ร่วมกับ [[Distance-Relay]] (สายส่ง)
- ป้องกัน [[Short-Circuit-Current]]
- ใช้ใน [[High-Voltage-Engineering]]
- เลือกขนาดจาก [[Fault-Analysis]]

## Tags
#protection #circuit-breaker #safety

