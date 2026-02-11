'use client';

import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="h-8 w-8 rounded-full border-2 border-emerald-200 border-t-emerald-600"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100/50 bg-white p-4 shadow-lg sm:rounded-3xl sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-6 w-6 rounded bg-gray-200"></div>
        <div className="h-4 w-16 rounded bg-gray-200"></div>
      </div>
      <div className="space-y-2">
        <div className="h-6 w-3/4 rounded bg-gray-200"></div>
        <div className="h-4 w-1/2 rounded bg-gray-200"></div>
      </div>
    </div>
  );
};
