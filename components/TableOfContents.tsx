"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "lucide-react";

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
    const [activeId, setActiveId] = useState<string>("");
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
            { rootMargin: "-100px 0px -80% 0px" }
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
                behavior: "smooth"
            });
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed left-4 bottom-20 lg:hidden z-40 w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 text-white rounded-full shadow-lg flex items-center justify-center"
            >
                {isOpen ? <X size={20} /> : <List size={20} />}
            </motion.button>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* TOC Panel */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                    opacity: 1, 
                    x: 0,
                    ...(isOpen ? {} : { x: -20, opacity: 0 })
                }}
                className={`fixed left-6 top-32 z-40 ${isOpen ? 'block' : 'hidden'} lg:block`}
            >
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 p-6 max-w-xs max-h-[calc(100vh-200px)] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                        <List size={18} className="text-purple-500" />
                        <h3 className="font-bold text-gray-800">สารบัญ</h3>
                    </div>
                    <nav>
                        <ul className="space-y-2">
                            {headings.map((heading) => (
                                <li
                                    key={heading.id}
                                    style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                                >
                                    <button
                                        onClick={() => scrollToHeading(heading.id)}
                                        className={`text-left text-sm transition-all hover:text-purple-600 w-full ${
                                            activeId === heading.id
                                                ? "text-purple-600 font-semibold"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        <span className="flex items-start gap-2">
                                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                                activeId === heading.id
                                                    ? "bg-purple-600"
                                                    : "bg-gray-400"
                                            }`} />
                                            <span className="line-clamp-2">{heading.text}</span>
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </motion.div>
        </>
    );
};
