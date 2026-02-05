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
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <BentoGrid posts={posts} />
        </motion.div>
    );
};