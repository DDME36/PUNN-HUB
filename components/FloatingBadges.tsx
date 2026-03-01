'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const badges = [
  { text: 'Full Stack', color: 'from-blue-400 to-cyan-400', delay: 0 },
  { text: 'UI/UX', color: 'from-purple-400 to-pink-400', delay: 0.2 },
  { text: 'Web Dev', color: 'from-emerald-400 to-teal-400', delay: 0.4 },
  { text: 'React', color: 'from-blue-500 to-blue-600', delay: 0.6 },
  { text: 'Next.js', color: 'from-gray-700 to-gray-900', delay: 0.8 },
  { text: 'TypeScript', color: 'from-blue-600 to-indigo-600', delay: 1 },
];

export const FloatingBadges = () => {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 via-purple-50/30 to-blue-50/30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-0 top-0 h-96 w-96 rounded-full bg-rose-200 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-200 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-5 py-2.5 shadow-[0_4px_20px_rgb(0,0,0,0.04)] backdrop-blur-md">
            <Sparkles size={16} className="text-rose-400" />
            <span className="text-sm font-semibold text-gray-700">Core Competencies</span>
          </div>
          <h2 className="mb-3 font-display text-3xl font-black text-gray-800 sm:text-4xl">
            ความเชี่ยวชาญของเรา
          </h2>
          <p className="mx-auto max-w-2xl font-light text-gray-500">
            ทักษะและเทคโนโลยีหลักที่ PUNN HUB ใช้ในการสร้างสรรค์โซลูชัน
          </p>
        </motion.div>

        {/* Floating Badges Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: badge.delay, duration: 0.5 }}
              whileHover={{
                y: -8,
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <div
                className={`relative bg-gradient-to-br ${badge.color} rounded-2xl p-[2px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)]`}
              >
                <div className="h-full rounded-2xl bg-white/95 p-6 backdrop-blur-xl">
                  <div className="flex flex-col items-center text-center">
                    {/* Animated Icon */}
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.2,
                      }}
                      className={`mb-3 bg-gradient-to-br text-4xl ${badge.color} bg-clip-text font-black text-transparent`}
                    >
                      ✨
                    </motion.div>

                    <h3
                      className={`bg-gradient-to-br font-display text-xl font-bold ${badge.color} bg-clip-text text-transparent`}
                    >
                      {badge.text}
                    </h3>

                    {/* Hover Effect Line */}
                    <motion.div
                      className={`mt-3 h-1 bg-gradient-to-r ${badge.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ delay: badge.delay + 0.3, duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Particles - Fix Hydration */}
        <div className="pointer-events-none absolute inset-0">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={`particle-${i}`}
              animate={{
                y: [0, -30, 0],
                x: [0, i % 2 === 0 ? 10 : -10, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
              className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-rose-400 to-purple-400 blur-sm"
              style={{
                left: `${(i * 17 + 10) % 90}%`,
                top: `${(i * 23 + 15) % 80}%`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
