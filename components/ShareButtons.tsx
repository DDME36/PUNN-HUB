"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Check, Facebook, Twitter, Link as LinkIcon, Code } from "lucide-react";
import { SiLine } from "react-icons/si";

interface ShareButtonsProps {
    title: string;
    url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const [embedCopied, setEmbedCopied] = useState(false);
    const [showEmbed, setShowEmbed] = useState(false);
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    // Generate embed code
    const embedCode = `<iframe src="${shareUrl}" width="100%" height="600" frameborder="0" style="border: 1px solid #e5e7eb; border-radius: 12px;"></iframe>`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleCopyEmbed = async () => {
        try {
            await navigator.clipboard.writeText(embedCode);
            setEmbedCopied(true);
            setTimeout(() => setEmbedCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy embed code:', err);
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
        <div className="mt-16">
            <div className="bg-gradient-to-r from-rose-50 via-purple-50 to-blue-50 rounded-3xl p-8 text-center border border-rose-100/50">
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
                                คัดลอก
                            </>
                        )}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowEmbed(!showEmbed)}
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md flex items-center gap-2 text-sm"
                    >
                        <Code size={16} />
                        Embed
                    </motion.button>
                </div>
            </div>

            {/* Embed Code Section */}
            {showEmbed && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-200"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Code size={16} className="text-purple-500" />
                            Embed Code - วางโค้ดนี้ในเว็บของคุณ
                        </h4>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCopyEmbed}
                            className={`flex items-center gap-2 px-4 py-2 ${
                                embedCopied 
                                    ? 'bg-green-600 hover:bg-green-700' 
                                    : 'bg-gray-800 hover:bg-gray-900'
                            } text-white text-sm rounded-lg font-semibold transition-all`}
                        >
                            {embedCopied ? (
                                <>
                                    <Check size={16} />
                                    คัดลอกแล้ว!
                                </>
                            ) : (
                                <>
                                    <Code size={16} />
                                    คัดลอกโค้ด
                                </>
                            )}
                        </motion.button>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-xs font-mono leading-relaxed">
                        <code>{embedCode}</code>
                    </pre>
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-blue-800 flex items-start gap-2">
                            <span className="text-blue-500 font-bold">💡</span>
                            <span>คัดลอกโค้ดด้านบนแล้ววางในหน้า HTML ของคุณเพื่อแสดงบทความนี้แบบ iframe</span>
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
