"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BentoGrid } from "./BentoGrid";

interface Post {
    id: string;
    title: string;
    slug: string;
    tags: string[];
    date: string;
    cover: string | null;
}

interface EnhancedBentoGridProps {
    posts: Post[];
}

export const EnhancedBentoGrid = ({ posts }: EnhancedBentoGridProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            <BentoGrid posts={posts} />
        </motion.div>
    );
};