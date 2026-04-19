# Series Connection - การต่ออนุกรม

## คำนิยาม
**การต่ออนุกรม (Series Connection)** คือการต่ออุปกรณ์ต่อเนื่องกันเป็นทอดๆ กระแสไหลผ่านทุกตัวเท่ากัน

## คุณสมบัติ
- **กระแสเท่ากัน**: I เดียวกันทุกตัว
- **แรงดันแบ่ง**: V รวม = V1 + V2 + V3

## สูตร

### Resistor
$$R_{total} = R_1 + R_2 + R_3 + ...$$

### Inductor
$$L_{total} = L_1 + L_2 + L_3 + ...$$

### Capacitor (สัดส่วนกลับ!)
$$\frac{1}{C_{total}} = \frac{1}{C_1} + \frac{1}{C_2} + \frac{1}{C_3}$$

### Impedance
$$Z_{total} = Z_1 + Z_2 + Z_3$$

## ตัวอย่าง

### R อนุกรม
```
R1 = 10Ω, R2 = 20Ω, R3 = 30Ω
R_total = 10 + 20 + 30 = 60Ω
```

### C อนุกรม
```
C1 = 100μF, C2 = 100μF
1/C_total = 1/100 + 1/100 = 2/100
C_total = 50μF
```

## Tags
#circuit #connection #series

