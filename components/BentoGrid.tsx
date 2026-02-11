'use client';

import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { Card } from './Card';
import Link from 'next/link';

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
      <div className="mx-auto grid max-w-5xl auto-rows-[180px] grid-cols-2 gap-3 px-4 py-8 md:grid-cols-4 lg:grid-cols-6">
        {/* PUNN-INVESTING - Premium Flagship */}
        <Card
          href="https://ddme36.github.io/PUNN-INVESTING/"
          BgIcon={TrendingUp}
          className="col-span-2 row-span-2 !border-none !bg-gradient-to-br from-emerald-500 to-teal-600 !text-white shadow-[0_8px_30px_rgba(16,185,129,0.25)] md:col-span-2 lg:col-span-2"
          delay={0.1}
        >
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-100" />
                <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                  Flagship
                </span>
              </div>
              <motion.div
                whileHover={{ rotate: 45 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ArrowUpRight className="text-emerald-100" size={18} />
              </motion.div>
            </div>
            <div>
              <h2 className="mb-2 font-display text-lg font-bold sm:text-xl lg:text-2xl">
                PUNN INVESTING
              </h2>
              <p className="text-sm leading-relaxed text-emerald-50">
                แพลตฟอร์มแนะนำการลงทุนหุ้นสหรัฐฯ ด้วยข้อมูลเชิงลึกและการวิเคราะห์ที่แม่นยำ
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded-lg border border-white/25 bg-white/15 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
                  Stock Analysis
                </span>
                <span className="rounded-lg border border-white/25 bg-white/15 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
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
          className="col-span-1 row-span-2 !border-none !bg-gradient-to-br from-gray-800 to-gray-900 !text-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] md:col-span-1 lg:col-span-1"
          delay={0.2}
        >
          <div className="flex h-full flex-col items-center justify-between text-center">
            <div className="relative z-20 mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-700 to-gray-600 font-display text-lg font-bold text-gray-300 shadow-inner">
              ME
            </div>
            <div>
              <h3 className="font-display text-sm font-bold uppercase">FOUNDER</h3>
              <p className="mt-1 text-xs text-gray-300">Satayu Pongpan</p>
            </div>
            <div className="mt-2 w-full cursor-pointer rounded-xl bg-white py-2 text-xs font-bold text-gray-900 shadow-sm transition-colors hover:bg-gray-100">
              ดูโปรไฟล์
            </div>
          </div>
        </Card>

        {/* KhomunPang */}
        <Card
          href="https://ddme36.github.io/KhomunPang/"
          BgIcon={Database}
          className="col-span-1 row-span-2 !border-none !bg-gradient-to-br from-blue-500 to-indigo-600 !text-white shadow-[0_8px_30px_rgba(59,130,246,0.25)] md:col-span-1 lg:col-span-1"
          delay={0.25}
        >
          <div className="flex h-full flex-col items-center justify-between text-center">
            <div className="relative z-20 mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 font-display text-white shadow-inner backdrop-blur-sm">
              <Database size={20} />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold">ข้อมูลปัง</h3>
              <p className="mt-1 text-xs text-blue-50">ผู้เชี่ยวชาญจัดการข้อมูล</p>
            </div>
            <div className="mt-2 w-full cursor-pointer rounded-xl border border-white/30 bg-white/20 py-2 text-xs font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/30">
              <span>ดูผลงาน</span>
            </div>
          </div>
        </Card>

        {/* Smart AI Stock */}
        <Card
          href="https://smartaistock.vercel.app/"
          BgIcon={Bell}
          className="col-span-2 row-span-1 !border-none !bg-gradient-to-br from-indigo-500 to-purple-600 !text-white shadow-[0_8px_30px_rgba(99,102,241,0.25)] md:col-span-2 lg:col-span-2"
          delay={0.28}
        >
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="mb-1 flex items-center gap-2">
                <Bell className="h-4 w-4 text-indigo-100" />
                <span className="rounded-lg border border-white/30 bg-white/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  PWA
                </span>
              </div>
              <ArrowUpRight className="text-indigo-100" size={18} />
            </div>
            <div>
              <h3 className="mb-1 font-display text-lg font-bold">Smart AI Stock</h3>
              <p className="text-sm leading-relaxed text-indigo-50">
                แจ้งเตือนหุ้นตาม Smart Money Concept พร้อม PWA
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="rounded-lg border border-white/25 bg-white/15 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
                  Smart Alerts
                </span>
                <span className="rounded-lg border border-white/25 bg-white/15 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
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
          className="col-span-2 row-span-1 !border-none !text-white md:col-span-2 lg:col-span-2"
          delay={0.3}
        >
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Share2 className="h-4 w-4 text-white" />
                  <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                    PWA
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold drop-shadow-md">PurrDrop</h3>
                <p className="text-sm text-white/90 drop-shadow-sm">เว็บแอพส่งไฟล์ P2P</p>
              </div>
              <ArrowUpRight className="text-white/70" size={18} />
            </div>
          </div>
        </Card>

        {/* JodHuay - Lottery Note App */}
        <Card
          href="https://ddme36.github.io/JodHuay/"
          BgIcon={Ticket}
          className="col-span-1 row-span-1 !border-none !bg-gradient-to-br from-amber-400 to-orange-500 !text-white shadow-[0_8px_30px_rgba(251,191,36,0.25)] md:col-span-1 lg:col-span-1"
          delay={0.32}
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Ticket className="mb-2 h-5 w-5 text-amber-50" />
            <h3 className="font-display text-sm font-bold">จดหวย</h3>
            <p className="mt-1 text-xs text-amber-50">บันทึกเลขหวยง่ายๆ</p>
          </div>
        </Card>

        {/* HEARTOPIANO - Piano Game App */}
        <Card
          href="https://your-heartopiano-url.com"
          BgIcon={Music}
          className="col-span-1 row-span-1 !border-none !bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 !text-white shadow-[0_8px_30px_rgba(236,72,153,0.25)] md:col-span-1 lg:col-span-1"
          delay={0.34}
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Music className="mb-2 h-5 w-5 text-pink-50" />
            <h3 className="font-display text-sm font-bold">HEARTOPIANO</h3>
            <p className="mt-1 text-xs text-pink-50">เล่นเปียโนในเกม</p>
          </div>
        </Card>

        {/* GitHub */}
        <Card
          href="https://github.com/DDME36"
          className="col-span-1 row-span-1 !border-none !bg-gray-800 !text-white md:col-span-1 lg:col-span-1"
          delay={0.35}
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Code className="mb-2 h-5 w-5 text-gray-400" />
            <h3 className="font-display text-sm font-bold">GitHub</h3>
            <p className="mt-1 text-xs text-gray-400">Open Source</p>
          </div>
        </Card>

        {/* 2026 Vision Goals */}
        <Card
          href="https://2026-vision-goals.vercel.app/"
          className="col-span-1 row-span-1 !border-none !bg-gradient-to-r from-slate-900 to-slate-800 !text-white md:col-span-1 lg:col-span-1"
          delay={0.4}
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Target className="mb-2 h-5 w-5 text-rose-400" />
            <h3 className="font-display text-sm font-bold">2026 Goals</h3>
          </div>
        </Card>

        {/* Articles Section - ปรับให้สวยขึ้น */}
        <Card
          BgIcon={BookOpen}
          className="col-span-2 row-span-1 !border-rose-100 bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 transition-all duration-300 hover:shadow-xl md:col-span-2 lg:col-span-3"
          delay={0.45}
        >
          <div className="flex h-full flex-col">
            <Link
              href="/blog"
              className="group/header mb-3 flex w-fit items-center gap-2 transition-opacity hover:opacity-80"
            >
              <div className="rounded-lg bg-gradient-to-r from-rose-400 to-purple-400 p-2">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-display text-base font-bold text-gray-800">บทความล่าสุด</h3>
              <ArrowUpRight
                size={14}
                className="-translate-x-2 text-rose-400 opacity-0 transition-all group-hover/header:translate-x-0 group-hover/header:opacity-100"
              />
            </Link>
            <div className="flex flex-col gap-2 overflow-y-auto">
              {posts.length > 0 ? (
                posts.slice(0, 2).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="flex w-full items-center gap-2 truncate rounded-lg border border-rose-100/50 px-3 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:border-rose-200 hover:bg-rose-100/50 hover:text-rose-600"
                  >
                    <span className="h-2 w-2 flex-shrink-0 rounded-full bg-rose-400"></span>
                    <span className="truncate">{post.title}</span>
                  </Link>
                ))
              ) : (
                <div className="py-4 text-center">
                  <div className="mb-2">
                    <BookOpen className="mx-auto h-8 w-8 text-rose-300" />
                  </div>
                  <span className="text-sm italic text-gray-500">ไม่มีบทความล่าสุด</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Contact - ปรับให้สมส่วนขึ้น */}
        <Card
          href="https://line.me/ti/p/~example"
          className="group relative col-span-2 row-span-1 overflow-hidden !border-none !bg-gradient-to-r from-emerald-400 to-teal-500 !text-white transition-all duration-300 hover:shadow-xl md:col-span-2 lg:col-span-3"
          delay={0.5}
        >
          {/* Background Icon */}
          <div className="absolute -bottom-8 -right-8 opacity-10 transition-opacity group-hover:opacity-20">
            <MessageCircle size={180} strokeWidth={1} />
          </div>

          <div className="relative z-10 flex h-full items-center justify-between">
            <div className="flex flex-col justify-center">
              <h3 className="font-display text-base font-bold sm:text-lg">สนใจร่วมงาน?</h3>
              <p className="text-sm text-white/90">แชร์ไอเดีย หรือสนทนาเรื่องเทคโนโลยี</p>
            </div>
            <div className="rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-emerald-500">
              <MessageCircle size={20} fill="currentColor" />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
