'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TypewriterText } from './TypewriterText';
import { GradientText } from './GradientText';

export const Hero = () => {
  const [animationKey, setAnimationKey] = useState(0);

  // Random animations
  const animations = [
    // Wave
    { y: [0, -5, 0, -3, 0] },
    // Bounce
    { scale: [1, 1.1, 0.95, 1.05, 1] },
    // Shake
    { x: [0, -3, 3, -3, 3, 0] },
    // Rotate wiggle
    { rotate: [0, -5, 5, -3, 3, 0] },
    // Scale pulse
    { scale: [1, 1.15, 1] },
  ];

  const animationTransition = {
    duration: 0.5,
    ease: 'easeInOut' as const,
  };

  useEffect(() => {
    // Random animation every 5-10 seconds
    const triggerRandomAnimation = () => {
      const randomDelay = Math.random() * 5000 + 5000; // 5-10 seconds
      setTimeout(() => {
        setAnimationKey((prev) => prev + 1);
        triggerRandomAnimation();
      }, randomDelay);
    };

    triggerRandomAnimation();
  }, []);

  const currentAnimation = animations[animationKey % animations.length];

  return (
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50/50 via-purple-50/50 to-blue-50/50 py-10">
      {/* Soft Floating Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-gradient-to-br from-rose-200/20 to-rose-300/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-gradient-to-br from-purple-200/20 to-purple-300/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-200/15 to-blue-300/10 blur-3xl" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-5 py-2.5 text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md"
        >
          <Sparkles size={16} className="text-rose-400" />
          <span className="text-gray-600">Welcome to</span>
          <motion.a
            key={animationKey}
            href="/"
            initial={false}
            animate={currentAnimation}
            transition={animationTransition}
            whileTap={{ scale: 0.95 }}
            className="inline-block cursor-pointer bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text font-bold text-transparent"
          >
            PUNN HUB
          </motion.a>
        </motion.div>

        {/* Main Heading with Typewriter */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-5 font-display text-4xl font-black leading-[1.1] tracking-tight text-gray-800 sm:text-5xl lg:text-6xl"
        >
          <span className="mb-2 block">
            <TypewriterText
              texts={['Knowledge Hub', 'แหล่งความรู้', 'Tech Blog', 'Developer Hub']}
              typingSpeed={150}
              deletingSpeed={100}
              delayBetween={3000}
              className="inline-block"
            />
          </span>
          <GradientText className="block">สำหรับนักพัฒนา</GradientText>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mb-7 max-w-xl text-base font-light leading-relaxed text-gray-500 sm:text-lg"
        >
          แหล่งรวมความรู้ ไอเดีย และเทคนิคต่างๆ
          <br className="hidden sm:block" />
          สำหรับการพัฒนาเว็บไซต์และเทคโนโลยี
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <motion.a
            href="/blog"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group rounded-2xl bg-gradient-to-br from-rose-400 to-purple-400 px-8 py-4 text-center font-semibold text-white shadow-[0_8px_30px_rgb(251,113,133,0.3)] transition-all hover:shadow-[0_12px_40px_rgb(251,113,133,0.4)]"
          >
            <span className="flex items-center justify-center gap-2">
              อ่านบทความ
              <motion.svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </span>
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
            className="rounded-2xl border border-white/60 bg-white/90 px-8 py-4 font-semibold text-gray-700 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]"
          >
            ดูโปรเจกต์
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
