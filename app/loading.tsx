"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-purple-50/50 to-blue-50/50 flex items-center justify-center">
            <div className="text-center">
                {/* Animated Logo */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="font-display font-black text-4xl">
                        <span className="bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                            PUNN HUB
                        </span>
                    </h1>
                </motion.div>

                {/* Loading Spinner */}
                <div className="flex items-center justify-center gap-2">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-3 h-3 bg-rose-400 rounded-full"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.2,
                        }}
                        className="w-3 h-3 bg-purple-400 rounded-full"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.4,
                        }}
                        className="w-3 h-3 bg-blue-400 rounded-full"
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 text-gray-500 text-sm"
                >
                    กำลังโหลด...
                </motion.p>
            </div>
        </div>
    );
}
