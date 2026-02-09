"use client";

import { motion } from "framer-motion";

const skills = [
    "React", "Next.js", "TypeScript", "Node.js", "Python", 
    "AI/ML", "Web3", "Mobile Apps", "UI/UX", "DevOps"
];

export const Marquee = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative w-full overflow-hidden bg-gradient-to-r from-rose-50 via-purple-50 to-blue-50 py-6 -mt-12 mb-8 border-y border-rose-100/50 shadow-lg"
        >
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251,113,133,0.1) 0%, transparent 50%),
                                     radial-gradient(circle at 80% 50%, rgba(196,181,253,0.1) 0%, transparent 50%)`
                }}></div>
            </div>

            {/* Top marquee - Seamless loop */}
            <div className="relative flex whitespace-nowrap mb-3 overflow-hidden">
                <motion.div
                    className="flex whitespace-nowrap text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-display tracking-wide"
                    animate={{ x: [0, -1920] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {/* Duplicate content 2 ครั้งเพื่อให้วนลูปไม่มีรอยต่อ */}
                    {[...Array(2)].map((_, groupIndex) => (
                        <div key={groupIndex} className="flex">
                            {[...Array(6)].map((_, i) => (
                                <span key={i} className="mx-6 sm:mx-8 md:mx-12 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                                    โปรเจกต์ • ไอเดีย • ความรู้ • แชร์ประสบการณ์
                                </span>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Skills marquee - Seamless loop (opposite direction) */}
            <div className="relative flex whitespace-nowrap overflow-hidden">
                <motion.div
                    className="flex whitespace-nowrap text-sm sm:text-base font-semibold tracking-wide"
                    animate={{ x: [-1600, 0] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear",
                        },
                    }}
                >
                    {/* Duplicate content 2 ครั้งเพื่อให้วนลูปไม่มีรอยต่อ */}
                    {[...Array(2)].map((_, groupIndex) => (
                        <div key={groupIndex} className="flex">
                            {[...Array(20)].map((_, i) => (
                                <span key={i} className="mx-6 sm:mx-8 text-gray-500">
                                    {skills[i % skills.length]}
                                </span>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-rose-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none"></div>
        </motion.div>
    );
};
