# Power Factor Correction - การแก้ไขตัวประกอบกำลัง

## คำนิยาม
**การแก้ไขตัวประกอบกำลัง (Power Factor Correction)** คือการปรับปรุง [[Power-Factor-PF]] ให้สูงขึ้นโดยใช้ [[Capacitor-Bank]]

## วัตถุประสงค์
1. เพิ่ม PF ให้ ≥ 0.85 (หลีกเลี่ยงค่าปรับ)
2. ลดกระแสสาย
3. ลดการสูญเสีย
4. ลดค่าไฟ

## หลักการ
```
[[Motor]] → +jQ (ล้าหลัง)
[[Capacitor-Bank]] → -jQ (นำหน้า)
+jQ + (-jQ) = หักล้างกัน
→ PF เพิ่มขึ้น
```

## สูตรหาขนาด Capacitor
$$Q_C = P(\tan\theta_1 - \tan\theta_2)$$

## ตัวอย่าง
```
P = 100 kW
PF เดิม = 0.7 → ต้องการ PF = 0.95

Q_C = 100(tan 45.57° - tan 18.19°)
Q_C = 100(1.020 - 0.329) = 69.1 kVAR

ติดตั้ง Capacitor Bank 70 kVAR
```

## ประโยชน์
- ลดค่าปรับ PF
- ลดกระแส → ลดสูญเสีย
- เพิ่มกำลังไฟฟ้าที่ใช้ได้

## ข้อระวัง
- ไม่ควรแก้เกิน PF = 0.98
- ระวัง Harmonic (ใช้ Detuned)
- ต้องมี Protection

## Tags
#power-factor #correction #capacitor-bank

