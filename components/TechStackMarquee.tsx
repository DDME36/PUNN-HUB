"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles, Code2, Rocket, Zap, Database } from "lucide-react";

const researchTopics = [
    { name: "ปัญญาประดิษฐ์", icon: Brain, color: "text-white", bg: "from-purple-500 to-violet-600" },
    { name: "เว็บเทคโนโลยี", icon: Code2, color: "text-white", bg: "from-blue-500 to-cyan-600" },
    { name: "ประสิทธิภาพ", icon: Zap, color: "text-white", bg: "from-amber-400 to-orange-500" },
    { name: "นวัตกรรม", icon: Sparkles, color: "text-white", bg: "from-pink-500 to-rose-600" },
    { name: "คลาวด์และเดฟออปส์", icon: Rocket, color: "text-white", bg: "from-sky-500 to-blue-600" },
    { name: "ระบบข้อมูล", icon: Database, color: "text-white", bg: "from-indigo-500 to-purple-600" },
];

export const TechStackMarquee = () => {
    return (
        <section className="relative py-10 overflow-hidden bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 30% 50%, rgba(251,113,133,0.08) 0%, transparent 50%),
                                     radial-gradient(circle at 70% 50%, rgba(196,181,253,0.08) 0%, transparent 50%)`
                }}></div>
            </div>

            <div className="relative max-w-5xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <h2 className="text-2xl sm:text-3xl font-black font-display text-gray-800 mb-2">
                        สิ่งที่เราศึกษาวิจัย
                    </h2>
                    <p className="text-gray-500 font-light">
                        เทคโนโลยีและความรู้ใหม่ๆ ที่เรากำลังสำรวจ
                    </p>
                </motion.div>

                {/* Scrolling Content - Single Row */}
                <div className="relative">
                    {/* Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                    {/* Single Row - Smooth Scroll */}
                    <div className="flex overflow-hidden">
                        <motion.div
                            animate={{
                                x: ["-50%", "0%"],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear",
                                },
                            }}
                            className="flex gap-4"
                        >
                            {[...researchTopics, ...researchTopics].map((topic, index) => (
                                <motion.div
                                    key={`topic-${index}`}
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    className={`flex-shrink-0 bg-gradient-to-br ${topic.bg} rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)] border-none hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-all cursor-pointer group relative overflow-hidden`}
                                >
                                    {/* Background Icon */}
                                    <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:opacity-30 transition-opacity text-white/40">
                                        <topic.icon size={120} strokeWidth={1.5} />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex flex-col items-center gap-3 w-36 relative z-10">
                                        <div className={`text-4xl ${topic.color} group-hover:scale-110 transition-transform drop-shadow-lg`}>
                                            <topic.icon strokeWidth={2} />
                                        </div>
                                        <span className="text-sm font-bold text-white text-center leading-tight font-sans drop-shadow-md">
                                            {topic.name}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
