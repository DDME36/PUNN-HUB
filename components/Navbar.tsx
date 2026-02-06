"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    TrendingUp,
    Database,
    Share2,
    Target,
    Code,
    User,
    ArrowUpRight,
    MessageCircle,
    Menu as MenuIcon,
    X as XIcon,
    Home,
    Ticket,
    Bell,
    BookOpen,
    Music,
    ChevronUp,
} from "lucide-react";
import { SearchModal } from "./SearchModal";

const menuLinks = [
    {
        name: "หน้าแรก",
        href: "/",
        icon: Home,
        internal: true,
    },
    {
        name: "บทความ",
        href: "/blog",
        icon: BookOpen,
        internal: true,
    },
    {
        name: "PUNN INVESTING",
        href: "https://ddme36.github.io/PUNN-INVESTING/",
        icon: TrendingUp,
    },
    {
        name: "Smart AI Stock",
        href: "https://smartaistock.vercel.app/",
        icon: Bell,
    },
    {
        name: "ข้อมูลปัง",
        href: "https://ddme36.github.io/KhomunPang/",
        icon: Database,
    },
    {
        name: "PurrDrop",
        href: "https://purrdrop.onrender.com/",
        icon: Share2,
    },
    {
        name: "จดหวย",
        href: "https://ddme36.github.io/JodHuay/",
        icon: Ticket,
    },
    {
        name: "HEARTOPIANO",
        href: "https://your-heartopiano-url.com",
        icon: Music,
    },
    {
        name: "2026 Goals",
        href: "https://2026-vision-goals.vercel.app/",
        icon: Target,
    },
    { name: "GitHub", href: "https://github.com/DDME36", icon: Code },
    { name: "เว็บส่วนตัว", href: "https://satayupongpan.site/", icon: User },
];

interface NavbarProps {
    posts?: any[];
}

export const Navbar = ({ posts = [] }: NavbarProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const pathname = usePathname();

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [menuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            setShowBackToTop(window.scrollY > 400);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {/* Sticky Navigation - Soft UI */}
            <motion.nav
                initial={{ y: 0 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
                        ? "bg-white/90 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] py-3"
                        : "bg-transparent py-4"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link
                        href="/"
                        className="font-display font-black text-xl sm:text-2xl tracking-tighter hover:opacity-80 transition-opacity"
                    >
                        <span className="bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                            PUNN HUB
                        </span>
                        <span className="text-gray-800">.</span>
                    </Link>

                    {/* Desktop Quick Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className={`text-sm font-medium transition-all relative group ${pathname === "/"
                                    ? "text-rose-500"
                                    : "text-gray-600 hover:text-rose-500"
                                }`}
                        >
                            หน้าแรก
                            {pathname === "/" && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                        <Link
                            href="/blog"
                            className={`text-sm font-medium transition-all relative group ${pathname === "/blog" || pathname?.startsWith("/blog/")
                                    ? "text-rose-500"
                                    : "text-gray-600 hover:text-rose-500"
                                }`}
                        >
                            บทความ
                            {(pathname === "/blog" || pathname?.startsWith("/blog/")) && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Search Button - Show only on blog pages */}
                        {(pathname === "/blog" || pathname?.startsWith("/blog/")) && (
                            <SearchModal posts={posts} />
                        )}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setMenuOpen(true)}
                            aria-label="เปิดเมนู"
                            aria-expanded={menuOpen}
                            className="px-6 py-2.5 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 rounded-full font-medium text-sm shadow-sm hover:shadow-md hover:border-rose-200 transition-all flex items-center gap-2"
                        >
                            <MenuIcon size={16} />
                            <span className="hidden sm:inline">เมนู</span>
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Spacer for fixed nav */}
            <div className="h-16 sm:h-20"></div>

            {/* Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={() => setMenuOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* Slide-in Menu Panel */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="เมนูหลัก"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-96 sm:max-w-[85vw] bg-white shadow-2xl z-50 flex flex-col overflow-y-auto border-l border-gray-100"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="font-display font-bold text-xl bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                                เมนู
                            </h2>
                            <button
                                onClick={() => setMenuOpen(false)}
                                aria-label="ปิดเมนู"
                                className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700"
                            >
                                <XIcon size={20} />
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div className="flex-1 p-6 space-y-2">
                            {menuLinks.map((link, index) => {
                                const isActive = pathname === link.href;
                                const LinkComponent = link.internal ? Link : "a";
                                const IconComponent = link.icon;
                                const linkProps = link.internal
                                    ? { href: link.href }
                                    : { href: link.href, target: "_blank", rel: "noopener noreferrer" };

                                return (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 + 0.1 }}
                                    >
                                        <LinkComponent
                                            {...linkProps}
                                            className={`flex items-center gap-3 p-4 rounded-xl transition-all group ${isActive
                                                    ? "bg-gradient-to-r from-rose-50 to-purple-50 shadow-sm border border-rose-100"
                                                    : "hover:bg-gray-50"
                                                }`}
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <div
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isActive
                                                        ? "bg-gradient-to-br from-rose-400 to-purple-400 text-white shadow-md"
                                                        : "bg-white text-gray-700 group-hover:bg-gray-100 shadow-sm border border-gray-100"
                                                    }`}
                                            >
                                                <IconComponent size={18} />
                                            </div>
                                            <span
                                                className={`font-semibold text-sm flex-1 ${isActive ? "text-rose-500" : "text-gray-700"
                                                    }`}
                                            >
                                                {link.name}
                                            </span>
                                            {!link.internal && (
                                                <ArrowUpRight
                                                    className="text-gray-400 group-hover:text-rose-400 transition-colors"
                                                    size={16}
                                                />
                                            )}
                                        </LinkComponent>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Contact CTA */}
                        <div className="p-6 border-t border-gray-100">
                            <motion.a
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                href="https://line.me/ti/p/~example"
                                target="_blank"
                                className="w-full py-4 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-xl font-semibold text-center flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                            >
                                <MessageCircle size={18} />
                                ติดต่อเรา
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Back to Top Button - Soft UI */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollToTop}
                        aria-label="กลับไปด้านบน"
                        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-rose-400 to-purple-400 text-white rounded-full shadow-[0_8px_30px_rgb(251,113,133,0.3)] hover:shadow-[0_12px_40px_rgb(251,113,133,0.4)] flex items-center justify-center z-40 transition-all"
                    >
                        <ChevronUp size={24} />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
};
