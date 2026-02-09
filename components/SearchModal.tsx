"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import Fuse from "fuse.js";

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
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Post[]>([]);

    // Fuse.js configuration - memoized to prevent recreation
    const fuse = useMemo(() => new Fuse(posts, {
        keys: ["title", "tags"],
        threshold: 0.3,
        includeScore: true,
    }), [posts]);

    // Keyboard shortcut (Ctrl/Cmd + K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Search function
    useEffect(() => {
        if (query.trim() === "") {
            setResults([]);
            return;
        }

        const searchResults = fuse.search(query);
        setResults(searchResults.map((result) => result.item));
    }, [query, fuse]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            {/* Search Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-600 rounded-full text-sm hover:border-purple-200 hover:text-purple-600 transition-all"
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
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
                        >
                            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                                {/* Search Input */}
                                <div className="flex items-center gap-3 p-6 border-b border-gray-200">
                                    <Search size={20} className="text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="ค้นหาบทความ..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        autoFocus
                                        className="flex-1 text-lg outline-none text-gray-800 placeholder-gray-400"
                                    />
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        <X size={18} className="text-gray-500" />
                                    </button>
                                </div>

                                {/* Results */}
                                <div className="max-h-96 overflow-y-auto p-4">
                                    {query.trim() === "" ? (
                                        <div className="text-center py-12 text-gray-400">
                                            <Search size={48} className="mx-auto mb-3 opacity-30" />
                                            <p className="text-sm">พิมพ์เพื่อค้นหาบทความ</p>
                                            <p className="text-xs mt-1">ลองค้นหาจากชื่อหรือ tags</p>
                                        </div>
                                    ) : results.length === 0 ? (
                                        <div className="text-center py-12 text-gray-400">
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
                                                    className="block p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all border border-transparent hover:border-purple-100"
                                                >
                                                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">
                                                        {post.title}
                                                    </h3>
                                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar size={12} />
                                                            <span>
                                                                {new Date(post.date).toLocaleDateString("th-TH", {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                })}
                                                            </span>
                                                        </div>
                                                        {post.tags.length > 0 && (
                                                            <div className="flex items-center gap-1">
                                                                <Tag size={12} />
                                                                <span className="line-clamp-1">
                                                                    {post.tags.slice(0, 2).join(", ")}
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
                                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                                    <span>พบ {results.length} บทความ</span>
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-2 py-0.5 bg-white border border-gray-200 rounded">ESC</kbd>
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
