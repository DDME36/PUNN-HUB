'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50/50 via-purple-50/50 to-blue-50/50">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <motion.h1
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="bg-gradient-to-r from-rose-400 via-purple-400 to-rose-400 bg-[length:200%_auto] bg-clip-text font-display text-4xl font-black text-transparent sm:text-5xl"
          >
            PUNN HUB
          </motion.h1>
        </motion.div>

        {/* Loading Spinner - Improved */}
        <div className="flex items-center justify-center gap-2">
          {[0, 0.15, 0.3].map((delay, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
              }}
              className={`h-3 w-3 rounded-full ${
                i === 0 ? 'bg-rose-400' : i === 1 ? 'bg-purple-400' : 'bg-blue-400'
              }`}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-6 text-sm text-gray-500"
        >
          กำลังโหลด...
        </motion.p>
      </div>
    </div>
  );
}
