# Parallel Connection - การต่อขนาน

## คำนิยาม
**การต่อขนาน (Parallel Connection)** คือการต่ออุปกรณ์ที่มีจุดเริ่มต้นและจุดสิ้นสุดร่วมกัน แรงดันเท่ากัน

## คุณสมบัติ
- **แรงดันเท่ากัน**: V เดียวกันทุกตัว
- **กระแสแยกสาขา**: I รวม = I1 + I2 + I3

## สูตร

### Resistor (สัดส่วนกลับ!)
$$\frac{1}{R_{total}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3}$$

### Inductor (สัดส่วนกลับ!)
$$\frac{1}{L_{total}} = \frac{1}{L_1} + \frac{1}{L_2} + \frac{1}{L_3}$$

### Capacitor
$$C_{total} = C_1 + C_2 + C_3 + ...$$

### Impedance (สัดส่วนกลับ!)
$$\frac{1}{Z_{total}} = \frac{1}{Z_1} + \frac{1}{Z_2} + \frac{1}{Z_3}$$

## ตัวอย่าง

### R ขนาน (2 ตัว)
```
R1 = 10Ω, R2 = 10Ω
R_total = (R1 × R2)/(R1 + R2)
R_total = (10 × 10)/(10 + 10) = 100/20 = 5Ω
```

### C ขนาน
```
C1 = 100μF, C2 = 100μF
C_total = 100 + 100 = 200μF
```

## Tags
#circuit #connection #parallel

