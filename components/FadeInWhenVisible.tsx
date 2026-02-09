"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface FadeInWhenVisibleProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    y?: number;
    className?: string;
}

const fadeInVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 20 
    },
    visible: (custom: { delay: number; duration: number; y: number }) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: custom.duration,
            delay: custom.delay,
            ease: "easeOut"
        }
    })
};

export const FadeInWhenVisible = ({ 
    children, 
    delay = 0, 
    duration = 0.5,
    y = 20,
    className 
}: FadeInWhenVisibleProps) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInVariants}
            custom={{ delay, duration, y }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
