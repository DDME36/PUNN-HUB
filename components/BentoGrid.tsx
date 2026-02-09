"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    Database,
    Share2,
    Target,
    Code,
    User,
    ArrowUpRight,
    BookOpen,
    MessageCircle,
    Ticket,
    Bell,
    Music,
} from "lucide-react";
import { Card } from "./Card";
import Link from "next/link";

interface Post {
    id: string;
    title: string;
    slug: string;
    tags: string[];
    date: string;
    cover: string | null;
    content?: string;
}

interface BentoGridProps {
    posts: Post[];
}

export const BentoGrid = ({ posts }: BentoGridProps) => {
    return (
        <>
            <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 auto-rows-[180px]">
            {/* PUNN-INVESTING - Premium Flagship */}
            <Card
                href="https://ddme36.github.io/PUNN-INVESTING/"
                BgIcon={TrendingUp}
                className="col-span-2 md:col-span-2 lg:col-span-2 row-span-2 !bg-gradient-to-br from-emerald-500 to-teal-600 !text-white !border-none shadow-[0_8px_30px_rgba(16,185,129,0.25)]"
                delay={0.1}
            >
                <div className="flex flex-col h-full justify-between">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-emerald-100" />
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/30">
                                Flagship
                            </span>
                        </div>
                        <motion.div
                            whileHover={{ rotate: 45 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <ArrowUpRight className="text-emerald-100" size={18} />
                        </motion.div>
                    </div>
                    <div>
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold font-display mb-2">
                            PUNN INVESTING
                        </h2>
                        <p className="text-emerald-50 text-sm leading-relaxed">
                            แพลตฟอร์มแนะนำการลงทุนหุ้นสหรัฐฯ
                            ด้วยข้อมูลเชิงลึกและการวิเคราะห์ที่แม่นยำ
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                            <span className="px-2.5 py-1 bg-white/15 backdrop-blur-sm rounded-lg text-xs font-medium border border-white/25">
                                Stock Analysis
                            </span>
                            <span className="px-2.5 py-1 bg-white/15 backdrop-blur-sm rounded-lg text-xs font-medium border border-white/25">
                                Market Trends
                            </span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Founder */}
            <Card
                href="https://satayupongpan.site/"
                BgIcon={User}
                className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2 !bg-gradient-to-br from-gray-800 to-gray-900 !text-white !border-none shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
                delay={0.2}
            >
                <div className="flex flex-col h-full items-center justify-between text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full mb-3 flex items-center justify-center font-display text-lg font-bold text-gray-300 relative z-20 shadow-inner">
                        ME
                    </div>
                    <div>
                        <h3 className="text-sm font-bold font-display uppercase">FOUNDER</h3>
                        <p className="text-gray-300 text-xs mt-1">Satayu Pongpan</p>
                    </div>
                    <div className="w-full py-2 bg-white text-gray-900 font-bold text-xs rounded-xl mt-2 hover:bg-gray-100 transition-colors cursor-pointer shadow-sm">
                        ดูโปรไฟล์
                    </div>
                </div>
            </Card>

            {/* KhomunPang */}
            <Card
                href="https://ddme36.github.io/KhomunPang/"
                BgIcon={Database}
                className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2 !bg-gradient-to-br from-blue-500 to-indigo-600 !text-white !border-none shadow-[0_8px_30px_rgba(59,130,246,0.25)]"
                delay={0.25}
            >
                <div className="flex flex-col h-full items-center justify-between text-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full mb-3 flex items-center justify-center font-display text-white relative z-20 shadow-inner border border-white/30">
                        <Database size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold font-display">ข้อมูลปัง</h3>
                        <p className="text-blue-50 text-xs mt-1">
                            ผู้เชี่ยวชาญจัดการข้อมูล
                        </p>
                    </div>
                    <div className="w-full py-2 bg-white/20 backdrop-blur-sm text-white font-bold text-xs rounded-xl mt-2 hover:bg-white/30 transition-colors cursor-pointer border border-white/30">
                        <span>ดูผลงาน</span>
                    </div>
                </div>
            </Card>

            {/* Smart AI Stock */}
            <Card
                href="https://smartaistock.vercel.app/"
                BgIcon={Bell}
                className="col-span-2 md:col-span-2 lg:col-span-2 row-span-1 !bg-gradient-to-br from-indigo-500 to-purple-600 !text-white !border-none shadow-[0_8px_30px_rgba(99,102,241,0.25)]"
                delay={0.28}
            >
                <div className="flex flex-col h-full justify-between">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 mb-1">
                            <Bell className="w-4 h-4 text-indigo-100" />
                            <span className="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/30">
                                PWA
                            </span>
                        </div>
                        <ArrowUpRight className="text-indigo-100" size={18} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold font-display mb-1">
                            Smart AI Stock
                        </h3>
                        <p className="text-indigo-50 text-sm leading-relaxed">
                            แจ้งเตือนหุ้นตาม Smart Money Concept พร้อม PWA
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            <span className="px-2.5 py-1 bg-white/15 backdrop-blur-sm rounded-lg text-xs font-medium border border-white/25">
                                Smart Alerts
                            </span>
                            <span className="px-2.5 py-1 bg-white/15 backdrop-blur-sm rounded-lg text-xs font-medium border border-white/25">
                                PWA Ready
                            </span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* PurrDrop Project */}
            <Card
                href="https://purrdrop.onrender.com/"
                bgImage="/images/purrdrop.png"
                priority={true}
                className="col-span-2 md:col-span-2 lg:col-span-2 row-span-1 !text-white !border-none"
                delay={0.3}
            >
                <div className="flex flex-col h-full justify-between">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Share2 className="w-4 h-4 text-white" />
                                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                    PWA
                                </span>
                            </div>
                            <h3 className="text-lg font-bold font-display drop-shadow-md">
                                PurrDrop
                            </h3>
                            <p className="text-white/90 text-sm drop-shadow-sm">
                                เว็บแอพส่งไฟล์ P2P
                            </p>
                        </div>
                        <ArrowUpRight className="text-white/70" size={18} />
                    </div>
                </div>
            </Card>

            {/* JodHuay - Lottery Note App */}
            <Card
                href="https://ddme36.github.io/JodHuay/"
                BgIcon={Ticket}
                className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 !bg-gradient-to-br from-amber-400 to-orange-500 !text-white !border-none shadow-[0_8px_30px_rgba(251,191,36,0.25)]"
                delay={0.32}
            >
                <div className="flex flex-col h-full justify-center items-center text-center">
                    <Ticket className="w-5 h-5 text-amber-50 mb-2" />
                    <h3 className="text-sm font-bold font-display">จดหวย</h3>
                    <p className="text-amber-50 text-xs mt-1">
                        บันทึกเลขหวยง่ายๆ
                    </p>
                </div>
            </Card>

            {/* HEARTOPIANO - Piano Game App */}
            <Card
                href="https://your-heartopiano-url.com"
                BgIcon={Music}
                className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 !bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 !text-white !border-none shadow-[0_8px_30px_rgba(236,72,153,0.25)]"
                delay={0.34}
            >
                <div className="flex flex-col h-full justify-center items-center text-center">
                    <Music className="w-5 h-5 text-pink-50 mb-2" />
                    <h3 className="text-sm font-bold font-display">HEARTOPIANO</h3>
                    <p className="text-pink-50 text-xs mt-1">
                        เล่นเปียโนในเกม
                    </p>
                </div>
            </Card>

            {/* GitHub */}
            <Card
                href="https://github.com/DDME36"
                className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 !bg-gray-800 !text-white !border-none"
                delay={0.35}
            >
                <div className="flex flex-col h-full justify-center items-center text-center">
                    <Code className="w-5 h-5 text-gray-400 mb-2" />
                    <h3 className="text-sm font-bold font-display">GitHub</h3>
                    <p className="text-gray-400 text-xs mt-1">Open Source</p>
                </div>
            </Card>

            {/* 2026 Vision Goals */}
            <Card
                href="https://2026-vision-goals.vercel.app/"
                className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 !bg-gradient-to-r from-slate-900 to-slate-800 !text-white !border-none"
                delay={0.4}
            >
                <div className="flex flex-col h-full justify-center items-center text-center">
                    <Target className="w-5 h-5 text-rose-400 mb-2" />
                    <h3 className="text-sm font-bold font-display">2026 Goals</h3>
                </div>
            </Card>

            {/* Articles Section - ปรับให้สวยขึ้น */}
            <Card
                BgIcon={BookOpen}
                className="col-span-2 md:col-span-2 lg:col-span-3 row-span-1 bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 !border-rose-100 hover:shadow-xl transition-all duration-300"
                delay={0.45}
            >
                <div className="flex flex-col h-full">
                    <Link href="/blog" className="flex items-center gap-2 mb-3 group/header hover:opacity-80 transition-opacity w-fit">
                        <div className="p-2 bg-gradient-to-r from-rose-400 to-purple-400 rounded-lg">
                            <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-base font-bold font-display text-gray-800">
                            บทความล่าสุด
                        </h3>
                        <ArrowUpRight size={14} className="text-rose-400 opacity-0 -translate-x-2 group-hover/header:opacity-100 group-hover/header:translate-x-0 transition-all" />
                    </Link>
                    <div className="flex flex-col gap-2 overflow-y-auto">
                        {posts.length > 0 ? (
                            posts.slice(0, 2).map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="text-sm font-medium text-gray-700 hover:text-rose-600 truncate flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-rose-100/50 transition-colors border border-rose-100/50 hover:border-rose-200 w-full text-left"
                                >
                                    <span className="w-2 h-2 bg-rose-400 rounded-full flex-shrink-0"></span>
                                    <span className="truncate">{post.title}</span>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-4">
                                <div className="mb-2">
                                    <BookOpen className="w-8 h-8 text-rose-300 mx-auto" />
                                </div>
                                <span className="text-sm text-gray-500 italic">ไม่มีบทความล่าสุด</span>
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            {/* Contact - ปรับให้สมส่วนขึ้น */}
            <Card
                href="https://line.me/ti/p/~example"
                className="col-span-2 md:col-span-2 lg:col-span-3 row-span-1 !bg-gradient-to-r from-emerald-400 to-teal-500 !text-white !border-none group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                delay={0.5}
            >
                {/* Background Icon */}
                <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <MessageCircle size={180} strokeWidth={1} />
                </div>
                
                <div className="flex items-center justify-between h-full relative z-10">
                    <div className="flex flex-col justify-center">
                        <h3 className="text-base sm:text-lg font-bold font-display">สนใจร่วมงาน?</h3>
                        <p className="text-white/90 text-sm">แชร์ไอเดีย หรือสนทนาเรื่องเทคโนโลยี</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white transition-all duration-300 group-hover:bg-white group-hover:text-emerald-500 group-hover:scale-110">
                        <MessageCircle size={20} fill="currentColor" />
                    </div>
                </div>
            </Card>
        </div>
    </>
);
};
