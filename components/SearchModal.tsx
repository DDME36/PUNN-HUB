'use client';

import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import Fuse from 'fuse.js';

interface Post {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  date: string;
  cover: string | null;
}

interface SearchModalProps {
  posts: Post[];
}

export const SearchModal = ({ posts }: SearchModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fuse.js configuration - memoized to prevent recreation
  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ['title', 'tags'],
        threshold: 0.3,
        includeScore: true,
      }),
    [posts]
  );

  // Keyboard shortcut (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Memoize search results instead of using effect
  const results = useMemo(() => {
    if (query.trim() === '') {
      return [];
    }
    const searchResults = fuse.search(query);
    return searchResults.map((result) => result.item);
  }, [query, fuse]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="เปิดค้นหาบทความ"
        className="flex min-h-[40px] items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-2 text-sm text-gray-600 backdrop-blur-md transition-all hover:border-purple-200 hover:text-purple-600 sm:px-4"
      >
        <Search size={16} aria-hidden="true" />
        <span className="hidden sm:inline">ค้นหา</span>
      </button>

      {/* Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-[2px]"
              />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-4 right-4 top-16 z-[210] w-auto max-w-2xl sm:left-1/2 sm:top-20 sm:w-full sm:-translate-x-1/2"
            >
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
                {/* Search Input */}
                <div className="flex items-center gap-3 border-b border-gray-200 p-4 sm:p-6">
                  <Search size={20} className="shrink-0 text-gray-400" aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="ค้นหาบทความ..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    aria-label="ค้นหาบทความ"
                    className="flex-1 text-base text-gray-800 placeholder-gray-400 outline-none sm:text-lg"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="ปิดค้นหา"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
                  >
                    <X size={18} className="text-gray-500" aria-hidden="true" />
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-[50vh] overflow-y-auto p-3 sm:max-h-96 sm:p-4">
                  {query.trim() === '' ? (
                    <div className="py-8 text-center text-gray-400 sm:py-12">
                      <Search size={40} className="mx-auto mb-3 opacity-30 sm:h-12 sm:w-12" aria-hidden="true" />
                      <p className="text-sm">พิมพ์เพื่อค้นหาบทความ</p>
                      <p className="mt-1 text-xs">ลองค้นหาจากชื่อหรือ tags</p>
                    </div>
                  ) : results.length === 0 ? (
                    <div className="py-8 text-center text-gray-400 sm:py-12">
                      <Search size={40} className="mx-auto mb-3 opacity-30 sm:h-12 sm:w-12" aria-hidden="true" />
                      <p className="text-sm">ไม่พบบทความที่ตรงกับคำค้นหา</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {results.map((post) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-xl border border-transparent p-3 transition-all hover:border-purple-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 sm:p-4"
                        >
                          <h3 className="mb-2 line-clamp-2 text-sm font-bold text-gray-800 sm:line-clamp-1 sm:text-base">
                            {post.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar size={12} aria-hidden="true" />
                              <span suppressHydrationWarning>
                                {new Date(post.date).toLocaleDateString('th-TH', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                            {post.tags.length > 0 && (
                              <div className="flex items-center gap-1">
                                <Tag size={12} aria-hidden="true" />
                                <span className="line-clamp-1">
                                  {post.tags.slice(0, 2).join(', ')}
                                </span>
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex flex-col items-center justify-between gap-2 border-t border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-500 sm:flex-row sm:px-6">
                  <span>พบ {results.length} บทความ</span>
                  <div className="hidden items-center gap-3 sm:flex">
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-gray-200 bg-white px-2 py-0.5">ESC</kbd>
                      ปิด
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
};
