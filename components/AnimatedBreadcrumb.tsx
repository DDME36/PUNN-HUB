"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface AnimatedBreadcrumbProps {
  items: BreadcrumbItem[];
}

export const AnimatedBreadcrumb = ({ items }: AnimatedBreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-2 text-sm">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link 
          href="/" 
          className="flex items-center gap-1 text-gray-500 hover:text-rose-500 transition-colors group"
        >
          <Home size={14} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium">หน้าแรก</span>
        </Link>
      </motion.div>

      {items.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: (index + 1) * 0.1 }}
          className="flex items-center gap-2"
        >
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronRight size={14} className="text-gray-300" />
          </motion.div>
          
          {index === items.length - 1 ? (
            <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-none">
              {item.label}
            </span>
          ) : (
            <Link 
              href={item.href}
              className="text-gray-500 hover:text-rose-500 transition-colors font-medium hover:underline"
            >
              {item.label}
            </Link>
          )}
        </motion.div>
      ))}
    </nav>
  );
};
