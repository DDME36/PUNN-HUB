"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Copy, 
    Check,
    Minus,
    Plus
} from "lucide-react";
import ReactMarkdown from "react-markdown";

interface BlogPostContentProps {
    content: string;
    title: string;
}

export const BlogPostContent = ({ content, title }: BlogPostContentProps) => {
    const [fontSize, setFontSize] = useState(20);
    const [copied, setCopied] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Initialize client-side only values
    useEffect(() => {
        setIsClient(true);
    }, [title]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    // Don't render client-specific content until hydrated
    if (!isClient) {
        return (
            <div className="prose prose-lg mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 max-w-none overflow-hidden p-8 md:p-12">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        );
    }

    return (
        <>
            {/* Floating Reading Controls - Subtle */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
                className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
            >
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 space-y-3">
                    {/* Font Size Controls */}
                    <div className="flex flex-col gap-1">
                        <button
                            onClick={() => setFontSize(prev => Math.min(prev + 2, 24))}
                            aria-label="เพิ่มขนาดตัวอักษร"
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            title="Increase Font Size"
                        >
                            <Plus size={16} />
                        </button>
                        <button
                            onClick={() => setFontSize(prev => Math.max(prev - 2, 12))}
                            aria-label="ลดขนาดตัวอักษร"
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            title="Decrease Font Size"
                        >
                            <Minus size={16} />
                        </button>
                    </div>

                    {/* Share Button */}
                    <button
                        onClick={copyToClipboard}
                        aria-label="คัดลอกลิงก์"
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        title="Copy Link"
                    >
                        {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                    </button>
                </div>
            </motion.div>

            {/* Enhanced Article Content - Clean White Background */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="prose prose-lg mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 max-w-none overflow-hidden"
                style={{ fontSize: `${fontSize}px` }}
            >
                {/* Content with Enhanced Styling */}
                <div className="p-8 md:p-12">
                    <ReactMarkdown
                        components={{
                            img: ({ node, src, alt, ...props }) => {
                                if (!src || typeof src !== 'string') return null;
                                return (
                                    <figure className="my-8 relative w-full">
                                        <img 
                                            src={src}
                                            alt={alt || "รูปภาพประกอบ"}
                                            className="rounded-2xl shadow-2xl w-full h-auto object-contain hover:shadow-3xl transition-shadow duration-500 mx-auto"
                                            loading="lazy"
                                        />
                                    </figure>
                                );
                            },
                            h1: ({ node, children, ...props }) => (
                                <h1 className="text-3xl font-bold font-display mt-16 mb-8 border-l-4 border-emerald-500 pl-6 bg-gradient-to-r from-emerald-50 to-transparent py-4 rounded-r-2xl relative">
                                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-500 rounded-full"></div>
                                    {children}
                                </h1>
                            ),
                            h2: ({ node, children, ...props }) => (
                                <h2 className="text-2xl font-bold font-display mt-12 mb-6 text-gray-800 relative pl-6">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full"></div>
                                    {children}
                                </h2>
                            ),
                            h3: ({ node, children, ...props }) => (
                                <h3 className="text-xl font-bold font-display mt-10 mb-4 text-gray-800 relative pl-4">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full"></div>
                                    {children}
                                </h3>
                            ),
                            p: ({ node, children, ...props }) => {
                                // Check if paragraph contains only an image
                                const hasImage = node?.children?.some(
                                    (child: any) => child.tagName === 'img'
                                );
                                
                                // If it contains an image, return children without wrapper
                                if (hasImage) {
                                    return <>{children}</>;
                                }
                                
                                return (
                                    <p className="leading-relaxed mb-6 text-gray-700 text-center">
                                        {children}
                                    </p>
                                );
                            },
                            blockquote: ({ node, children, ...props }) => (
                                <blockquote className="border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent p-6 rounded-r-2xl my-8 italic relative">
                                    <div className="absolute -left-2 top-6 w-4 h-4 bg-blue-500 rounded-full"></div>
                                    {children}
                                </blockquote>
                            ),
                            code: ({ node, ...props }) => (
                                <code {...props} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm font-mono border" />
                            ),
                            pre: ({ node, children, ...props }) => (
                                <pre className="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto my-8 shadow-2xl border border-gray-700">
                                    {children}
                                </pre>
                            ),
                            a: ({ node, ...props }) => (
                                <a 
                                    {...props} 
                                    className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-all duration-200 relative inline-block"
                                    target="_blank" 
                                    rel="noreferrer"
                                />
                            ),
                            ul: ({ node, ...props }) => (
                                <ul {...props} className="space-y-2 my-6" />
                            ),
                            li: ({ node, children, ...props }) => (
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>{children}</div>
                                </li>
                            ),
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </motion.div>


        </>
    );
};