'use client';

import { motion } from 'framer-motion';

const skills = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'AI/ML',
  'Web3',
  'Mobile Apps',
  'UI/UX',
  'DevOps',
];

export const Marquee = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 2 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative mb-12 mt-6 w-full overflow-hidden border-y border-gray-200/30 bg-white/70 py-6 shadow-lg backdrop-blur-md sm:-mt-12 sm:mb-8"
    >

      {/* Top marquee - Pure CSS Animation (GPU Accelerated) */}
      <div className="relative mb-3 flex overflow-hidden whitespace-nowrap">
        <div
          className="animate-marquee flex whitespace-nowrap font-display text-xl font-black sm:text-2xl md:text-3xl lg:text-4xl"
          style={{ willChange: 'transform', letterSpacing: '0.1em', lineHeight: '1.5' }}
        >
          {/* Duplicate content 2 ครั้งเพื่อให้วนลูปไม่มีรอยต่อ */}
          {[...Array(2)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex">
              {[...Array(8)].map((_, i) => (
                <span
                  key={i}
                  className="mx-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 bg-clip-text text-transparent sm:mx-8 md:mx-10"
                >
                  โปรเจกต์ • ไอเดีย • ความรู้
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Skills marquee - Pure CSS Animation (opposite direction) */}
      <div className="relative flex overflow-hidden whitespace-nowrap">
        <div
          className="animate-marquee-reverse flex whitespace-nowrap text-sm font-semibold sm:text-base"
          style={{ willChange: 'transform', letterSpacing: '0.05em' }}
        >
          {/* Duplicate content 2 ครั้งเพื่อให้วนลูปไม่มีรอยต่อ */}
          {[...Array(2)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex">
              {[...Array(20)].map((_, i) => (
                <span key={i} className="mx-6 text-gray-500 sm:mx-8">
                  {skills[i % skills.length]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white/80 to-transparent"></div>
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white/80 to-transparent"></div>
    </motion.div>
  );
};
