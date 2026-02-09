"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Github,
    Mail,
    Heart,
    Sparkles,
    Home,
    MessageCircle,
    Rss,
} from "lucide-react";

const quickLinks = [
    { name: "หน้าแรก", href: "/" },
    { name: "บทความ", href: "/blog" },
    { name: "RSS Feed", href: "/feed.xml" },
    { name: "GitHub", href: "https://github.com/DDME36" },
    { name: "เว็บส่วนตัว", href: "https://satayupongpan.site/" },
];

const projects = [
    { name: "PUNN INVESTING", href: "https://ddme36.github.io/PUNN-INVESTING/" },
    { name: "Smart AI Stock", href: "https://smartaistock.vercel.app/" },
    { name: "PurrDrop", href: "https://purrdrop.onrender.com/" },
    { name: "HEARTOPIANO", href: "https://your-heartopiano-url.com" },
];

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-700 border-t border-gray-100">
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 md:justify-items-start">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="text-center md:text-left flex flex-col items-center md:items-start"
                    >
                        <h3 className="font-display font-black text-2xl mb-3">
                            <span className="bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                                PUNN
                            </span>
                            <span className="text-gray-800"> HUB</span>
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            Knowledge Hub สำหรับนักพัฒนา
                            <br />
                            แชร์ความรู้ ไอเดีย และเทคนิค
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-2 justify-center md:justify-start">
                            <a
                                href="https://github.com/DDME36"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100"
                                aria-label="GitHub"
                            >
                                <Github size={16} className="text-gray-700" />
                            </a>
                            <a
                                href="/feed.xml"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-orange-50 transition-colors shadow-sm border border-gray-100 hover:border-orange-200"
                                aria-label="RSS Feed"
                            >
                                <Rss size={16} className="text-orange-500" />
                            </a>
                            <a
                                href="https://line.me/ti/p/~example"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100"
                                aria-label="LINE"
                            >
                                <MessageCircle size={16} className="text-gray-700" />
                            </a>
                            <a
                                href="mailto:your-email@example.com"
                                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100"
                                aria-label="Email"
                            >
                                <Mail size={16} className="text-gray-700" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="text-center md:text-left flex flex-col items-center md:items-start"
                    >
                        <h4 className="font-bold text-sm mb-3 text-gray-800 flex items-center gap-2 justify-center md:justify-start">
                            <Sparkles size={14} className="text-rose-400" />
                            ลิงก์ด่วน
                        </h4>
                        <ul className="space-y-2 flex flex-col items-center md:items-start">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-rose-500 transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <div className="w-1 h-1 bg-rose-300 rounded-full group-hover:bg-rose-400 transition-colors" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Projects */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-center md:text-left flex flex-col items-center md:items-start"
                    >
                        <h4 className="font-bold text-sm mb-3 text-gray-800 flex items-center gap-2 justify-center md:justify-start">
                            <Sparkles size={14} className="text-purple-400" />
                            โปรเจกต์
                        </h4>
                        <ul className="space-y-2 flex flex-col items-center md:items-start">
                            {projects.map((project) => (
                                <li key={project.name}>
                                    <a
                                        href={project.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-purple-500 transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <div className="w-1 h-1 bg-purple-300 rounded-full group-hover:bg-purple-400 transition-colors" />
                                        <span className="truncate">{project.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4 sm:mb-6" />

                {/* Bottom Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                    <p className="text-gray-500 text-xs flex items-center gap-2 text-center sm:text-left">
                        © {currentYear} PUNN HUB · Made with
                        <Heart size={12} className="text-rose-400 fill-rose-400" />
                        in Thailand
                    </p>

                    <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-rose-300 rounded-full" />
                            Next.js
                        </span>
                        <span className="text-gray-300">·</span>
                        <span className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-purple-300 rounded-full" />
                            Tailwind
                        </span>
                    </div>
                </div>

                {/* Back to Top Button */}
                <button
                    onClick={scrollToTop}
                    className="mt-4 sm:mt-5 mx-auto flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors text-sm font-semibold bg-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-sm border border-gray-100 hover:border-rose-200 hover:shadow-md"
                >
                    <Home size={14} />
                    <span className="hidden sm:inline">กลับสู่ด้านบน</span>
                    <span className="sm:hidden">กลับขึ้นบน</span>
                </button>
            </div>
        </footer>
    );
};
