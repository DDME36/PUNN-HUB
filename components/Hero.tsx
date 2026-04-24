'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TypewriterText } from './TypewriterText';
import { GradientText } from './GradientText';
import { MagneticButton } from './MagneticButton';

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
    let timeoutId: NodeJS.Timeout; // ประกาศตัวแปรเก็บ ID ของ Timeout

    // Random animation every 8-15 seconds
    const triggerRandomAnimation = () => {
      const randomDelay = Math.random() * 7000 + 8000; // 8-15 seconds
      timeoutId = setTimeout(() => {
        setAnimationKey((prev) => prev + 1);
        triggerRandomAnimation();
      }, randomDelay);
    };

    triggerRandomAnimation();

    // ทำลาย Timeout ทิ้งเมื่อผู้ใช้ออกจากหน้าเว็บ หรือ Component ถูก Unmount
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const currentAnimation = animations[animationKey % animations.length];

  return (
    <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden py-16 sm:min-h-[50vh] sm:py-24">
      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-gradient-to-r from-rose-300 to-purple-300 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-gradient-to-l from-blue-300 to-indigo-300 blur-3xl"
        />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-5 py-2.5 text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md transition-shadow hover:shadow-[0_12px_40px_rgb(0,0,0,0.1)]"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles size={16} className="text-rose-400" />
          </motion.div>
          <span className="text-gray-600">Welcome to</span>
          <motion.a
            key={animationKey}
            href="/"
            initial={false}
            animate={currentAnimation}
            transition={animationTransition}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="inline-block cursor-pointer bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text font-bold text-transparent"
          >
            PUNN HUB
          </motion.a>
        </motion.div>

        {/* Main Heading with Typewriter */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 font-display text-3xl font-black leading-[1.1] tracking-tight text-gray-800 sm:text-4xl lg:text-5xl will-change-transform"
        >
          <span className="mb-2 block overflow-hidden">
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              <TypewriterText
                texts={['Knowledge Hub', 'แหล่งความรู้', 'Tech Blog', 'Developer Hub']}
                typingSpeed={150}
                deletingSpeed={100}
                delayBetween={3000}
                className="inline-block"
              />
            </motion.span>
          </span>
          <GradientText className="block">สำหรับนักพัฒนา</GradientText>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-7 max-w-xl text-base font-light leading-relaxed text-gray-500 sm:text-lg will-change-transform"
        >
          แหล่งรวมความรู้ ไอเดีย และเทคนิคต่างๆ
          <br className="hidden sm:block" />
          สำหรับการพัฒนาเว็บไซต์และเทคโนโลยี
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <MagneticButton>
            <motion.a
              href="/blog"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="อ่านบทความทั้งหมด"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-rose-400 to-purple-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgb(251,113,133,0.3)] transition-all hover:shadow-[0_12px_40px_rgb(251,113,133,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 sm:px-8 sm:py-4 sm:text-base"
            >
              บทความ
              <motion.svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </motion.a>
          </MagneticButton>

          <MagneticButton>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }}
              aria-label="ดูโปรเจกต์ทั้งหมด"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/60 bg-white/90 px-6 py-3 text-sm font-semibold text-gray-700 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 sm:px-8 sm:py-4 sm:text-base"
            >
              โปรเจกต์
            </motion.button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};
