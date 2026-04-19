# Capacitor (C) - ตัวเก็บประจุ

## คำนิยาม
**ตัวเก็บประจุ (Capacitor)** คืออุปกรณ์ที่เก็บพลังงานในรูปของสนามไฟฟ้า ต้านการเปลี่ยนแปลงของแรงดัน

## สัญลักษณ์วงจร
```
---| |---  (ตัวเก็บประจุทั่วไป)
---|(---  (ตัวเก็บประจุโพลาไรซ์)
```

## สัญลักษณ์
- **C** = Capacitance (ความจุไฟฟ้า)
- หน่วย: **Farad (F)**, **microfarad (μF)**, **nanofarad (nF)**, **picofarad (pF)**

## สูตรพื้นฐาน
$$X_C = \frac{1}{2\pi f C} = \frac{1}{\omega C}$$
([[Capacitive-Reactance-XC]])

$$I_C = C \frac{dV}{dt}$$
(กระแสตามการเปลี่ยนแปลงแรงดัน)

## ความสัมพันธ์กับแนวคิดอื่น

### ⚡ แนวคิดพื้นฐาน
- [[Capacitor-C]] → สร้าง [[Capacitive-Reactance-XC]]
- [[Capacitor-C]] → ส่วนหนึ่งของ [[Impedance-Z]]
- [[Capacitor-C]] → สร้าง [[Reactive-Power-Q]] (นำหน้า)

### 🔌 ใน AC Circuit
- [[Capacitor-C]] → ทำให้กระแสนำหน้าแรงดัน 90°
- [[Capacitor-C]] → ส่วน $-jX_C$ ใน [[Complex-Numbers-AC]]
- [[Capacitor-C]] → ทำให้ [[Power-Factor-PF]] นำหน้า (Leading)

### 🔌 การต่อวงจร
- [[Series-Connection]]: $\frac{1}{C_{total}} = \frac{1}{C_1} + \frac{1}{C_2}$
- [[Parallel-Connection]]: $C_{total} = C_1 + C_2 + C_3$

### ⚙️ การประยุกต์ใช้
- [[Capacitor-Bank]] → แก้ [[Power-Factor-PF]] ต่ำ
- [[Power-Factor-Correction]] → ลด [[Reactive-Power-Q]] ล้าหลัง
- [[Motor]] → ตัวเก็บประจุสตาร์ท (Starting Capacitor)

## คุณสมบัติใน DC vs AC

### DC (ความถี่ = 0)
- $X_C = \frac{1}{2\pi f C} = \infty$ → ทำตัวเหมือนตัดวงจร (open circuit)
- ชาร์จเต็มแล้วไม่มีกระแสไหล

### AC (ความถี่ > 0)
- $X_C = \frac{1}{2\pi f C}$ → ยิ่งความถี่สูง ยิ่งต้านน้อย
- กระแสนำหน้าแรงดัน 90°

## พลังงานที่เก็บ
$$E = \frac{1}{2}CV^2$$

## ประเภทของตัวเก็บประจุ
1. **Ceramic**: ขนาดเล็ก, ราคาถูก (pF-nF)
2. **Electrolytic**: ความจุสูง, มีขั้ว +/- (μF-mF)
3. **Film**: เสถียร, ทนแรงดันสูง
4. **Supercapacitor**: ความจุสูงมาก (F)

## ตัวอย่างการใช้งาน
1. **ฟิลเตอร์**: กรองสัญญาณความถี่ต่ำ
2. **Power Factor Correction**: แก้ PF ในโรงงาน
3. **Coupling**: ผ่าน AC, ตัด DC
4. **Smoothing**: ปรับแรงดัน DC ให้เรียบ

## ข้อผิดพลาดที่พบบ่อย
❌ **ผิด:** Capacitor ต้านกระแส AC  
✅ **ถูก:** Capacitor ต้านการ**เปลี่ยนแปลง**ของแรงดัน (ใน AC → ผ่านได้)

❌ **ผิด:** $X_C$ คงที่เหมือน R  
✅ **ถูก:** $X_C$ ขึ้นกับ [[Frequency-f]] → $X_C = \frac{1}{2\pi f C}$

❌ **ผิด:** Capacitor กินพลังงาน  
✅ **ถูก:** Capacitor **เก็บ**พลังงาน แล้วคืนกลับ (สร้าง [[Reactive-Power-Q]])

❌ **ผิด:** ต่อ Electrolytic Capacitor กลับขั้ว  
✅ **ถูก:** ต้องดูขั้ว +/- ให้ถูก ไม่งั้นระเบิด!

## ความสัมพันธ์กับความถี่
| ความถี่ | $X_C$ | พฤติกรรม |
|---|---|---|
| DC (0 Hz) | ∞ Ω | Open circuit |
| ต่ำ (50 Hz) | สูง | ต้านมาก |
| สูง (1 MHz) | ต่ำ | ต้านน้อย |

## การแก้ Power Factor
```
มอเตอร์ 10kW, PF = 0.7 (ล้าหลัง)
ต้องการ PF = 0.95

ติดตั้ง Capacitor Bank
→ ลด Q ล้าหลัง
→ PF เพิ่มขึ้น
→ ลดค่าไฟ!
```

## Tags
#component #passive #capacitor #AC #reactive #PF-correction
