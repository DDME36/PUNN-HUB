'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Code, Lightbulb, Rocket, Users } from 'lucide-react';

interface StatProps {
  value: number;
  label: string;
  icon: React.ElementType;
  suffix?: string;
  color: string;
}

const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const StatCard = ({ value, label, icon: Icon, suffix, color }: StatProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${color} mb-4 flex items-center justify-center shadow-[0_4px_20px_rgb(0,0,0,0.1)] group-hover:shadow-[0_6px_30px_rgb(0,0,0,0.15)]`}
          >
            <Icon size={28} className="text-white" />
          </motion.div>

          {/* Counter */}
          <div className="mb-2 font-display text-4xl font-black text-gray-800 sm:text-5xl">
            <AnimatedCounter value={value} suffix={suffix} />
          </div>

          {/* Label */}
          <p className="font-medium text-gray-600">{label}</p>

          {/* Animated Line */}
          <motion.div
            className={`mt-4 h-1 bg-gradient-to-r ${color} rounded-full`}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const stats: StatProps[] = [
  {
    value: 10,
    label: 'โปรเจกต์',
    icon: Rocket,
    suffix: '+',
    color: 'from-rose-400 to-pink-500',
  },
  {
    value: 25,
    label: 'บทความ',
    icon: Lightbulb,
    suffix: '+',
    color: 'from-purple-400 to-indigo-500',
  },
  {
    value: 5000,
    label: 'บรรทัดโค้ด',
    icon: Code,
    suffix: '+',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    value: 500,
    label: 'ผู้เข้าชม',
    icon: Users,
    suffix: '+',
    color: 'from-emerald-400 to-teal-500',
  },
];

export const StatsCounter = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(251,113,133,0.08) 0%, transparent 50%),
                                     radial-gradient(circle at 70% 50%, rgba(196,181,253,0.08) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 font-display text-3xl font-black text-gray-800 sm:text-4xl">
            ความสำเร็จของเรา
          </h2>
          <p className="font-light text-gray-500">ตัวเลขที่สะท้อนการเติบโตและผลงานของ PUNN HUB</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
