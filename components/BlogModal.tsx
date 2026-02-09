"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Calendar, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

interface BlogModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: {
        id: string;
        title: string;
        slug: string;
        tags: string[];
        date: string;
        cover: string | null;
        content?: string;
    } | null;
}

// Helper function to calculate reading time - removed as requested
// const calculateReadingTime = (title: string): number => {
//     const hash = title.split('').reduce((a, b) => {
//         a = ((a << 5) - a) + b.charCodeAt(0);
//         return a & a;
//     }, 0);
//     return Math.abs(hash % 8) + 3; // 3-10 minutes
// };

export const BlogModal = ({ isOpen, onClose, post }: BlogModalProps) => {
    const [content, setContent] = useState<string>("");
    const [isLoadingContent, setIsLoadingContent] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    
    // Cache for loaded content
    const contentCacheRef = useRef<Map<string, string>>(new Map());

    useEffect(() => {
        if (post && isOpen) {
            // Check cache first
            const cached = contentCacheRef.current.get(post.slug);
            if (cached) {
                setContent(cached);
                return;
            }

            // Load content if not already provided
            if (!post.content) {
                setIsLoadingContent(true);
                fetch(`/api/posts/${post.slug}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.content) {
                            setContent(data.content);
                            // Cache the content
                            contentCacheRef.current.set(post.slug, data.content);
                        }
                    })
                    .catch(err => {
                        console.error("Failed to load content:", err);
                        setContent("ไม่สามารถโหลดเนื้อหาได้ในขณะนี้");
                    })
                    .finally(() => {
                        setIsLoadingContent(false);
                    });
            } else {
                setContent(post.content);
                contentCacheRef.current.set(post.slug, post.content);
            }
        }
    }, [post, isOpen]);

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

    // Focus trap and keyboard handling
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }

            // Focus trap
            if (e.key === 'Tab' && modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0] as HTMLElement;
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        closeButtonRef.current?.focus();

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!post) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-md z-50"
                        aria-hidden="true"
                    />

                    {/* Modal - Soft UI Floating Card */}
                    <motion.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ 
                            duration: 0.4, 
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className="fixed inset-6 md:inset-12 lg:inset-20 bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.1)] z-50 overflow-hidden flex flex-col border border-white/40"
                        style={{ maxHeight: 'calc(100vh - 3rem)' }}
                    >
                        {/* Minimal Header - Soft UI */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100/30 bg-gradient-to-r from-rose-50/30 via-purple-50/30 to-blue-50/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-[0_4px_15px_rgb(251,113,133,0.2)]">
                                    <BookOpen className="text-white" size={18} />
                                </div>
                                <div>
                                    <div className="text-xs text-rose-400 font-semibold tracking-wide">PUNN HUB</div>
                                    <div className="text-xs text-gray-400 font-light">Knowledge Article</div>
                                </div>
                            </div>

                            <motion.button
                                ref={closeButtonRef}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                                aria-label="ปิดบทความ"
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-red-50 hover:to-red-100 hover:text-red-500 transition-all duration-200 flex items-center justify-center shadow-[0_4px_15px_rgb(0,0,0,0.04)] border border-gray-100"
                            >
                                <X size={18} />
                            </motion.button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                            <div className="max-w-4xl mx-auto p-8 md:p-12">
                                {/* Cover Image - Subtle Fade */}
                                {post.cover && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="mb-12 -mx-8 md:-mx-12"
                                    >
                                        <div className="relative overflow-hidden rounded-2xl h-64 md:h-80">
                                            <Image
                                                src={post.cover}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Title - Subtle Fade */}
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="text-center mb-8"
                                >
                                    <h1 id="modal-title" className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6 text-gray-900 leading-tight">
                                        {post.title}
                                    </h1>

                                    {/* Meta Info - Simple Fade */}
                                    <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            <span className="text-sm">
                                                {new Date(post.date).toLocaleDateString("th-TH", {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Tags - Soft Pills */}
                                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                                        {post.tags.map((tag) => (
                                            <span 
                                                key={tag}
                                                className="bg-gradient-to-r from-rose-50 to-purple-50 text-rose-600 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 border border-rose-100/50 shadow-[0_2px_10px_rgb(251,113,133,0.08)]"
                                            >
                                                <Tag size={12} />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Divider - Soft Gradient */}
                                <div className="w-32 h-1 bg-gradient-to-r from-rose-400/50 via-purple-400/50 to-blue-400/50 rounded-full mx-auto mb-12 shadow-[0_2px_10px_rgb(251,113,133,0.2)]"></div>

                                {/* Article Content */}
                                <div className="prose prose-lg prose-gray max-w-none">
                                    {isLoadingContent ? (
                                        <div className="text-center py-20">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-12 h-12 border-3 border-emerald-200 border-t-emerald-500 rounded-full mx-auto mb-6"
                                            ></motion.div>
                                            <p className="text-gray-500 text-lg">กำลังโหลดเนื้อหา...</p>
                                        </div>
                                    ) : content ? (
                                        <ReactMarkdown
                                            components={{
                                                h1: ({ children }) => (
                                                    <motion.h1 
                                                        initial={{ opacity: 0, y: 12 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true, margin: "-40px" }}
                                                        transition={{ duration: 0.45, ease: "easeOut" }}
                                                        className="text-3xl font-bold font-display mt-16 mb-8 text-gray-900 relative"
                                                    >
                                                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-emerald-400 to-blue-500 rounded-full"></div>
                                                        {children}
                                                    </motion.h1>
                                                ),
                                                h2: ({ children }) => (
                                                    <motion.h2 
                                                        initial={{ opacity: 0, y: 10 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true, margin: "-40px" }}
                                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                                        className="text-2xl font-bold font-display mt-12 mb-6 text-gray-800"
                                                    >
                                                        {children}
                                                    </motion.h2>
                                                ),
                                                h3: ({ children }) => (
                                                    <motion.h3 
                                                        initial={{ opacity: 0, y: 8 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true, margin: "-40px" }}
                                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                                        className="text-xl font-bold font-display mt-8 mb-4 text-gray-800"
                                                    >
                                                        {children}
                                                    </motion.h3>
                                                ),
                                                p: ({ children, node }) => {
                                                    // Check if paragraph contains only an image
                                                    const hasImage = node?.children?.some(
                                                        (child: any) => child.tagName === 'img'
                                                    );
                                                    
                                                    // If it contains an image, return children without wrapper
                                                    if (hasImage) {
                                                        return <>{children}</>;
                                                    }
                                                    
                                                    return (
                                                        <motion.p 
                                                            initial={{ opacity: 0, y: 8 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true, margin: "-40px" }}
                                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                                            className="leading-relaxed mb-6 text-gray-700 text-lg"
                                                        >
                                                            {children}
                                                        </motion.p>
                                                    );
                                                },
                                                blockquote: ({ children }) => (
                                                    <motion.blockquote 
                                                        initial={{ opacity: 0, x: -12 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true, margin: "-40px" }}
                                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                                        className="border-l-4 border-blue-400 bg-gradient-to-r from-blue-50/50 to-transparent p-6 rounded-r-2xl my-8 italic relative"
                                                    >
                                                        <div className="absolute -left-2 top-6 w-3 h-3 bg-blue-400 rounded-full"></div>
                                                        {children}
                                                    </motion.blockquote>
                                                ),
                                                code: ({ children }) => (
                                                    <code className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm font-mono border">
                                                        {children}
                                                    </code>
                                                ),
                                                pre: ({ children }) => (
                                                    <motion.pre 
                                                        initial={{ opacity: 0, y: 12 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true, margin: "-40px" }}
                                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                                        className="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto my-8 shadow-xl border border-gray-700"
                                                    >
                                                        {children}
                                                    </motion.pre>
                                                ),
                                                ul: ({ children }) => (
                                                    <ul className="space-y-3 my-6">{children}</ul>
                                                ),
                                                li: ({ children }) => (
                                                    <motion.li 
                                                        initial={{ opacity: 0, x: -8 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true, margin: "-40px" }}
                                                        transition={{ duration: 0.35, ease: "easeOut" }}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                                                        <div className="text-gray-700">{children}</div>
                                                    </motion.li>
                                                ),
                                                img: ({ src, alt }) => {
                                                    if (!src || typeof src !== 'string') return null;
                                                    return (
                                                        <motion.figure
                                                            initial={{ opacity: 0, y: 12 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true, margin: "-40px" }}
                                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                                            className="my-8 group"
                                                        >
                                                            <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500 h-96">
                                                                <Image 
                                                                    src={src} 
                                                                    alt={alt || "รูปภาพประกอบ"}
                                                                    fill
                                                                    className="object-contain group-hover:scale-105 transition-transform duration-700" 
                                                                    sizes="(max-width: 768px) 100vw, 800px"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                            </div>
                                                            {alt && (
                                                                <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
                                                                    {alt}
                                                                </figcaption>
                                                            )}
                                                        </motion.figure>
                                                    );
                                                },
                                            }}
                                        >
                                            {content}
                                        </ReactMarkdown>
                                    ) : (
                                        <div className="text-center py-20">
                                            <BookOpen size={64} className="text-gray-300 mx-auto mb-6" />
                                            <p className="text-gray-500 text-lg">ไม่สามารถโหลดเนื้อหาได้</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};