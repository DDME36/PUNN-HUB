'use client';

import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup, Variants } from 'framer-motion';
import { Card } from './Card';
import {
  BookOpen,
  Calendar,
  Tag,
  X,
  ArrowUpRight,
  AlertCircle,
  FileText,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  date: string;
  cover: string | null;
  content?: string;
}

interface BlogListProps {
  posts: Post[];
  error: string | null;
}

// Helper function to calculate reading time - removed as requested
// const calculateReadingTime = (title: string): number => {
//     // Mock reading time based on title length (in real app, use content length)
//     const hash = title.split('').reduce((a, b) => {
//         a = ((a << 5) - a) + b.charCodeAt(0);
//         return a & a;
//     }, 0);
//     return Math.abs(hash % 8) + 3; // 3-10 minutes
// };

// Animation variants for stagger
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export const BlogList = ({ posts, error }: BlogListProps) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Extract all unique tags
  const allTags = ['All', ...Array.from(new Set(posts.flatMap((post) => post.tags)))];

  // Filter posts based on selected tag
  const filteredPosts =
    selectedTag === 'All' ? posts : posts.filter((post) => post.tags.includes(selectedTag));

  return (
    <>
      {/* Hero Section - Soft UI Card */}
      <div className="relative bg-gradient-to-br from-rose-50/50 via-purple-50/50 to-blue-50/50 py-16 sm:py-20">
        {/* Soft Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(253,164,175,0.15) 0%, transparent 50%), 
                                         radial-gradient(circle at 75% 75%, rgba(196,181,253,0.15) 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        {/* Centered Card Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-5xl px-6"
        >
          {/* Floating Card */}
          <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-10">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              {/* Left Side - Main Content */}
              <div className="text-center sm:text-left">
                <motion.div
                  variants={itemVariants}
                  className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-100/50 bg-gradient-to-r from-rose-50 to-purple-50 px-4 py-2 text-sm font-semibold"
                >
                  <BookOpen size={14} className="text-rose-400" />
                  <span className="text-gray-600">Knowledge</span>
                  <span className="text-rose-400">Hub</span>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="mb-3 font-display text-4xl font-black tracking-tight text-gray-800 sm:text-5xl"
                >
                  บทความ
                </motion.h1>

                <motion.p variants={itemVariants} className="text-base font-light text-gray-500">
                  แชร์ความรู้และประสบการณ์ด้านเทคโนโลยี
                </motion.p>
              </div>

              {/* Right Side - Stats Cards */}
              <motion.div variants={itemVariants} className="flex items-center gap-6">
                {/* Stat Card 1 */}
                <div className="rounded-2xl border border-rose-100/50 bg-gradient-to-br from-rose-50 to-rose-100/50 px-6 py-4 text-center shadow-[0_4px_20px_rgb(251,113,133,0.1)]">
                  <div className="mb-1 text-3xl font-black text-rose-500">{posts.length}</div>
                  <div className="text-xs font-medium text-gray-600">บทความ</div>
                </div>

                {/* Stat Card 2 */}
                <div className="rounded-2xl border border-purple-100/50 bg-gradient-to-br from-purple-50 to-purple-100/50 px-6 py-4 text-center shadow-[0_4px_20px_rgb(192,132,252,0.1)]">
                  <div className="mb-1 text-3xl font-black text-purple-500">
                    {allTags.length - 1}
                  </div>
                  <div className="text-xs font-medium text-gray-600">หมวดหมู่</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl"
          >
            {/* Error Card - Soft UI */}
            <div className="rounded-3xl border border-red-100/50 bg-white/90 p-8 text-center text-red-600 shadow-[0_8px_30px_rgb(239,68,68,0.1)] backdrop-blur-xl">
              <div className="mb-4">
                <AlertCircle className="mx-auto h-16 w-16 text-red-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">ไม่สามารถโหลดบทความได้</h3>
              <p className="text-sm text-gray-500">{error}</p>
            </div>
          </motion.div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20 text-center"
          >
            {/* Empty State Card */}
            <div className="mx-auto max-w-md rounded-3xl border border-white/60 bg-white/90 p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl">
              <div className="mb-6">
                <FileText className="mx-auto h-20 w-20 text-gray-300" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-400">กำลังเตรียมเนื้อหา</h3>
              <p className="font-light text-gray-500">บทความและความรู้ใหม่ๆ กำลังจะมาเร็วๆ นี้</p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Filter Section - Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              {/* Filter Card */}
              <div className="overflow-visible rounded-3xl border border-white/60 bg-white/90 p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-bold text-gray-800">
                      {filteredPosts.length} บทความ
                      {selectedTag !== 'All' && (
                        <span className="ml-2 text-base text-rose-400">· {selectedTag}</span>
                      )}
                    </h2>
                  </div>

                  {/* Clear Filter Button */}
                  {selectedTag !== 'All' && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTag('All')}
                      className="flex items-center gap-2 rounded-full border border-rose-100/50 bg-gradient-to-r from-rose-50 to-purple-50 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:from-rose-100 hover:to-purple-100"
                    >
                      <X size={14} />
                      ล้าง
                    </motion.button>
                  )}
                </div>

                {/* Scrollable Filter Pills */}
                <div className="scrollbar-hide -mx-2 overflow-x-auto px-2 pb-4 pt-2">
                  <div className="flex min-w-max gap-2 py-2">
                    {allTags.map((tag, index) => (
                      <motion.button
                        key={tag}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.03 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTag(tag)}
                        className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                          selectedTag === tag
                            ? 'bg-gradient-to-r from-rose-400 to-purple-400 text-white shadow-[0_8px_24px_-4px_rgba(251,113,133,0.4)]'
                            : 'border border-gray-100 bg-white text-gray-600 shadow-[0_4px_16px_-2px_rgba(0,0,0,0.06)] hover:bg-gradient-to-r hover:from-rose-50 hover:to-purple-50'
                        }`}
                      >
                        {tag}
                        {tag !== 'All' && (
                          <span
                            className={`ml-2 text-xs ${
                              selectedTag === tag ? 'text-white/80' : 'text-gray-400'
                            }`}
                          >
                            {posts.filter((post) => post.tags.includes(tag)).length}
                          </span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Articles List - Single Column Vertical */}
            <LayoutGroup>
              <motion.div
                layout
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08 },
                  },
                }}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredPosts.map((post: Post) => (
                    <motion.div
                      key={post.id}
                      layout
                      variants={cardVariants}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        layout: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                      }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <motion.div
                          whileHover={{
                            y: -4,
                            transition: {
                              type: 'spring',
                              stiffness: 400,
                              damping: 25,
                            },
                          }}
                          className="group cursor-pointer overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-[0_4px_20px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]"
                        >
                          {/* Cover Image with Gradient Fade */}
                          <div className="relative -z-10 -mb-6 h-56 w-full overflow-visible">
                            {post.cover ? (
                              <>
                                <Image
                                  src={post.cover}
                                  alt={post.title}
                                  fill
                                  priority
                                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                                  style={{
                                    objectPosition: 'center 35%',
                                    maskImage:
                                      'linear-gradient(to bottom, black 30%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.2) 85%, transparent 100%)',
                                    WebkitMaskImage:
                                      'linear-gradient(to bottom, black 30%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.2) 85%, transparent 100%)',
                                  }}
                                  sizes="(max-width: 768px) 100vw, 896px"
                                  unoptimized={post.cover.includes('notion.so')}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                                {/* Subtle Gradient Fade Overlay - ไล่เฉพาะด้านล่าง */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-60% via-white/20 to-white/40"></div>
                              </>
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-rose-100/80 via-purple-100/80 to-blue-100/80">
                                <BookOpen size={64} className="text-rose-300" />
                              </div>
                            )}

                            {/* Arrow Icon - Top Right */}
                            <div className="absolute right-4 top-4">
                              <motion.div
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg backdrop-blur-sm transition-all group-hover:bg-gradient-to-br group-hover:from-rose-400 group-hover:to-purple-400 group-hover:text-white"
                                whileHover={{ scale: 1.1, rotate: 45 }}
                              >
                                <ArrowUpRight size={18} />
                              </motion.div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="relative z-10 p-6">
                            {/* Date */}
                            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-400">
                              <Calendar size={12} />
                              <span suppressHydrationWarning>
                                {new Date(post.date).toLocaleDateString('th-TH', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>

                            {/* Title */}
                            <h2 className="mb-3 line-clamp-2 font-display text-xl font-bold leading-snug text-gray-800 transition-colors group-hover:text-rose-400">
                              {post.title}
                            </h2>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 5).map((tag: string) => (
                                <span
                                  key={tag}
                                  className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                                >
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 5 && (
                                <span className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs text-gray-400">
                                  +{post.tags.length - 5}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>

            {/* No Results State - Soft UI Card */}
            {filteredPosts.length === 0 && selectedTag !== 'All' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 text-center"
              >
                <div className="mx-auto max-w-md rounded-3xl border border-white/60 bg-white/90 p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl">
                  <div className="mb-6">
                    <Search className="mx-auto h-20 w-20 text-gray-300" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-400">
                    ไม่พบบทความในหมวดหมู่นี้
                  </h3>
                  <p className="mb-6 font-light text-gray-500">
                    ลองเลือกหมวดหมู่อื่น หรือดูบทความทั้งหมด
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTag('All')}
                    className="rounded-full bg-gradient-to-r from-rose-400 to-purple-400 px-8 py-3 font-semibold text-white shadow-[0_8px_30px_rgb(251,113,133,0.3)] transition-all hover:shadow-[0_12px_40px_rgb(251,113,133,0.4)]"
                  >
                    ดูบทความทั้งหมด
                  </motion.button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </>
  );
};
