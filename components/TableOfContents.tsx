'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X, ChevronRight } from 'lucide-react';
import { slugify } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(headingRegex));

    const extractedHeadings = matches.map((match) => ({
      level: match[1].length,
      text: match[2].trim(),
      id: slugify(match[2].trim()),
    }));

    setHeadings(extractedHeadings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -75% 0px', threshold: 0 }
    );

    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const timer = setTimeout(() => {
      extractedHeadings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) observer.observe(element);
      });
    }, 1000);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [content]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Floating Progress Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-2xl lg:hidden"
      >
        <svg className="absolute h-full w-full -rotate-90">
          <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-gray-100" />
          <motion.circle
            cx="28"
            cy="28"
            r="24"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray="150.8"
            animate={{ strokeDashoffset: 150.8 - (150.8 * progress) / 100 }}
            className="text-rose-500"
          />
        </svg>
        {isOpen ? <X size={20} className="text-gray-800" /> : <List size={20} className="text-gray-800" />}
      </motion.button>

      {/* Desktop TOC Panel */}
      <aside className="hidden lg:block">
        <div className="fixed left-6 top-32 w-72 z-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[2.5rem] border border-gray-200/50 bg-white/70 p-1 shadow-2xl backdrop-blur-xl flex flex-col max-h-[calc(100vh-200px)]"
          >
            {/* Header - Fixed inside container */}
            <div className="p-6 pb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-purple-500 text-white shadow-lg">
                <List size={18} />
              </div>
              <h3 className="font-display text-xl font-black text-gray-800 tracking-tight">สารบัญ</h3>
            </div>

            {/* Scrollable Heading List - Now captures scroll wheel properly */}
            <nav className="flex-1 overflow-y-auto px-4 pb-4 overscroll-contain custom-scrollbar">
              <div className="relative pl-3">
                <div className="absolute left-0 top-0 h-full w-px bg-gray-100" />
                <ul className="space-y-1">
                  {headings.map((heading) => {
                    const isActive = activeId === heading.id;
                    return (
                      <li key={heading.id} style={{ paddingLeft: `${(heading.level - 1) * 12}px` }} className="relative">
                        {isActive && (
                          <motion.div
                            layoutId="active-toc-indicator"
                            className="absolute -left-[13px] top-0 h-full w-1 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.5)]"
                          />
                        )}
                        <button
                          onClick={() => scrollToHeading(heading.id)}
                          className={`group flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                            isActive ? 'bg-rose-50/80 font-bold text-rose-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <ChevronRight size={10} className={`transition-transform duration-300 ${isActive ? 'rotate-90 opacity-100' : 'opacity-30 group-hover:opacity-100'}`} />
                          <span className="truncate">{heading.text}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>

            {/* Reading Progress - Fixed inside container */}
            <div className="p-6 pt-0 border-t border-gray-100/50 mt-2">
              <div className="mt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                <span>Reading</span>
                <span className="text-rose-500 font-bold">{Math.round(progress)}%</span>
              </div>
              <div className="mt-3 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-rose-400 to-purple-500"
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm lg:hidden" />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-[160] max-h-[85vh] flex flex-col rounded-t-[40px] bg-white shadow-2xl lg:hidden"
            >
              <div className="mx-auto mt-4 mb-2 h-1.5 w-12 rounded-full bg-gray-200" />
              <div className="p-8 pb-4 flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold text-gray-800">สารบัญ</h3>
                <button onClick={() => setIsOpen(false)} className="rounded-full bg-gray-100 p-2 text-gray-500"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 pb-12 overscroll-contain">
                <ul className="space-y-2">
                  {headings.map((heading) => (
                    <li key={heading.id} style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}>
                      <button
                        onClick={() => scrollToHeading(heading.id)}
                        className={`w-full rounded-2xl p-5 text-left text-base font-bold transition-all ${
                          activeId === heading.id ? 'bg-rose-50 text-rose-500 shadow-sm border border-rose-100' : 'bg-gray-50 text-gray-700'
                        }`}
                      >
                        {heading.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
