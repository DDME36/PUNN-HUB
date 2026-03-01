'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export const SmoothScroller = () => {
  useEffect(() => {
    // กำหนดค่าความสมูท เลื่อนนุ่มๆ คล้ายเนยละลาย
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function ยอดฮิตที่นุ่มที่สุด
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // ให้ requestAnimationFrame จัดการรอบอัปเดตของ Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // ป้องกัน Memory Leak
    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
};
