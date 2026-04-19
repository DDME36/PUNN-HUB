# Inductor (L) - ตัวเหนี่ยวนำ

## คำนิยาม
**ตัวเหนี่ยวนำ (Inductor)** คืออุปกรณ์ที่เก็บพลังงานในรูปของสนามแม่เหล็ก ต้านการเปลี่ยนแปลงของกระแส

## สัญลักษณ์วงจร
```
---((((---  หรือ  ---⊂⊃---
```

## สัญลักษณ์
- **L** = Inductance (ความเหนี่ยวนำ)
- หน่วย: **Henry (H)**, **millihenry (mH)**, **microhenry (μH)**

## สูตรพื้นฐาน
$$X_L = 2\pi f L = \omega L$$
([[Inductive-Reactance-XL]])

$$V_L = L \frac{dI}{dt}$$
(แรงดันตามการเปลี่ยนแปลงกระแส)

## ความสัมพันธ์กับแนวคิดอื่น

### ⚡ แนวคิดพื้นฐาน
- [[Inductor-L]] → สร้าง [[Inductive-Reactance-XL]]
- [[Inductor-L]] → ส่วนหนึ่งของ [[Impedance-Z]]
- [[Inductor-L]] → สร้าง [[Reactive-Power-Q]] (ล้าหลัง)

### 🔌 ใน AC Circuit
- [[Inductor-L]] → ทำให้กระแสล้าหลังแรงดัน 90°
- [[Inductor-L]] → ส่วน $+jX_L$ ใน [[Complex-Numbers-AC]]
- [[Inductor-L]] → ทำให้ [[Power-Factor-PF]] ล้าหลัง (Lagging)

### 🔌 การต่อวงจร
- [[Series-Connection]]: $L_{total} = L_1 + L_2 + L_3$
- [[Parallel-Connection]]: $\frac{1}{L_{total}} = \frac{1}{L_1} + \frac{1}{L_2}$

### ⚙️ ในเครื่องจักร
- [[Motor]]: ขดลวดมอเตอร์ = Inductor ขนาดใหญ่
- [[DC-Motor]]: [[Field-Winding]] และ [[Armature-Winding]]
- [[Transformer]]: ขดลวดปฐมภูมิและทุติยภูมิ
- [[Magnetic-Circuit]]: $L = \frac{N\Phi}{I}$

## คุณสมบัติใน DC vs AC

### DC (ความถี่ = 0)
- $X_L = 2\pi f L = 0$ → ทำตัวเหมือนสายไฟ (short circuit)
- ใช้เวลาในการชาร์จ: $\tau = \frac{L}{R}$

### AC (ความถี่ > 0)
- $X_L = 2\pi f L$ → ยิ่งความถี่สูง ยิ่งต้านมาก
- กระแสล้าหลังแรงดัน 90°

## พลังงานที่เก็บ
$$E = \frac{1}{2}LI^2$$

## ตัวอย่างการใช้งาน
1. **ฟิลเตอร์**: กรองสัญญาณความถี่สูง
2. **มอเตอร์**: สร้างสนามแม่เหล็กหมุน
3. **หม้อแปลง**: ถ่ายโอนพลังงาน
4. **Choke**: จำกัดกระแส AC

## ข้อผิดพลาดที่พบบ่อย
❌ **ผิด:** Inductor ต้านกระแส DC  
✅ **ถูก:** Inductor ต้านการ**เปลี่ยนแปลง**ของกระแส (ใน DC คงที่ → $X_L = 0$)

❌ **ผิด:** $X_L$ คงที่เหมือน R  
✅ **ถูก:** $X_L$ ขึ้นกับ [[Frequency-f]] → $X_L = 2\pi f L$

❌ **ผิด:** Inductor กินพลังงาน  
✅ **ถูก:** Inductor **เก็บ**พลังงาน แล้วคืนกลับ (สร้าง [[Reactive-Power-Q]])

## ความสัมพันธ์กับความถี่
| ความถี่ | $X_L$ | พฤติกรรม |
|---|---|---|
| DC (0 Hz) | 0 Ω | Short circuit |
| ต่ำ (50 Hz) | ต่ำ | ต้านน้อย |
| สูง (1 MHz) | สูง | ต้านมาก |

## Tags
#component #passive #inductor #AC #reactive
