'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles, Code2, Rocket, Zap, Database } from 'lucide-react';

const researchTopics = [
  { name: 'ปัญญาประดิษฐ์', icon: Brain, color: 'text-white', bg: 'from-purple-500 to-violet-600' },
  { name: 'เว็บเทคโนโลยี', icon: Code2, color: 'text-white', bg: 'from-blue-500 to-cyan-600' },
  { name: 'ประสิทธิภาพ', icon: Zap, color: 'text-white', bg: 'from-amber-400 to-orange-500' },
  { name: 'นวัตกรรม', icon: Sparkles, color: 'text-white', bg: 'from-pink-500 to-rose-600' },
  { name: 'คลาวด์และเดฟออปส์', icon: Rocket, color: 'text-white', bg: 'from-sky-500 to-blue-600' },
  { name: 'ระบบข้อมูล', icon: Database, color: 'text-white', bg: 'from-indigo-500 to-purple-600' },
];

export const TechStackMarquee = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-12 sm:py-16">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="mb-2 font-display text-2xl font-bold text-gray-800 sm:text-3xl">
            สิ่งที่เราศึกษาวิจัย
          </h2>
          <p className="font-light text-gray-500">เทคโนโลยีและความรู้ใหม่ๆ ที่เรากำลังสำรวจ</p>
        </motion.div>

        {/* Scrolling Content - Single Row */}
        <div className="relative">
          {/* Single Row - Pure CSS Smooth Scroll (GPU Accelerated) */}
          <div
            className="flex overflow-hidden py-4"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <motion.div
              className="animate-marquee-slow flex gap-4"
              style={{ willChange: 'transform' }}
              whileHover={{ animationPlayState: 'paused' }}
            >
              {[...researchTopics, ...researchTopics].map((topic, index) => {
                // นำ Icon มาใส่ตัวแปรตัวพิมพ์ใหญ่ (React Component ต้องขึ้นต้นด้วยตัวพิมพ์ใหญ่)
                const Icon = topic.icon;

                return (
                  <motion.div
                    key={`topic-${index}`}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-shrink-0 bg-gradient-to-br ${topic.bg} group relative cursor-pointer overflow-hidden rounded-2xl border-none p-6 shadow-lg transition-shadow hover:shadow-xl`}
                  >
                    {/* Background Icon */}
                    <div className="absolute -bottom-4 -right-4 text-white/40 opacity-20 transition-opacity group-hover:opacity-30">
                      <Icon size={120} strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex w-36 flex-col items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                        className={`text-4xl ${topic.color} drop-shadow-lg`}
                      >
                        <Icon strokeWidth={2} />
                      </motion.div>
                      <span className="text-center font-sans text-sm font-bold leading-tight text-white drop-shadow-md">
                        {topic.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
