"use client";

import { motion } from "framer-motion";

export const SkeletonCard = () => {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-white/60">
      {/* Image Skeleton */}
      <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Date */}
        <div className="h-4 w-24 bg-gray-200 rounded-lg overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 w-full bg-gray-200 rounded-lg overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.1,
              }}
            />
          </div>
          <div className="h-6 w-3/4 bg-gray-200 rounded-lg overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.2,
              }}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-16 bg-gray-200 rounded-lg overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
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
