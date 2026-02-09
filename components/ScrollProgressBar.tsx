"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 origin-left z-50"
            style={{ scaleX }}
        />
    );
};
