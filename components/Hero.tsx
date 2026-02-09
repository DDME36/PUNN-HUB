"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { TypewriterText } from "./TypewriterText";
import { GradientText } from "./GradientText";

export const Hero = () => {
    const [animationKey, setAnimationKey] = useState(0);

    // Random animations
    const animations = [
        // Wave
        { y: [0, -5, 0, -3, 0] },
        // Bounce
        { scale: [1, 1.1, 0.95, 1.05, 1] },
        // Shake
        { x: [0, -3, 3, -3, 3, 0] },
        // Rotate wiggle
        { rotate: [0, -5, 5, -3, 3, 0] },
        // Scale pulse
        { scale: [1, 1.15, 1] }
    ];

    const animationTransition = {
        duration: 0.5,
        ease: "easeInOut" as const
    };

    useEffect(() => {
        // Random animation every 5-10 seconds
        const triggerRandomAnimation = () => {
            const randomDelay = Math.random() * 5000 + 5000; // 5-10 seconds
            setTimeout(() => {
                setAnimationKey(prev => prev + 1);
                triggerRandomAnimation();
            }, randomDelay);
        };

        triggerRandomAnimation();
    }, []);

    const currentAnimation = animations[animationKey % animations.length];

    return (
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50/50 via-purple-50/50 to-blue-50/50 py-10">
            {/* Soft Floating Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-rose-200/20 to-rose-300/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-purple-300/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-200/15 to-blue-300/10 rounded-full blur-3xl" />
            </div>

            {/* Centered Content */}
            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                {/* Floating Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-medium mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/60"
                >
                    <Sparkles size={16} className="text-rose-400" />
                    <span className="text-gray-600">Welcome to</span>
                    <motion.a
                        key={animationKey}
                        href="/"
                        initial={false}
                        animate={currentAnimation}
                        transition={animationTransition}
                        whileTap={{ scale: 0.95 }}
                        className="font-bold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent cursor-pointer inline-block"
                    >
                        PUNN HUB
                    </motion.a>
                </motion.div>

                {/* Main Heading with Typewriter */}
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-black font-display mb-5 text-gray-800 leading-[1.1] tracking-tight"
                >
                    <span className="block mb-2">
                        <TypewriterText 
                            texts={["Knowledge Hub", "แหล่งความรู้", "Tech Blog", "Developer Hub"]}
                            typingSpeed={150}
                            deletingSpeed={100}
                            delayBetween={3000}
                            className="inline-block"
                        />
                    </span>
                    <GradientText className="block">
                        สำหรับนักพัฒนา
                    </GradientText>
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto mb-7 leading-relaxed font-light"
                >
                    แหล่งรวมความรู้ ไอเดีย และเทคนิคต่างๆ
                    <br className="hidden sm:block" />
                    สำหรับการพัฒนาเว็บไซต์และเทคโนโลยี
                </motion.p>

                {/* Action Buttons */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
                >
                    <motion.a
                        href="/blog"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="group px-8 py-4 bg-gradient-to-br from-rose-400 to-purple-400 text-white rounded-2xl font-semibold shadow-[0_8px_30px_rgb(251,113,133,0.3)] hover:shadow-[0_12px_40px_rgb(251,113,133,0.4)] transition-all text-center"
                    >
                        <span className="flex items-center justify-center gap-2">
                            อ่านบทความ
                            <motion.svg 
                                className="w-4 h-4" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                                animate={{ x: [0, 3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </motion.svg>
                        </span>
                    </motion.a>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            document.getElementById('projects')?.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }}
                        className="px-8 py-4 bg-white/90 backdrop-blur-md text-gray-700 rounded-2xl font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all border border-white/60"
                    >
                        ดูโปรเจกต์
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};
