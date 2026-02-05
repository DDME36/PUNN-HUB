"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-purple-50/50 to-blue-50/50 flex items-center justify-center px-4">
            {/* Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-rose-200/20 to-rose-300/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-purple-300/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 text-center max-w-2xl">
                {/* 404 Animation */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <motion.h1
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="text-9xl font-black font-display bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4"
                    >
                        404
                    </motion.h1>
                </motion.div>

                {/* Content Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60"
                >
                    <div className="mb-6">
                        <Search className="w-16 h-16 text-rose-400 mx-auto" />
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 font-display">
                        ไม่พบหน้าที่คุณต้องการ
                    </h2>
                    
                    <p className="text-gray-600 mb-8 text-lg">
                        หน้าที่คุณกำลังมองหาอาจถูกย้าย ลบ หรือไม่เคยมีอยู่จริง
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-400 to-purple-400 text-white px-8 py-4 rounded-full font-bold shadow-[0_8px_30px_rgb(251,113,133,0.3)] hover:shadow-[0_12px_40px_rgb(251,113,133,0.4)] transition-all hover:scale-105"
                        >
                            <Home size={20} />
                            กลับหน้าแรก
                        </Link>
                        
                        <Link
                            href="/blog"
                            className="inline-flex items-center justify-center gap-2 bg-white/90 backdrop-blur-md border border-gray-200 hover:border-rose-200 text-gray-700 hover:text-rose-500 px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-sm"
                        >
                            <Search size={20} />
                            ดูบทความ
                        </Link>
                    </div>
                </motion.div>

                {/* Quick Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 text-sm text-gray-500"
                >
                    <p className="mb-3">หรือลองดูหน้าเหล่านี้:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/"
                            className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-rose-50 hover:text-rose-600 transition-colors border border-gray-100"
                        >
                            หน้าแรก
                        </Link>
                        <Link
                            href="/blog"
                            className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-rose-50 hover:text-rose-600 transition-colors border border-gray-100"
                        >
                            บทความ
                        </Link>
                        <a
                            href="https://github.com/DDME36"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-rose-50 hover:text-rose-600 transition-colors border border-gray-100"
                        >
                            GitHub
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
