"use client";

import { motion } from "framer-motion";

interface LoadingStateProps {
    message?: string;
}

export const LoadingState = ({ message = "กำลังโหลด..." }: LoadingStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-3 border-rose-200 border-t-rose-500 rounded-full mb-6"
            />
            <p className="text-gray-500 text-lg">{message}</p>
        </div>
    );
};

export const SkeletonCard = () => {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
            <div className="flex gap-6">
                <div className="w-48 h-32 bg-gray-200 rounded-xl flex-shrink-0" />
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <div className="h-3 bg-gray-200 rounded w-24 mb-3" />
                        <div className="h-6 bg-gray-200 rounded w-full mb-2" />
                        <div className="h-6 bg-gray-200 rounded w-3/4" />
                    </div>
                    <div className="flex gap-2">
                        <div className="h-6 bg-gray-200 rounded w-16" />
                        <div className="h-6 bg-gray-200 rounded w-20" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SkeletonGrid = ({ count = 3 }: { count?: number }) => {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
};
