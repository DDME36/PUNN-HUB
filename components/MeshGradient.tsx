'use client';

import { motion } from 'framer-motion';

export const MeshGradient = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-white via-rose-50/20 to-purple-50/20">
      {/* Animated Gradient Orbs - Subtle and Smooth */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -left-[5%] -top-[5%] h-[250px] w-[250px] rounded-full bg-rose-300/20 blur-[80px] sm:h-[350px] sm:w-[350px] sm:blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 40, -15, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute -bottom-[10%] -right-[5%] h-[300px] w-[300px] rounded-full bg-purple-300/20 blur-[90px] sm:h-[400px] sm:w-[400px] sm:blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -20, 30, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/15 blur-[100px] sm:h-[380px] sm:w-[380px] sm:blur-[140px]"
      />

      {/* Soft gradient overlay for smooth blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60"></div>
    </div>
  );
};
