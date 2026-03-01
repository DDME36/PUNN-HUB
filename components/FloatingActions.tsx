'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Bookmark, Share2, MessageCircle, ChevronUp } from 'lucide-react';

interface FloatingActionsProps {
  onLike?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
  onComment?: () => void;
}

export const FloatingActions = ({
  onLike,
  onBookmark,
  onShare,
  onComment,
}: FloatingActionsProps) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike?.();
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark?.();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const actions = [
    {
      icon: Heart,
      label: 'ถูกใจ',
      onClick: handleLike,
      active: liked,
      activeColor: 'text-red-500',
      bgColor: 'from-red-50 to-pink-50',
    },
    {
      icon: Bookmark,
      label: 'บันทึก',
      onClick: handleBookmark,
      active: bookmarked,
      activeColor: 'text-blue-500',
      bgColor: 'from-blue-50 to-cyan-50',
    },
    {
      icon: Share2,
      label: 'แชร์',
      onClick: onShare,
      active: false,
      activeColor: 'text-green-500',
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      icon: MessageCircle,
      label: 'แสดงความคิดเห็น',
      onClick: onComment,
      active: false,
      activeColor: 'text-purple-500',
      bgColor: 'from-purple-50 to-violet-50',
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-40 hidden md:block">
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {showActions &&
            actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={action.onClick}
                className={`group relative h-14 w-14 rounded-full shadow-lg transition-all hover:shadow-xl ${
                  action.active
                    ? `bg-gradient-to-br ${action.bgColor}`
                    : 'bg-white/95 backdrop-blur-xl'
                } flex items-center justify-center border border-white/60`}
                aria-label={action.label}
              >
                <action.icon
                  size={20}
                  className={`${
                    action.active ? action.activeColor : 'text-gray-600 group-hover:text-gray-800'
                  } transition-colors`}
                  fill={action.active ? 'currentColor' : 'none'}
                />

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white"
                >
                  {action.label}
                  <div className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 translate-x-full border-y-4 border-l-4 border-y-transparent border-l-gray-900" />
                </motion.div>
              </motion.button>
            ))}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowActions(!showActions)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-purple-400 text-white shadow-[0_8px_30px_rgb(251,113,133,0.3)] transition-all hover:shadow-[0_12px_40px_rgb(251,113,133,0.4)]"
          aria-label={showActions ? 'ซ่อนเมนู' : 'แสดงเมนู'}
        >
          <motion.div animate={{ rotate: showActions ? 45 : 0 }} transition={{ duration: 0.3 }}>
            {showActions ? <ChevronUp size={24} /> : <Heart size={24} />}
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};
