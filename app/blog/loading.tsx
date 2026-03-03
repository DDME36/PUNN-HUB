'use client';

import { motion } from 'framer-motion';
import { SkeletonCard } from '@/components/SkeletonCard';

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Skeleton */}
      <div className="relative bg-gradient-to-br from-rose-50/50 via-purple-50/50 to-blue-50/50 py-16 sm:py-20">
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl sm:p-10">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex-1 text-center sm:text-left">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mx-auto mb-4 h-8 w-32 rounded-full bg-gray-200 sm:mx-0"
                />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                  className="mx-auto mb-3 h-12 w-48 rounded-lg bg-gray-200 sm:mx-0"
                />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="mx-auto h-6 w-64 rounded-lg bg-gray-200 sm:mx-0"
                />
              </div>
              <div className="flex items-center gap-6">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  className="h-24 w-24 rounded-2xl bg-gray-200"
                />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="h-24 w-24 rounded-2xl bg-gray-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton Grid */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
