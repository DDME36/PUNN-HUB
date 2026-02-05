"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { Code, Lightbulb, Rocket, Users } from "lucide-react";

interface StatProps {
    value: number;
    label: string;
    icon: React.ElementType;
    suffix?: string;
    color: string;
}

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 2000 });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        springValue.on("change", (latest) => {
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
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all">
                <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-[0_4px_20px_rgb(0,0,0,0.1)] group-hover:shadow-[0_6px_30px_rgb(0,0,0,0.15)]`}
                    >
                        <Icon size={28} className="text-white" />
                    </motion.div>

                    {/* Counter */}
                    <div className="text-4xl sm:text-5xl font-black font-display text-gray-800 mb-2">
                        <AnimatedCounter value={value} suffix={suffix} />
                    </div>

                    {/* Label */}
                    <p className="text-gray-600 font-medium">{label}</p>

                    {/* Animated Line */}
                    <motion.div
                        className={`mt-4 h-1 bg-gradient-to-r ${color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
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
        label: "โปรเจกต์",
        icon: Rocket,
        suffix: "+",
        color: "from-rose-400 to-pink-500",
    },
    {
        value: 25,
        label: "บทความ",
        icon: Lightbulb,
        suffix: "+",
        color: "from-purple-400 to-indigo-500",
    },
    {
        value: 5000,
        label: "บรรทัดโค้ด",
        icon: Code,
        suffix: "+",
        color: "from-blue-400 to-cyan-500",
    },
    {
        value: 500,
        label: "ผู้เข้าชม",
        icon: Users,
        suffix: "+",
        color: "from-emerald-400 to-teal-500",
    },
];

export const StatsCounter = () => {
    return (
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 30% 50%, rgba(251,113,133,0.08) 0%, transparent 50%),
                                     radial-gradient(circle at 70% 50%, rgba(196,181,253,0.08) 0%, transparent 50%)`
                }}></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-black font-display text-gray-800 mb-3">
                        ความสำเร็จของเรา
                    </h2>
                    <p className="text-gray-500 font-light">
                        ตัวเลขที่สะท้อนการเติบโตและผลงานของ PUNN HUB
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
