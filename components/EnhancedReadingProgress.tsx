'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { BookOpen, Clock } from 'lucide-react';

interface EnhancedReadingProgressProps {
  readingTime: number;
}

export const EnhancedReadingProgress = ({ readingTime }: EnhancedReadingProgressProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400"
        style={{ scaleX }}
      />

      {/* Floating Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 left-8 z-40 hidden rounded-2xl border border-white/60 bg-white/95 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl lg:block"
      >
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12">
            <svg className="h-12 w-12 -rotate-90 transform">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-gray-200"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{
                  pathLength: scrollYProgress,
                }}
                strokeDasharray="125.6"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="50%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen size={16} className="text-rose-500" />
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-500">กำลังอ่าน</div>
            <div className="flex items-center gap-1.5 text-sm font-bold text-gray-800">
              <Clock size={12} />
              <span>{readingTime} นาที</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
