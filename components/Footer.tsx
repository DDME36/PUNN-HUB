'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Mail, Heart, Sparkles, Home, MessageCircle, Rss } from 'lucide-react';

const quickLinks = [
  { name: 'หน้าแรก', href: '/' },
  { name: 'บทความ', href: '/blog' },
  { name: 'RSS Feed', href: '/feed.xml' },
  { name: 'GitHub', href: 'https://github.com/DDME36' },
  { name: 'เว็บส่วนตัว', href: 'https://satayupongpan.site/' },
];

const projects = [
  { name: 'PUNN INVESTING', href: 'https://ddme36.github.io/PUNN-INVESTING/' },
  { name: 'Smart AI Stock', href: 'https://smartaistock.vercel.app/' },
  { name: 'PurrDrop', href: 'https://purrdrop.onrender.com/' },
  { name: 'จดหวย', href: 'https://ddme36.github.io/JodHuay/' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-gray-100 bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-700">
      <div className="relative mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Main Footer Content */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:justify-items-center">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            <h3 className="mb-3 font-display text-2xl font-black">
              <span className="bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                PUNN
              </span>
              <span className="text-gray-800"> HUB</span>
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">
              Knowledge Hub สำหรับนักพัฒนา
              <br />
              แชร์ความรู้ ไอเดีย และเทคนิค
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-2">
              <a
                href="https://github.com/DDME36"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm transition-colors hover:bg-gray-50"
                aria-label="GitHub"
              >
                <Github size={16} className="text-gray-700" />
              </a>
              <a
                href="/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm transition-colors hover:border-orange-200 hover:bg-orange-50"
                aria-label="RSS Feed"
              >
                <Rss size={16} className="text-orange-500" />
              </a>
              <a
                href="https://line.me/ti/p/~example"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm transition-colors hover:bg-gray-50"
                aria-label="LINE"
              >
                <MessageCircle size={16} className="text-gray-700" />
              </a>
              <a
                href="mailto:your-email@example.com"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm transition-colors hover:bg-gray-50"
                aria-label="Email"
              >
                <Mail size={16} className="text-gray-700" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <h4 className="mb-3 flex items-center justify-center gap-2 text-sm font-bold text-gray-800">
              <Sparkles size={14} className="text-rose-400" />
              ลิงก์ด่วน
            </h4>
            <ul className="flex flex-col items-center space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-rose-500"
                  >
                    <div className="h-1 w-1 rounded-full bg-rose-300 transition-colors group-hover:bg-rose-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Projects */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col items-center text-center"
          >
            <h4 className="mb-3 flex items-center justify-center gap-2 text-sm font-bold text-gray-800">
              <Sparkles size={14} className="text-purple-400" />
              โปรเจกต์
            </h4>
            <ul className="flex flex-col items-center space-y-2">
              {projects.map((project) => (
                <li key={project.name}>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-purple-500"
                  >
                    <div className="h-1 w-1 rounded-full bg-purple-300 transition-colors group-hover:bg-purple-400" />
                    <span className="truncate">{project.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mb-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent sm:mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4">
          <p className="flex items-center gap-2 text-center text-xs text-gray-500 sm:text-left">
            © {currentYear} PUNN HUB · Made with
            <Heart size={12} className="fill-rose-400 text-rose-400" />
            in Thailand
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-500 sm:gap-3">
            <span className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-rose-300" />
              Next.js
            </span>
            <span className="text-gray-300">·</span>
            <span className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-300" />
              Tailwind
            </span>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-gray-100 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 shadow-sm transition-colors hover:border-rose-200 hover:text-rose-500 hover:shadow-md sm:mt-5 sm:px-6 sm:py-3"
        >
          <Home size={14} />
          <span className="hidden sm:inline">กลับสู่ด้านบน</span>
          <span className="sm:hidden">กลับขึ้นบน</span>
        </button>
      </div>
    </footer>
  );
};
