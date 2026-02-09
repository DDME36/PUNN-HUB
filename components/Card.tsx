"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    href?: string;
    onClick?: () => void;
    BgIcon?: LucideIcon;
    bgImage?: string;
    priority?: boolean;
}

export const Card = ({
    children,
    className,
    delay = 0,
    href,
    onClick,
    BgIcon,
    bgImage,
    priority = false,
}: CardProps) => {
    const Component = href ? motion.a : motion.div;

    return (
        <Component
            href={href}
            onClick={onClick}
            target={href ? "_blank" : undefined}
            rel={href ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
                y: -4,
                transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25,
                    duration: 0.2
                },
            }}
            whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
            }}
            className={cn(
                "bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100/50 flex flex-col relative overflow-hidden text-left group cursor-pointer transition-all",
                className
            )}
        >
            {/* Background Image */}
            {bgImage && (
                <>
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={bgImage}
                            alt="Background"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={priority}
                        />
                    </div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0"></div>
                </>
            )}

            {BgIcon && !bgImage && (
                <div className="absolute -bottom-6 -right-6 text-current opacity-[0.06] pointer-events-none z-0">
                    <BgIcon size={180} strokeWidth={0.8} />
                </div>
            )}

            <div className="relative z-10 flex flex-col h-full">{children}</div>
        </Component>
    );
};
