'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}
