'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X } from 'lucide-react';

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

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(headingRegex));

    const extractedHeadings = matches.map((match, index) => {
      const level = match[1].length;
      const text = match[2].trim();
      const id = `heading-${index}`;
      return { id, text, level };
    });

    setHeadings(extractedHeadings);

    // Observe scroll position
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    // Wait for headings to be rendered
    setTimeout(() => {
      extractedHeadings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) observer.observe(element);
      });
    }, 500);

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button - ปรับตำแหน่งให้ไม่ทับ BackToTop */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'ปิดสารบัญ' : 'เปิดสารบัญ'}
        className="fixed bottom-20 left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-blue-400 text-white shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl sm:bottom-24 lg:hidden"
      >
        {isOpen ? <X size={20} aria-hidden="true" /> : <List size={20} aria-hidden="true" />}
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* TOC Panel - Improved responsive */}
      <AnimatePresence>
        {(isOpen || typeof window === 'undefined') && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed left-4 top-24 z-[160] w-[calc(100vw-2rem)] max-w-xs sm:left-6 sm:top-32 ${!isOpen && 'hidden lg:block'}`}
          >
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur-xl sm:p-6">
              <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <List size={18} className="text-purple-500" aria-hidden="true" />
                  <h3 className="font-bold text-gray-800">สารบัญ</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 lg:hidden"
                  aria-label="ปิดสารบัญ"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
              <nav aria-label="สารบัญบทความ">
                <ul className="space-y-2">
                  {headings.map((heading) => (
                    <li key={heading.id} style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}>
                      <button
                        onClick={() => scrollToHeading(heading.id)}
                        className={`w-full text-left text-sm transition-all hover:text-purple-600 ${
                          activeId === heading.id ? 'font-semibold text-purple-600' : 'text-gray-600'
                        }`}
                        aria-current={activeId === heading.id ? 'location' : undefined}
                      >
                        <span className="flex items-start gap-2">
                          <span
                            className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full transition-colors ${
                              activeId === heading.id ? 'bg-purple-600' : 'bg-gray-400'
                            }`}
                            aria-hidden="true"
                          />
                          <span className="line-clamp-2">{heading.text}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
