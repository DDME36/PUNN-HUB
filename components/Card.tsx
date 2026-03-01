'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MouseEvent } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  href?: string;
  onClick?: () => void;
  BgIcon?: LucideIcon;
  bgImage?: string;
  priority?: boolean;
  glowColor?: string;
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
  glowColor = 'rgba(255, 255, 255, 0.15)', // Default subtle white glow for dark/gradient cards
}: CardProps) => {
  const Component = href ? motion.a : motion.div;

  // Track mouse position for the glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Component
      href={href}
      onClick={onClick}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMouseMove}
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
          type: 'spring',
          stiffness: 400,
          damping: 25,
          duration: 0.2,
        },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 },
      }}
      className={cn(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100/50 bg-white p-4 text-left shadow-[0_4px_20px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] sm:rounded-3xl sm:p-6',
        className
      )}
    >
      {/* Interactive Cursor Glow Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-30 rounded-2xl border-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:rounded-3xl"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
      />

      {/* Background Image */}
      {bgImage && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={bgImage}
              alt="Background"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
            />
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </>
      )}

      {BgIcon && !bgImage && (
        <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 text-current opacity-[0.06]">
          <BgIcon size={180} strokeWidth={0.8} />
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </Component>
  );
};
