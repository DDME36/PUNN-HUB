"use client";

import { motion } from "framer-motion";

export const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center p-8">
            <motion.div
                className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    );
};

export const SkeletonCard = () => {
    return (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-100/50 animate-pulse">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
                <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};