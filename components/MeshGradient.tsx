'use client';

import { motion } from 'framer-motion';

export const MeshGradient = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
      {/* Ambient Glow 1 - Top Left (Rose to Peach) */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.7, 0.5],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-[10%] -top-[10%] h-[70vh] w-[70vw] rounded-full bg-gradient-to-br from-rose-200 to-orange-100 blur-[100px] sm:w-[50vw]"
      />

      {/* Ambient Glow 2 - Bottom Right (Purple to Blue) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6],
          x: ['0%', '-5%', '0%'],
          y: ['0%', '-5%', '0%'],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-[10%] -right-[10%] h-[80vh] w-[80vw] rounded-full bg-gradient-to-tl from-purple-200 to-blue-200 blur-[110px] sm:w-[60vw]"
      />

      {/* Ambient Glow 3 - Center Flow (Teal/Rose hint) */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
          y: ['-10%', '10%', '-10%'],
          x: ['-5%', '5%', '-5%'],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute left-[15%] top-[20%] h-[60vh] w-[60vw] rounded-full bg-gradient-to-r from-teal-100 to-rose-200 blur-[90px]"
      />

      {/* Subtle Engineering Grid Overlay using CSS */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 10%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 60% at 50% 50%, black 10%, transparent 80%)',
        }}
      />

      {/* Soft radial vignette - fades edges without harsh overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(255,255,255,0.7) 100%)',
        }}
      ></div>
    </div>
  );
};
