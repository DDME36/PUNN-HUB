# Complex Numbers in AC - จำนวนเชิงซ้อนใน AC

## คำนิยาม
**จำนวนเชิงซ้อน (Complex Numbers)** ในระบบ AC ใช้แกน $j$ (หรือ $i$ ในคณิตศาสตร์) เพื่อแทนทิศทางของพลังงานที่ไม่ได้ไปทางเดียวกัน

## สัญลักษณ์
- **$j$** = $\sqrt{-1}$ (ในวิศวกรรมไฟฟ้า)
- **$i$** = $\sqrt{-1}$ (ในคณิตศาสตร์)

## คุณสมบัติของ $j$
$$j = \sqrt{-1}$$
$$j^2 = -1$$
$$j^3 = -j$$
$$j^4 = 1$$

## รูปแบบการแสดง

### 1. Rectangular Form (รูปสี่เหลี่ยม)
$$Z = a + jb$$
- $a$ = ส่วนจริง (Real part) → แกน X
- $b$ = ส่วนจินตภาพ (Imaginary part) → แกน Y

### 2. Polar Form (รูปเชิงขั้ว)
$$Z = r\angle\theta$$
- $r$ = ขนาด (Magnitude)
- $\theta$ = มุม (Phase angle)

### 3. Exponential Form (รูปเลขชี้กำลัง)
$$Z = re^{j\theta}$$

## การแปลงระหว่างรูปแบบ

### Rectangular → Polar
$$r = |Z| = \sqrt{a^2 + b^2}$$
$$\theta = \tan^{-1}\left(\frac{b}{a}\right)$$

### Polar → Rectangular
$$a = r\cos\theta$$
$$b = r\sin\theta$$

## ความสัมพันธ์กับแนวคิดอื่น

### ⚡ อิมพีแดนซ์
- [[Impedance-Z]] = $R + jX$
- [[Resistance-R]]: ส่วนจริง (แกน Real)
- [[Inductive-Reactance-XL]]: $+jX_L$ (แกน Imaginary บวก)
- [[Capacitive-Reactance-XC]]: $-jX_C$ (แกน Imaginary ลบ)

### 🔺 กำลังไฟฟ้า
- [[Apparent-Power-S]] = $P + jQ$
- [[Real-Power-P]]: ส่วนจริง (ใช้งานได้)
- [[Reactive-Power-Q]]: ส่วนจินตภาพ (เก็บ-คืน)

### 🔌 แรงดันและกระแส
$$\vec{V} = V\angle\theta_V$$
$$\vec{I} = I\angle\theta_I$$
$$\vec{S} = \vec{V} \times \vec{I}^*$$ (Conjugate!)

## การคำนวณ

### บวก-ลบ (ใช้ Rectangular)
$$(a + jb) + (c + jd) = (a+c) + j(b+d)$$
$$(a + jb) - (c + jd) = (a-c) + j(b-d)$$

### คูณ-หาร (ใช้ Polar)
$$r_1\angle\theta_1 \times r_2\angle\theta_2 = r_1r_2\angle(\theta_1+\theta_2)$$
$$\frac{r_1\angle\theta_1}{r_2\angle\theta_2} = \frac{r_1}{r_2}\angle(\theta_1-\theta_2)$$

### Conjugate (คอนจูเกต)
$$Z^* = a - jb = r\angle(-\theta)$$
(กลับเครื่องหมายส่วนจินตภาพ)

## ตัวอย่างการใช้งาน

### ตัวอย่าง 1: อิมพีแดนซ์
```
R = 3Ω, X_L = 4Ω
Z = 3 + j4 Ω

|Z| = √(3² + 4²) = 5Ω
∠Z = tan⁻¹(4/3) = 53.13°

Z = 5∠53.13° Ω
```

### ตัวอย่าง 2: หากระแส
```
V = 220∠0° V
Z = 3 + j4 = 5∠53.13° Ω

I = V/Z = 220∠0° / 5∠53.13°
I = 44∠-53.13° A

แปลงกลับ Rectangular:
I = 44(cos(-53.13°) + j sin(-53.13°))
I = 44(0.6 - j0.8)
I = 26.4 - j35.2 A
```

### ตัวอย่าง 3: กำลังไฟฟ้า
```
V = 220∠0° V
I = 44∠-53.13° A

S = V × I* (ต้อง Conjugate!)
I* = 44∠53.13° A (กลับเครื่องหมายมุม)

S = 220∠0° × 44∠53.13°
S = 9,680∠53.13° VA

แปลงเป็น Rectangular:
S = 9,680(cos 53.13° + j sin 53.13°)
S = 9,680(0.6 + j0.8)
S = 5,808 + j7,744 VA
S = 5.8 kW + j7.7 kVAR

P = 5.8 kW (Real Power)
Q = 7.7 kVAR (Reactive Power)
```

### ตัวอย่าง 4: วงจร R-L-C
```
R = 10Ω, X_L = 20Ω, X_C = 15Ω

Z = R + jX_L - jX_C
Z = 10 + j20 - j15
Z = 10 + j5 Ω

|Z| = √(10² + 5²) = 11.18Ω
∠Z = tan⁻¹(5/10) = 26.57°
```

## แผนภาพเชิงซ้อน (Complex Plane)

### แกน Real-Imaginary
```
        +jX (Imaginary)
           |
           |  Z = R + jX
           | /
           |/θ
-R --------+-------- +R (Real)
           |
           |
        -jX
```

### ความหมาย
- **แกน Real (+R)**: [[Resistance-R]], [[Real-Power-P]]
- **แกน +j**: [[Inductive-Reactance-XL]], Q ล้าหลัง
- **แกน -j**: [[Capacitive-Reactance-XC]], Q นำหน้า

## ข้อผิดพลาดที่พบบ่อย

❌ **ผิด:** Z = R + X (บวกตรงๆ)  
✅ **ถูก:** Z = R + jX (ต้องมี j)

❌ **ผิด:** |Z| = R + X  
✅ **ถูก:** |Z| = √(R² + X²)

❌ **ผิด:** S = V × I  
✅ **ถูก:** S = V × I* (ต้อง Conjugate!)

❌ **ผิด:** บวก-ลบใช้ Polar  
✅ **ถูก:** บวก-ลบใช้ Rectangular, คูณ-หารใช้ Polar

❌ **ผิด:** X_L - X_C = j(X_L - X_C)  
✅ **ถูก:** jX_L - jX_C = j(X_L - X_C)

## เทคนิคจำ

### 🎯 การเลือกรูปแบบ
- **บวก-ลบ** → Rectangular (a + jb)
- **คูณ-หาร** → Polar (r∠θ)
- **หา |Z|** → Polar หรือ √(a² + b²)

### 🎯 ทิศทาง
- **+j** = ขึ้น = Inductive = ล้าหลัง
- **-j** = ลง = Capacitive = นำหน้า
- **Real** = แนวนอน = Resistive

### 🎯 Conjugate
```
S = V × I*
ต้องกลับเครื่องหมายมุมของ I
I = 10∠-30° → I* = 10∠30°
```

## การใช้เครื่องคิดเลข
```
Mode: CMPLX (Complex)

Rectangular → Polar: Shift + (-)
Polar → Rectangular: Shift + (-)

ตัวอย่าง:
3 + j4 → Shift + (-) → 5∠53.13°
```

## Tags
#complex-numbers #AC #mathematics #calculation #fundamental
