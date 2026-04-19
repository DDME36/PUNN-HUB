'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number;
    let lastScrollY = 0;

    const toggleVisibility = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        // Only update if scrolled more than 50px to reduce re-renders
        if (Math.abs(currentScrollY - lastScrollY) > 50) {
          setIsVisible(currentScrollY > 400);
          lastScrollY = currentScrollY;
        }
        rafId = 0 as any;
      });
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="group fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-rose-400 to-purple-400 text-white shadow-[0_8px_30px_rgba(251,113,133,0.4)] backdrop-blur-sm transition-shadow hover:shadow-[0_12px_40px_rgba(251,113,133,0.6)] sm:bottom-8 sm:right-8 sm:h-14 sm:w-14"
          aria-label="กลับขึ้นด้านบน"
        >
          <ArrowUp size={20} className="transition-transform group-hover:-translate-y-1 sm:h-6 sm:w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
