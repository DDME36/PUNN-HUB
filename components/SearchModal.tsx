'use client';

import { useState, useEffect, useMemo } from 'react';
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
  const [results, setResults] = useState<Post[]>([]);

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

  // Search function
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchResults = fuse.search(query);
    setResults(searchResults.map((result) => result.item));
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
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm text-gray-600 backdrop-blur-md transition-all hover:border-purple-200 hover:text-purple-600"
      >
        <Search size={16} />
        <span>ค้นหา</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-4 right-4 top-20 z-50 w-auto max-w-2xl sm:left-1/2 sm:w-full sm:-translate-x-1/2"
            >
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
                {/* Search Input */}
                <div className="flex items-center gap-3 border-b border-gray-200 p-6">
                  <Search size={20} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="ค้นหาบทความ..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    className="flex-1 text-lg text-gray-800 placeholder-gray-400 outline-none"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
                  >
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto p-4">
                  {query.trim() === '' ? (
                    <div className="py-12 text-center text-gray-400">
                      <Search size={48} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm">พิมพ์เพื่อค้นหาบทความ</p>
                      <p className="mt-1 text-xs">ลองค้นหาจากชื่อหรือ tags</p>
                    </div>
                  ) : results.length === 0 ? (
                    <div className="py-12 text-center text-gray-400">
                      <Search size={48} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm">ไม่พบบทความที่ตรงกับคำค้นหา</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {results.map((post) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-xl border border-transparent p-4 transition-all hover:border-purple-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
                        >
                          <h3 className="mb-2 line-clamp-1 font-bold text-gray-800">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar size={12} />
                              <span>
                                {new Date(post.date).toLocaleDateString('th-TH', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                            {post.tags.length > 0 && (
                              <div className="flex items-center gap-1">
                                <Tag size={12} />
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
                <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3 text-xs text-gray-500">
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
      </AnimatePresence>
    </>
  );
};
