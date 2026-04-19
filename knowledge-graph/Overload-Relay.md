# Overload Relay - โอเวอร์โหลดรีเลย์

## คำนิยาม
**โอเวอร์โหลดรีเลย์ (Overload Relay)** คืออุปกรณ์ป้องกัน [[Motor]] จากกระแสเกิน (Overload) โดยตัดวงจรเมื่อกระแสสูงเกินค่าที่ตั้งไว้

## ประเภท

### 1. Thermal Overload
- ใช้ Bimetal
- ตัดตามความร้อน
- ช้า (วินาที-นาที)

### 2. Electronic Overload
- ใช้ CT + วงจรอิเล็กทรอนิกส์
- แม่นยำกว่า
- ปรับค่าได้ง่าย

## การตั้งค่า
```
มอเตอร์ 10A
ตั้ง Overload = 10-12A (110-120%)
```

## ความแตกต่างจาก Circuit Breaker

| | Overload Relay | Circuit Breaker |
|---|---|---|
| ป้องกัน | Overload | Overload + Short Circuit |
| ความเร็ว | ช้า | เร็ว |
| ใช้กับ | Motor | ทั่วไป |

## Tags
#protection #overload #motor

