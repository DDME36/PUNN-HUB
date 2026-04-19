# GMD and GMR

## GMD (Geometric Mean Distance)

### คำนิยาม
**GMD** คือระยะห่างเฉลี่ยเชิงเรขาคณิตระหว่างสายไฟ 3 เฟส

### สูตร
$$D_{eq} = \sqrt[3]{D_{12} \times D_{23} \times D_{31}}$$

- D12 = ระยะห่างระหว่างเฟส 1-2
- D23 = ระยะห่างระหว่างเฟส 2-3
- D31 = ระยะห่างระหว่างเฟส 3-1

### ตัวอย่าง
```
D12 = 5 m, D23 = 5 m, D31 = 5 m
GMD = ∛(5 × 5 × 5) = 5 m
```

## GMR (Geometric Mean Radius)

### คำนิยาม
**GMR** คือรัศมีประสิทธิผลของสายไฟ

### สูตร (สายทองแดงตัน)
$$D_s = 0.7788 \times r$$

- r = รัศมีจริงของสาย

### ตัวอย่าง
```
r = 1 cm = 0.01 m
GMR = 0.7788 × 0.01 = 0.007788 m
```

## การใช้งาน
ใช้ใน [[Transmission-Line-Parameters]]:
$$L = 2 \times 10^{-7} \ln\left(\frac{GMD}{GMR}\right)$$

## Tags
#transmission-line #GMD #GMR #advanced

