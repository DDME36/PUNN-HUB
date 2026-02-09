"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

export default function BlogLoading() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            {/* Hero Skeleton */}
            <div className="relative bg-gradient-to-br from-rose-50/50 via-purple-50/50 to-blue-50/50 py-16 sm:py-20">
                <div className="relative max-w-5xl mx-auto px-6">
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="text-center sm:text-left flex-1">
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="h-8 w-32 bg-gray-200 rounded-full mb-4 mx-auto sm:mx-0"
                                />
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                                    className="h-12 w-48 bg-gray-200 rounded-lg mb-3 mx-auto sm:mx-0"
                                />
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                                    className="h-6 w-64 bg-gray-200 rounded-lg mx-auto sm:mx-0"
                                />
                            </div>
                            <div className="flex items-center gap-6">
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                                    className="w-24 h-24 bg-gray-200 rounded-2xl"
                                />
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                                    className="w-24 h-24 bg-gray-200 rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-white/60"
                        >
                            <div className="h-48 bg-gray-200 rounded-xl mb-4" />
                            <div className="h-6 w-3/4 bg-gray-200 rounded-lg mb-3" />
                            <div className="h-4 w-1/2 bg-gray-200 rounded-lg" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
