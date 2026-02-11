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
      className="relative -mt-12 w-full overflow-hidden border-y border-rose-100/50 bg-gradient-to-r from-rose-50 via-purple-50 to-blue-50 py-6 shadow-lg sm:mb-8"
      style={{ marginBottom: 'max(6rem, 15vh)' }}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251,113,133,0.1) 0%, transparent 50%),
                                     radial-gradient(circle at 80% 50%, rgba(196,181,253,0.1) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Top marquee - Seamless loop */}
      <div className="relative mb-3 flex overflow-hidden whitespace-nowrap">
        <motion.div
          className="flex whitespace-nowrap font-display text-xl font-black tracking-wide sm:text-3xl md:text-4xl lg:text-5xl"
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {/* Duplicate content 2 ครั้งเพื่อให้วนลูปไม่มีรอยต่อ */}
          {[...Array(2)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="mx-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 bg-clip-text text-transparent sm:mx-8 md:mx-12"
                >
                  โปรเจกต์ • ไอเดีย • ความรู้ • แชร์ประสบการณ์
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Skills marquee - Seamless loop (opposite direction) */}
      <div className="relative flex overflow-hidden whitespace-nowrap">
        <motion.div
          className="flex whitespace-nowrap text-sm font-semibold tracking-wide sm:text-base"
          animate={{ x: [-1600, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            },
          }}
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
        </motion.div>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-rose-50 to-transparent"></div>
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-blue-50 to-transparent"></div>
    </motion.div>
  );
};
