'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TrendingUp,
  Database,
  Share2,
  Target,
  Code,
  User,
  ArrowUpRight,
  Menu as MenuIcon,
  X as XIcon,
  Home,
  Bell,
  BookOpen,
  Music,
  Brain,
  Ticket,
} from 'lucide-react';
import { MagneticButton } from './MagneticButton';

const menuLinks = [
  { name: 'หน้าแรก', href: '/', icon: Home, internal: true },
  { name: 'บทความ', href: '/blog', icon: BookOpen, internal: true },
  { name: 'PUNN INVESTING', href: 'https://ddme36.github.io/PUNN-INVESTING/', icon: TrendingUp },
  { name: 'Smart AI Stock', href: 'https://smartaistock.vercel.app/', icon: Bell },
  { name: 'MemoKard', href: 'https://memokard.vercel.app/', icon: Brain },
  { name: 'ข้อมูลปัง', href: 'https://ddme36.github.io/KhomunPang/', icon: Database },
  { name: 'PurrDrop', href: 'https://purrdrop.onrender.com/', icon: Share2 },
  { name: 'จดหวย', href: 'https://ddme36.github.io/JodHuay/', icon: Ticket },
  { name: 'HEARTOPIANO', href: 'https://www.punn.site/blog/HowToUseHeartopiano', icon: Music, internal: true },
  { name: '2026 Goals', href: 'https://2026-vision-goals.vercel.app/', icon: Target },
  { name: 'GitHub', href: 'https://github.com/DDME36', icon: Code },
  { name: 'เว็บส่วนตัว', href: 'https://satayupongpan.site/', icon: User },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[100] flex justify-center p-4 pointer-events-none">
        <motion.nav
          initial={false}
          animate={{
            maxWidth: scrolled ? '650px' : '1280px',
            backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0)',
            backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
            borderRadius: scrolled ? '40px' : '0px',
            borderWidth: scrolled ? '1px' : '0px',
            borderColor: 'rgba(255, 255, 255, 0.4)',
            boxShadow: scrolled ? '0 10px 40px -10px rgba(0,0,0,0.1)' : '0 0 0 rgba(0,0,0,0)',
            y: scrolled ? 4 : 0,
            paddingLeft: scrolled ? '20px' : '32px',
            paddingRight: scrolled ? '20px' : '32px',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="pointer-events-auto flex w-full items-center justify-between h-[56px] sm:h-[64px]"
        >
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start items-center min-w-[80px]">
            <MagneticButton intensity={0.1}>
              <Link href="/" className="flex items-center font-display text-lg font-black tracking-tighter sm:text-2xl">
                <span className="bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                  PUNN
                </span>
                <AnimatePresence mode="wait">
                  {!scrolled && (
                    <motion.span
                      key="hub-text"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      className="ml-1 text-gray-800"
                    >
                      HUB
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </MagneticButton>
          </div>

          {/* Center: Main Links (TRULY CLEAN) */}
          <div className="hidden md:flex items-center justify-center gap-6 sm:gap-8">
            <Link href="/" className={`text-sm font-bold transition-all hover:scale-105 ${pathname === '/' ? 'text-rose-500' : 'text-gray-600 hover:text-rose-500'}`}>
              หน้าแรก
            </Link>
            <Link href="/blog" className={`text-sm font-bold transition-all hover:scale-105 ${pathname === '/blog' || pathname?.startsWith('/blog/') ? 'text-rose-500' : 'text-gray-600 hover:text-rose-500'}`}>
              บทความ
            </Link>
          </div>

          {/* Right: Menu Button */}
          <div className="flex-1 flex justify-end items-center min-w-[80px]">
            <MagneticButton intensity={0.15}>
              <button
                onClick={() => setMenuOpen(true)}
                className={`flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white/80 text-sm font-bold text-gray-700 shadow-sm transition-all hover:border-rose-200 ${
                  scrolled 
                    ? 'w-11 h-11 sm:w-12 sm:h-12' 
                    : 'px-4 py-2 sm:px-6 sm:py-2.5'
                }`}
              >
                <MenuIcon size={scrolled ? 22 : 18} />
                {!scrolled && <span className="inline">เมนู</span>}
              </button>
            </MagneticButton>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-[2px]"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              role="dialog"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 z-[210] flex h-full w-full flex-col overflow-y-auto border-l border-gray-100 bg-white shadow-2xl sm:w-96"
            >
              <div className="flex items-center justify-between border-b border-gray-100 p-6">
                <h2 className="bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text font-display text-xl font-bold text-transparent">เมนู</h2>
                <button onClick={() => setMenuOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100">
                  <XIcon size={20} />
                </button>
              </div>
              <div className="flex-1 space-y-1 p-4">
                {menuLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  const LinkComponent = link.internal ? Link : 'a';
                  return (
                    <motion.div key={link.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}>
                      <LinkComponent 
                        href={link.href}
                        {...(!link.internal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className={`group flex items-center gap-3 rounded-2xl p-3 transition-all ${isActive ? 'bg-rose-50 text-rose-500' : 'hover:bg-gray-50 text-gray-700'}`} 
                        onClick={() => setMenuOpen(false)}
                      >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isActive ? 'bg-white text-rose-500 shadow-sm' : 'bg-gray-100 text-gray-500'}`}>
                          <link.icon size={18} />
                        </div>
                        <span className="flex-1 text-sm font-bold">{link.name}</span>
                        {!link.internal && <ArrowUpRight size={14} className="opacity-30" />}
                      </LinkComponent>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
