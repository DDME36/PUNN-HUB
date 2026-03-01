'use client';

import { useState, useEffect, useRef } from 'react';
import { Copy, Check, Minus, Plus, Type, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface BlogPostContentProps {
  content: string;
  title: string;
  imageWidths?: Map<string, number>;
}

export const BlogPostContent = ({ content, title, imageWidths }: BlogPostContentProps) => {
  const [fontSize, setFontSize] = useState(16);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Initialize client-side only values
  useEffect(() => {
    setIsClient(true);
    // ตั้งค่า font size ตามขนาดหน้าจอ
    const updateSettings = () => {
      if (window.innerWidth >= 1024) {
        setFontSize(18); // Desktop
      } else if (window.innerWidth >= 640) {
        setFontSize(16); // Tablet
      } else {
        setFontSize(15); // Mobile
      }
    };
    updateSettings();
    window.addEventListener('resize', updateSettings);
    return () => window.removeEventListener('resize', updateSettings);
  }, [title]);

  // Reading progress tracker - Optimized for Zero Layout Thrashing
  useEffect(() => {
    if (!isClient) return;

    let ticking = false;
    let cachedTotalHeight = 0;

    // ฟังก์ชันคำนวณความสูง (ทำเฉพาะตอนโหลด หรือตอนย่อ/ขยายจอ)
    const calculateHeight = () => {
      const el = articleRef.current;
      if (el) {
        cachedTotalHeight = el.scrollHeight - window.innerHeight;
      }
    };

    // คำนวณรอบแรก
    calculateHeight();

    // คำนวณใหม่เฉพาะตอน Resize จอ
    window.addEventListener('resize', calculateHeight);

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const el = articleRef.current;
          const bar = progressBarRef.current;

          if (el && bar && cachedTotalHeight > 0) {
            // ใช้ el.getBoundingClientRect().top ได้ เพราะกินสเปกน้อยกว่า scrollHeight
            const rect = el.getBoundingClientRect();
            const scrolled = -rect.top;
            const progress = Math.min(Math.max(scrolled / cachedTotalHeight, 0), 1);

            bar.style.transform = `scaleX(${progress})`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateHeight);
    };
  }, [isClient]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  // Add IDs to headings for TOC
  let headingIndex = 0;

  // Don't render client-specific content until hydrated
  if (!isClient) {
    return (
      <div className="prose prose-lg mx-auto max-w-none overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-xl md:p-12">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {content}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-1"
        style={{ contain: 'layout' }}
      >
        <div
          ref={progressBarRef}
          className="h-full origin-left bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400"
          style={{ transform: 'scaleX(0)', willChange: 'transform' }}
        />
      </div>

      {/* Desktop Floating Reading Controls */}
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="space-y-2 rounded-2xl border border-gray-200/80 bg-white/95 p-3 shadow-xl backdrop-blur-md">
          {/* Font Size Controls */}
          <div className="flex flex-col items-center gap-1">
            <span className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              ตัวอักษร
            </span>
            <button
              onClick={() => setFontSize((prev) => Math.min(prev + 2, 28))}
              aria-label="เพิ่มขนาดตัวอักษร"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-600 transition-all hover:bg-rose-50 hover:text-rose-600"
              title="เพิ่มขนาดตัวอักษร"
            >
              <Plus size={15} />
            </button>
            <span className="text-xs font-bold tabular-nums text-gray-800">{fontSize}</span>
            <button
              onClick={() => setFontSize((prev) => Math.max(prev - 2, 12))}
              aria-label="ลดขนาดตัวอักษร"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-600 transition-all hover:bg-rose-50 hover:text-rose-600"
              title="ลดขนาดตัวอักษร"
            >
              <Minus size={15} />
            </button>
          </div>

          <div className="mx-1 h-px bg-gray-200" />

          {/* Share Button */}
          <div className="flex justify-center">
            <button
              onClick={copyToClipboard}
              aria-label="คัดลอกลิงก์"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-600 transition-all hover:bg-purple-50 hover:text-purple-600"
              title="คัดลอกลิงก์"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Controls Bar - Optimized for iOS */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div
          className="flex items-center justify-center gap-1 border-t border-gray-200 bg-white px-4 py-2.5"
          style={{ boxShadow: '0 -2px 10px rgba(0,0,0,0.05)' }}
        >
          {/* Font Controls */}
          <div className="flex items-center gap-1 rounded-xl bg-gray-50 p-1">
            <Type size={13} className="ml-1.5 text-gray-400" />
            <button
              onClick={() => setFontSize((prev) => Math.max(prev - 2, 12))}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 active:bg-gray-200"
            >
              <Minus size={13} />
            </button>
            <span className="min-w-[28px] text-center text-xs font-bold tabular-nums text-gray-800">
              {fontSize}
            </span>
            <button
              onClick={() => setFontSize((prev) => Math.min(prev + 2, 28))}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 active:bg-gray-200"
            >
              <Plus size={13} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={articleRef}
        className="prose prose-lg mx-auto max-w-none overflow-hidden overflow-x-hidden rounded-3xl border border-gray-100 bg-white pb-16 shadow-xl prose-headings:font-display prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-rose-500 prose-img:rounded-2xl lg:pb-0"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: '1.8',
          minHeight: '60vh',
        }}
      >
        {/* Content with Enhanced Styling */}
        <div
          className="overflow-x-hidden break-words p-4 sm:p-8 md:p-12"
          style={{ contain: 'layout' }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              img: ({ src, alt }) => {
                if (!src || typeof src !== 'string') return null;

                const isNotionImage =
                  src.includes('notion.so') ||
                  src.includes('amazonaws.com') ||
                  src.includes('secure.notion-static.com');
                const imageSrc =
                  isNotionImage || src.startsWith('http')
                    ? `/api/image-proxy?url=${encodeURIComponent(src)}`
                    : src;

                // Get width from Notion (default to 75% for reasonable sizing)
                const notionWidth = imageWidths?.get(src) || 75;

                // Convert percentage to CSS max-width with better breakpoints
                let maxWidth = '100%';
                if (notionWidth <= 25) {
                  maxWidth = '320px'; // very small
                } else if (notionWidth <= 40) {
                  maxWidth = '480px'; // small
                } else if (notionWidth <= 60) {
                  maxWidth = '640px'; // medium
                } else if (notionWidth <= 80) {
                  maxWidth = '800px'; // large
                } else {
                  maxWidth = '960px'; // extra large (not full width to prevent huge images)
                }

                return (
                  <div className="my-6 flex w-full justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageSrc}
                      alt={alt || 'รูปภาพประกอบ'}
                      loading="lazy"
                      decoding="async"
                      className="h-auto rounded-xl shadow-md"
                      style={{
                        maxWidth,
                        width: '100%',
                        display: 'block',
                        objectFit: 'contain',
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const fallback = document.createElement('div');
                          fallback.className =
                            'flex flex-col items-center justify-center gap-3 rounded-xl bg-gray-100 p-12 text-gray-400';
                          fallback.innerHTML = `
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                            <span class="text-sm">ไม่สามารถโหลดรูปได้</span>
                          `;
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>
                );
              },
              h1: ({ children }) => {
                const id = `heading-${headingIndex++}`;
                return (
                  <h1
                    id={id}
                    className="relative mb-8 mt-16 scroll-mt-24 break-words rounded-r-2xl border-l-4 border-rose-400 bg-gradient-to-r from-rose-50 to-transparent py-4 pl-4 font-display text-2xl font-bold sm:pl-6 sm:text-3xl"
                  >
                    {children}
                  </h1>
                );
              },
              h2: ({ children }) => {
                const id = `heading-${headingIndex++}`;
                return (
                  <h2
                    id={id}
                    className="relative mb-6 mt-12 scroll-mt-24 break-words pl-4 font-display text-xl font-bold text-gray-800 sm:pl-6 sm:text-2xl"
                  >
                    {children}
                  </h2>
                );
              },
              h3: ({ children }) => {
                const id = `heading-${headingIndex++}`;
                return (
                  <h3
                    id={id}
                    className="relative mb-4 mt-10 scroll-mt-24 break-words pl-4 font-display text-lg font-bold text-gray-800 sm:text-xl"
                  >
                    {children}
                  </h3>
                );
              },
              p: ({ children, node }: any) => {
                // Check if paragraph contains only an image
                const hasImage = node?.children?.some((child: any) => child.tagName === 'img');

                // If it contains an image, return children without extra wrapper (image div already has my-8)
                if (hasImage) {
                  return <>{children}</>;
                }

                return (
                  <div
                    className="overflow-wrap-anywhere mb-8 text-justify leading-[1.8] text-gray-700 sm:text-left"
                    style={{ minHeight: '1.5rem' }}
                  >
                    {children}
                  </div>
                );
              },
              blockquote: ({ children }) => (
                <blockquote className="relative my-8 rounded-r-2xl border-l-4 border-purple-400 bg-gradient-to-r from-purple-50 to-transparent p-6 italic">
                  {children}
                </blockquote>
              ),
              code: ({ inline, className, children }: any) => {
                const match = /language-(\w+)/.exec(className || '');
                const codeString = String(children).replace(/\n$/, '');

                return !inline && match ? (
                  <div className="group relative my-6">
                    <div className="absolute right-3 top-3 z-10">
                      <button
                        onClick={() => copyCode(codeString)}
                        className="flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-1.5 text-xs text-white opacity-0 transition-all hover:bg-gray-600 group-hover:opacity-100"
                      >
                        {copiedCode === codeString ? (
                          <>
                            <Check size={14} />
                            คัดลอกแล้ว!
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            คัดลอก
                          </>
                        )}
                      </button>
                    </div>
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      className="!my-0 rounded-2xl shadow-2xl"
                      showLineNumbers
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className="rounded border border-gray-200 bg-gray-100 px-2 py-0.5 font-mono text-sm text-gray-800">
                    {children}
                  </code>
                );
              },
              pre: ({ children }: any) => <div>{children}</div>,
              a: (props: any) => (
                <a
                  {...props}
                  className="relative inline-block break-all font-semibold text-rose-500 transition-all duration-200 hover:text-rose-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                />
              ),
              ul: (props: any) => <ul {...props} className="my-6 space-y-2 pl-1" />,
              ol: (props: any) => (
                <ol {...props} className="my-6 list-inside list-decimal space-y-2 pl-6" />
              ),
              li: ({ children }: any) => {
                return (
                  <li className="flex items-start gap-3 text-left">
                    <div className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full bg-rose-400"></div>
                    <div className="flex-1 text-left">{children}</div>
                  </li>
                );
              },
              // Notion Toggle Block Support
              details: ({ children, ...props }: any) => (
                <details
                  {...props}
                  className="notion-toggle group/toggle my-4 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50/80 to-white shadow-sm transition-all duration-300 open:border-rose-300 open:shadow-lg hover:border-rose-200 hover:shadow-md"
                >
                  {children}
                </details>
              ),
              summary: ({ children, ...props }: any) => (
                <summary
                  {...props}
                  className="notion-toggle-summary flex cursor-pointer select-none items-center gap-3 px-5 py-4 font-semibold text-gray-800 outline-none transition-colors hover:bg-rose-50/50 hover:text-rose-600"
                >
                  <ChevronRight
                    size={18}
                    className="notion-toggle-chevron flex-shrink-0 text-rose-400 transition-transform duration-300"
                  />
                  <span className="flex-1">{children}</span>
                </summary>
              ),
              // Table Support (remark-gfm)
              table: ({ children, ...props }: any) => (
                <div className="my-8 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                  <table {...props} className="min-w-full divide-y divide-gray-200 text-sm">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children, ...props }: any) => (
                <thead {...props} className="bg-gray-50/80">
                  {children}
                </thead>
              ),
              tbody: ({ children, ...props }: any) => (
                <tbody {...props} className="divide-y divide-gray-100 bg-white">
                  {children}
                </tbody>
              ),
              tr: ({ children, ...props }: any) => (
                <tr {...props} className="transition-colors hover:bg-rose-50/30">
                  {children}
                </tr>
              ),
              th: ({ children, ...props }: any) => (
                <th
                  {...props}
                  className="whitespace-nowrap px-6 py-4 text-left font-semibold text-gray-900"
                >
                  {children}
                </th>
              ),
              td: ({ children, ...props }: any) => (
                <td {...props} className="px-6 py-4 text-gray-700">
                  {children}
                </td>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
};
