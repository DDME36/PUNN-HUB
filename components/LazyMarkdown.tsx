'use client';

import dynamic from 'next/dynamic';
import { LoadingState } from './LoadingState';

// Lazy load ReactMarkdown to reduce initial bundle size
const ReactMarkdown = dynamic(() => import('react-markdown'), {
  loading: () => <LoadingState message="กำลังโหลดเนื้อหา..." />,
  ssr: true,
});

export default ReactMarkdown;
