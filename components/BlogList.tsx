"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup, Variants } from "framer-motion";
import { Card } from "./Card";
import { BookOpen, Calendar, Tag, X, ArrowUpRight, AlertCircle, FileText, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
            delayChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 }
    }
};

export const BlogList = ({ posts, error }: BlogListProps) => {
    const [selectedTag, setSelectedTag] = useState<string>('All');

    // Extract all unique tags
    const allTags = ['All', ...Array.from(new Set(posts.flatMap(post => post.tags)))];

    // Filter posts based on selected tag
    const filteredPosts = selectedTag === 'All'
        ? posts
        : posts.filter(post => post.tags.includes(selectedTag));

    return (
        <>
            {/* Hero Section - Soft UI Card */}
            <div className="relative bg-gradient-to-br from-rose-50/50 via-purple-50/50 to-blue-50/50 py-16 sm:py-20">
                {/* Soft Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(253,164,175,0.15) 0%, transparent 50%), 
                                         radial-gradient(circle at 75% 75%, rgba(196,181,253,0.15) 0%, transparent 50%)`
                    }}></div>
                </div>

                {/* Centered Card Container */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="relative max-w-5xl mx-auto px-6"
                >
                    {/* Floating Card */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            {/* Left Side - Main Content */}
                            <div className="text-center sm:text-left">
                                <motion.div
                                    variants={itemVariants}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-50 to-purple-50 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-rose-100/50"
                                >
                                    <BookOpen size={14} className="text-rose-400" />
                                    <span className="text-gray-600">Knowledge</span>
                                    <span className="text-rose-400">Hub</span>
                                </motion.div>

                                <motion.h1
                                    variants={itemVariants}
                                    className="text-4xl sm:text-5xl font-black font-display text-gray-800 mb-3 tracking-tight"
                                >
                                    บทความ
                                </motion.h1>

                                <motion.p
                                    variants={itemVariants}
                                    className="text-gray-500 text-base font-light"
                                >
                                    แชร์ความรู้และประสบการณ์ด้านเทคโนโลยี
                                </motion.p>
                            </div>

                            {/* Right Side - Stats Cards */}
                            <motion.div
                                variants={itemVariants}
                                className="flex items-center gap-6"
                            >
                                {/* Stat Card 1 */}
                                <div className="text-center bg-gradient-to-br from-rose-50 to-rose-100/50 px-6 py-4 rounded-2xl shadow-[0_4px_20px_rgb(251,113,133,0.1)] border border-rose-100/50">
                                    <div className="text-3xl font-black text-rose-500 mb-1">{posts.length}</div>
                                    <div className="text-xs text-gray-600 font-medium">บทความ</div>
                                </div>

                                {/* Stat Card 2 */}
                                <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100/50 px-6 py-4 rounded-2xl shadow-[0_4px_20px_rgb(192,132,252,0.1)] border border-purple-100/50">
                                    <div className="text-3xl font-black text-purple-500 mb-1">{allTags.length - 1}</div>
                                    <div className="text-xs text-gray-600 font-medium">หมวดหมู่</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-12">
                {error ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto"
                    >
                        {/* Error Card - Soft UI */}
                        <div className="p-8 bg-white/90 backdrop-blur-xl text-red-600 rounded-3xl shadow-[0_8px_30px_rgb(239,68,68,0.1)] border border-red-100/50 text-center">
                            <div className="mb-4">
                                <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
                            </div>
                            <h3 className="font-bold text-xl mb-2 text-gray-800">ไม่สามารถโหลดบทความได้</h3>
                            <p className="text-sm text-gray-500">{error}</p>
                        </div>
                    </motion.div>
                ) : posts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        {/* Empty State Card */}
                        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
                            <div className="mb-6">
                                <FileText className="w-20 h-20 text-gray-300 mx-auto" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-400 mb-4">กำลังเตรียมเนื้อหา</h3>
                            <p className="text-gray-500 font-light">บทความและความรู้ใหม่ๆ กำลังจะมาเร็วๆ นี้</p>
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
                            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-lg font-bold text-gray-800">
                                            {filteredPosts.length} บทความ
                                            {selectedTag !== 'All' && (
                                                <span className="text-rose-400 text-base ml-2">· {selectedTag}</span>
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
                                            className="flex items-center gap-2 bg-gradient-to-r from-rose-50 to-purple-50 hover:from-rose-100 hover:to-purple-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all border border-rose-100/50"
                                        >
                                            <X size={14} />
                                            ล้าง
                                        </motion.button>
                                    )}
                                </div>

                                {/* Scrollable Filter Pills */}
                                <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
                                    <div className="flex gap-2 min-w-max">
                                        {allTags.map((tag, index) => (
                                            <motion.button
                                                key={tag}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 + index * 0.03 }}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setSelectedTag(tag)}
                                                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                                                    selectedTag === tag
                                                        ? 'bg-gradient-to-r from-rose-400 to-purple-400 text-white shadow-[0_4px_20px_rgb(251,113,133,0.3)]'
                                                        : 'bg-white text-gray-600 hover:bg-gradient-to-r hover:from-rose-50 hover:to-purple-50 shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100'
                                                }`}
                                            >
                                                {tag}
                                                {tag !== 'All' && (
                                                    <span className={`ml-2 text-xs ${
                                                        selectedTag === tag
                                                            ? 'text-white/80'
                                                            : 'text-gray-400'
                                                    }`}>
                                                        {posts.filter(post => post.tags.includes(tag)).length}
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
                                        transition: { staggerChildren: 0.08 }
                                    }
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
                                                layout: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                                            }}
                                        >
                                            <Link href={`/blog/${post.slug}`}>
                                                <motion.div
                                                    whileHover={{
                                                        y: -4,
                                                        transition: {
                                                            type: "spring",
                                                            stiffness: 400,
                                                            damping: 25
                                                        }
                                                    }}
                                                    className="bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-white/60 transition-all duration-300 cursor-pointer group"
                                                >
                                                    {/* Cover Image with Gradient Fade */}
                                                    <div className="relative w-full h-56 overflow-visible -mb-6 -z-10">
                                                        {post.cover ? (
                                                            <>
                                                                <Image
                                                                    src={post.cover}
                                                                    alt={post.title}
                                                                    fill
                                                                    priority
                                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                                    style={{ 
                                                                        objectPosition: 'center 35%',
                                                                        maskImage: 'linear-gradient(to bottom, black 30%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.2) 85%, transparent 100%)',
                                                                        WebkitMaskImage: 'linear-gradient(to bottom, black 30%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.2) 85%, transparent 100%)'
                                                                    }}
                                                                    sizes="(max-width: 768px) 100vw, 896px"
                                                                    onError={(e) => {
                                                                        const target = e.target as HTMLImageElement;
                                                                        target.style.display = 'none';
                                                                    }}
                                                                />
                                                                {/* Subtle Gradient Fade Overlay - ไล่เฉพาะด้านล่าง */}
                                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% via-white/20 to-white/40 pointer-events-none"></div>
                                                            </>
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-100/80 via-purple-100/80 to-blue-100/80">
                                                                <BookOpen size={64} className="text-rose-300" />
                                                            </div>
                                                        )}

                                                        {/* Arrow Icon - Top Right */}
                                                        <div className="absolute top-4 right-4">
                                                            <motion.div
                                                                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-700 group-hover:bg-gradient-to-br group-hover:from-rose-400 group-hover:to-purple-400 group-hover:text-white transition-all shadow-lg"
                                                                whileHover={{ scale: 1.1, rotate: 45 }}
                                                            >
                                                                <ArrowUpRight size={18} />
                                                            </motion.div>
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="p-6 relative z-10">
                                                        {/* Date */}
                                                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-medium">
                                                            <Calendar size={12} />
                                                            <span suppressHydrationWarning>
                                                                {new Date(post.date).toLocaleDateString("th-TH", {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}
                                                            </span>
                                                        </div>

                                                        {/* Title */}
                                                        <h2 className="text-xl font-bold font-display mb-3 line-clamp-2 group-hover:text-rose-400 transition-colors text-gray-800 leading-snug">
                                                            {post.title}
                                                        </h2>

                                                        {/* Tags */}
                                                        <div className="flex flex-wrap gap-2">
                                                            {post.tags.slice(0, 5).map((tag: string) => (
                                                                <span
                                                                    key={tag}
                                                                    className="bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-100 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                            {post.tags.length > 5 && (
                                                                <span className="bg-gray-50 text-gray-400 px-3 py-1.5 rounded-lg text-xs border border-gray-100">
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
                                className="text-center py-12"
                            >
                                <div className="max-w-md mx-auto bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
                                    <div className="mb-6">
                                        <Search className="w-20 h-20 text-gray-300 mx-auto" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-400 mb-4">ไม่พบบทความในหมวดหมู่นี้</h3>
                                    <p className="text-gray-500 mb-6 font-light">ลองเลือกหมวดหมู่อื่น หรือดูบทความทั้งหมด</p>
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedTag('All')}
                                        className="bg-gradient-to-r from-rose-400 to-purple-400 text-white px-8 py-3 rounded-full font-semibold shadow-[0_8px_30px_rgb(251,113,133,0.3)] hover:shadow-[0_12px_40px_rgb(251,113,133,0.4)] transition-all"
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