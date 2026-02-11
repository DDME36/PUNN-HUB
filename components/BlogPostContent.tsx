'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Minus, Plus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface BlogPostContentProps {
  content: string;
  title: string;
}

export const BlogPostContent = ({ content, title }: BlogPostContentProps) => {
  const [fontSize, setFontSize] = useState(16);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Initialize client-side only values
  useEffect(() => {
    setIsClient(true);
    // ตั้งค่า font size ตามขนาดหน้าจอ
    const updateFontSize = () => {
      if (window.innerWidth >= 768) {
        setFontSize(20);
      } else {
        setFontSize(16);
      }
    };
    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, [title]);

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
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  }

  return (
    <>
      {/* Floating Reading Controls - Subtle */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      >
        <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
          {/* Font Size Controls */}
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setFontSize((prev) => Math.min(prev + 2, 24))}
              aria-label="เพิ่มขนาดตัวอักษร"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              title="Increase Font Size"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={() => setFontSize((prev) => Math.max(prev - 2, 12))}
              aria-label="ลดขนาดตัวอักษร"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              title="Decrease Font Size"
            >
              <Minus size={16} />
            </button>
          </div>

          {/* Share Button */}
          <button
            onClick={copyToClipboard}
            aria-label="คัดลอกลิงก์"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
            title="Copy Link"
          >
            {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
          </button>
        </div>
      </motion.div>

      {/* Enhanced Article Content - Clean White Background */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="prose prose-lg mx-auto max-w-none overflow-hidden overflow-x-hidden rounded-3xl border border-gray-100 bg-white shadow-xl"
        style={{ fontSize: `${fontSize}px` }}
      >
        {/* Content with Enhanced Styling */}
        <div className="overflow-x-hidden break-words p-4 sm:p-8 md:p-12">
          <ReactMarkdown
            components={{
              img: ({ node, src, alt, ...props }) => {
                if (!src || typeof src !== 'string') return null;
                return (
                  <figure className="relative my-8 flex w-full justify-center">
                    <img
                      src={src}
                      alt={alt || 'รูปภาพประกอบ'}
                      className="hover:shadow-3xl h-auto w-full max-w-3xl rounded-2xl object-contain shadow-2xl transition-shadow duration-500"
                      loading="lazy"
                    />
                  </figure>
                );
              },
              h1: ({ node, children, ...props }) => {
                const id = `heading-${headingIndex++}`;
                return (
                  <h1
                    id={id}
                    className="relative mb-8 mt-16 scroll-mt-24 break-words rounded-r-2xl border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-50 to-transparent py-4 pl-4 font-display text-2xl font-bold sm:pl-6 sm:text-3xl"
                  >
                    <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-emerald-500"></div>
                    {children}
                  </h1>
                );
              },
              h2: ({ node, children, ...props }) => {
                const id = `heading-${headingIndex++}`;
                return (
                  <h2
                    id={id}
                    className="relative mb-6 mt-12 scroll-mt-24 break-words pl-4 font-display text-xl font-bold text-gray-800 sm:pl-6 sm:text-2xl"
                  >
                    <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-blue-500"></div>
                    {children}
                  </h2>
                );
              },
              h3: ({ node, children, ...props }) => {
                const id = `heading-${headingIndex++}`;
                return (
                  <h3
                    id={id}
                    className="relative mb-4 mt-10 scroll-mt-24 break-words pl-4 font-display text-lg font-bold text-gray-800 sm:text-xl"
                  >
                    <div className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-purple-500"></div>
                    {children}
                  </h3>
                );
              },
              p: ({ node, children, ...props }) => {
                // Check if paragraph contains only an image
                const hasImage = node?.children?.some((child: any) => child.tagName === 'img');

                // If it contains an image, return children without wrapper
                if (hasImage) {
                  return <>{children}</>;
                }

                return (
                  <p className="overflow-wrap-anywhere mb-6 break-words text-center leading-relaxed text-gray-700">
                    {children}
                  </p>
                );
              },
              blockquote: ({ node, children, ...props }) => (
                <blockquote className="relative my-8 rounded-r-2xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent p-6 italic">
                  <div className="absolute -left-2 top-6 h-4 w-4 rounded-full bg-blue-500"></div>
                  {children}
                </blockquote>
              ),
              code: ({ node, inline, className, children, ...props }: any) => {
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
                      {...props}
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code
                    className="rounded border border-gray-200 bg-gray-100 px-2 py-0.5 font-mono text-sm text-gray-800"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre: ({ node, children, ...props }: any) => <div>{children}</div>,
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  className="relative inline-block font-semibold text-emerald-600 transition-all duration-200 hover:text-emerald-700 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                />
              ),
              ul: ({ node, ...props }) => <ul {...props} className="my-6 space-y-2" />,
              li: ({ node, children, ...props }) => (
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500"></div>
                  <div>{children}</div>
                </li>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </motion.div>
    </>
  );
};
