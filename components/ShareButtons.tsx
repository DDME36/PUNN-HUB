"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Check, Facebook, Link as LinkIcon } from "lucide-react";
import { SiLine, SiDiscord } from "react-icons/si";

interface ShareButtonsProps {
    title: string;
    url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const [discordCopied, setDiscordCopied] = useState(false);
    
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const discordUrl = shareUrl + '?v=1'; // Discord ต้องการ query param เพื่อ refresh embed

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleCopyDiscord = async () => {
        try {
            await navigator.clipboard.writeText(discordUrl);
            setDiscordCopied(true);
            setTimeout(() => setDiscordCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleShare = (platform: string) => {
        const encodedUrl = encodeURIComponent(shareUrl);
        const encodedTitle = encodeURIComponent(title);

        const urls: Record<string, string> = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
        };

        if (urls[platform]) {
            window.open(urls[platform], '_blank', 'width=600,height=400');
        }
    };

    return (
        <div className="mt-16 bg-gradient-to-r from-rose-50 via-purple-50 to-blue-50 rounded-3xl p-6 sm:p-8 text-center border border-rose-100/50">
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                    <Share2 size={18} className="text-white sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">แชร์บทความนี้</h3>
            </div>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">ช่วยแชร์ความรู้ให้เพื่อนๆ ได้อ่านกัน</p>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-3">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare('facebook')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-3 rounded-xl font-medium transition-all shadow-md flex items-center justify-center gap-2 text-sm"
                >
                    <Facebook size={18} />
                    Facebook
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare('line')}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-3 rounded-xl font-medium transition-all shadow-md flex items-center justify-center gap-2 text-sm"
                >
                    <SiLine size={18} />
                    LINE
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyDiscord}
                    className={`${
                        discordCopied 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-[#5865F2] hover:bg-[#4752C4]'
                    } text-white px-4 sm:px-6 py-3 rounded-xl font-medium transition-all shadow-md flex items-center justify-center gap-2 text-sm`}
                >
                    {discordCopied ? (
                        <>
                            <Check size={18} />
                            คัดลอกแล้ว!
                        </>
                    ) : (
                        <>
                            <SiDiscord size={18} />
                            Discord
                        </>
                    )}
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyLink}
                    className={`${
                        copied 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-gray-700 hover:bg-gray-800'
                    } text-white px-4 sm:px-6 py-3 rounded-xl font-medium transition-all shadow-md flex items-center justify-center gap-2 text-sm col-span-2 sm:col-span-1`}
                >
                    {copied ? (
                        <>
                            <Check size={18} />
                            คัดลอกแล้ว!
                        </>
                    ) : (
                        <>
                            <LinkIcon size={18} />
                            คัดลอกลิงก์
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
}
