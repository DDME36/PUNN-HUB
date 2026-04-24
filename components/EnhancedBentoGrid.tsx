'use client';

import { BentoGrid } from './BentoGrid';

interface Post {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  date: string;
  cover: string | null;
}

interface EnhancedBentoGridProps {
  posts: Post[];
}

/**
 * EnhancedBentoGrid - Wrapper for BentoGrid.
 * Entrance animations are now handled by individual Card components 
 * for better performance and to prevent flickering.
 */
export const EnhancedBentoGrid = ({ posts }: EnhancedBentoGridProps) => {
  return (
    <div className="relative w-full">
      <BentoGrid posts={posts} />
    </div>
  );
};
