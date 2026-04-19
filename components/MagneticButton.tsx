'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const MagneticButton = ({
  children,
  className = '',
  intensity = 0.2,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    // ปิดการทำงานบนมือถือ/แท็บเล็ต (Touch Devices) เพื่อไม่ให้ UI กระตุก
    if (typeof window !== 'undefined' && window.matchMedia('(any-pointer: coarse)').matches) {
      return;
    }

    const { clientX, clientY } = e;
    const boundingRect = ref.current?.getBoundingClientRect();
    if (boundingRect) {
      const { width, height, left, top } = boundingRect;
      // Calculate cursor position relative to center of the element
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      // Move the element slightly towards the cursor
      setPosition({ x: x * intensity, y: y * intensity });
    }
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
