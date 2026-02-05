"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Check, Facebook, Twitter, Link as LinkIcon } from "lucide-react";
import { SiLine } from "react-icons/si";

interface ShareButtonsProps {
    title: string;
    url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleShare = (platform: string) => {
        const encodedUrl = encodeURIComponent(shareUrl);
        const encodedTitle = encodeURIComponent(title);

        const urls: Record<string, string> = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
        };

        if (urls[platform]) {
            window.open(urls[platform], '_blank', 'width=600,height=400');
        }
    };

    return (
        <div className="mt-16 bg-gradient-to-r from-rose-50 via-purple-50 to-blue-50 rounded-3xl p-8 text-center border border-rose-100/50">
            <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                    <Share2 size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">แชร์บทความนี้</h3>
            </div>
            <p className="text-gray-600 mb-8 text-base">ช่วยแชร์ความรู้ให้เพื่อนๆ ได้อ่านกัน</p>
            <div className="flex justify-center gap-3 flex-wrap">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare('facebook')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md flex items-center gap-2 text-sm"
                >
                    <Facebook size={16} />
                    Facebook
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare('line')}
                    className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md flex items-center gap-2 text-sm"
                >
                    <SiLine size={16} />
                    LINE
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare('twitter')}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md flex items-center gap-2 text-sm"
                >
                    <Twitter size={16} />
                    Twitter
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyLink}
                    className={`${
                        copied 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-gray-700 hover:bg-gray-800'
                    } text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md flex items-center gap-2 text-sm`}
                >
                    {copied ? (
                        <>
                            <Check size={16} />
                            คัดลอกแล้ว!
                        </>
                    ) : (
                        <>
                            <LinkIcon size={16} />
                            คัดลอกลิงก์
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
}
