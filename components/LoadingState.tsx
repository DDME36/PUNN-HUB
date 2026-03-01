'use client';

import { motion } from 'framer-motion';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = 'กำลังโหลด...' }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="border-3 mb-6 h-12 w-12 rounded-full border-rose-200 border-t-rose-500"
      />
      <p className="text-lg text-gray-500">{message}</p>
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6">
      <div className="flex gap-6">
        <div className="h-32 w-48 flex-shrink-0 rounded-xl bg-gray-200" />
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="mb-3 h-3 w-24 rounded bg-gray-200" />
            <div className="mb-2 h-6 w-full rounded bg-gray-200" />
            <div className="h-6 w-3/4 rounded bg-gray-200" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded bg-gray-200" />
            <div className="h-6 w-20 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};
