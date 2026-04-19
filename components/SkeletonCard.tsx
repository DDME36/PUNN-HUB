'use client';

import { motion } from 'framer-motion';

export const SkeletonCard = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-[0_4px_20px_rgb(0,0,0,0.04)] backdrop-blur-xl">
      {/* Image Skeleton */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Content Skeleton */}
      <div className="space-y-4 p-6">
        {/* Date */}
        <div className="h-4 w-24 overflow-hidden rounded-lg bg-gray-200">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 w-full overflow-hidden rounded-lg bg-gray-200">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.1,
              }}
            />
          </div>
          <div className="h-6 w-3/4 overflow-hidden rounded-lg bg-gray-200">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.2,
              }}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-16 overflow-hidden rounded-lg bg-gray-200">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0.3 + i * 0.1,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
