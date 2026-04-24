'use client';

import { useState, useEffect, useRef } from 'react';
import { Copy, Check, Minus, Plus, Type, Image as ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import { slugify, extractText } from '@/lib/utils';

interface BlogPostContentProps {
  content: string;
  title: string;
}

const ImageWithReveal = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative my-10 flex w-full flex-col items-center">
      <div className={`relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-700 ${loaded ? 'scale-100' : 'scale-95 blur-lg bg-gray-100'}`}>
        {!loaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50">
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ImageIcon className="text-gray-300" size={40} />
            </motion.div>
          </div>
        )}
        
        {error ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-gray-50 p-12 text-gray-400 border border-gray-100">
            <XIcon size={32} />
            <span className="text-sm font-medium">ไม่สามารถโหลดรูปได้</span>
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`max-h-[75vh] w-auto object-contain transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </div>
      {alt && loaded && (
        <span className="mt-4 text-center text-xs font-medium italic text-gray-400 tracking-wide">
          — {alt} —
        </span>
      )}
    </div>
  );
};

const XIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const BlogPostContent = ({ content, title }: BlogPostContentProps) => {
  const [fontSize, setFontSize] = useState(18);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    const updateSettings = () => {
      if (window.innerWidth >= 1024) setFontSize(18);
      else if (window.innerWidth >= 640) setFontSize(17);
      else setFontSize(16);
    };
    updateSettings();
    window.addEventListener('resize', updateSettings);
    return () => window.removeEventListener('resize', updateSettings);
  }, [title]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) { console.error(err); }
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) { console.error(err); }
  };

  if (!isClient) return <div className="h-96 w-full animate-pulse rounded-3xl bg-gray-50" />;

  return (
    <>
      {/* Premium Reading Controls */}
      <div className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-2 rounded-3xl border border-gray-200/50 bg-white/70 p-2 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex flex-col items-center gap-1 p-2">
            <button
              onClick={() => setFontSize((p) => Math.min(p + 1, 24))}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-500 transition-all"
            >
              <Plus size={16} />
            </button>
            <div className="py-1 text-[10px] font-black text-gray-400 tabular-nums">{fontSize}</div>
            <button
              onClick={() => setFontSize((p) => Math.max(p - 1, 14))}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-500 transition-all"
            >
              <Minus size={16} />
            </button>
          </div>
          <div className="h-px bg-gray-100 mx-2" />
          <div className="flex justify-center p-2">
            <button
              onClick={copyToClipboard}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-all"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        ref={articleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-lg mx-auto max-w-none overflow-visible rounded-[40px] border border-gray-100 bg-white/80 pb-20 shadow-2xl backdrop-blur-sm prose-headings:font-display prose-headings:tracking-tight prose-a:no-underline"
        style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
      >
        <div className="p-6 sm:p-12 md:p-16 lg:p-20">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            components={{
              img: ({ src, alt }: any) => <ImageWithReveal src={src} alt={alt} />,
              h1: ({ children }) => {
                const id = slugify(extractText(children));
                return (
                  <h1 id={id} className="relative mb-10 mt-20 scroll-mt-[120px] text-3xl font-black text-gray-900 md:text-4xl">
                    <span className="absolute -left-6 top-0 h-full w-1.5 rounded-full bg-gradient-to-b from-rose-400 to-purple-500" />
                    {children}
                  </h1>
                );
              },
              h2: ({ children }) => {
                const id = slugify(extractText(children));
                return (
                  <h2 id={id} className="mb-8 mt-16 scroll-mt-[120px] text-2xl font-bold text-gray-800 md:text-3xl">
                    {children}
                  </h2>
                );
              },
              h3: ({ children }) => {
                const id = slugify(extractText(children));
                return <h3 id={id} className="mb-6 mt-12 scroll-mt-[120px] text-xl font-bold text-gray-800 md:text-2xl">{children}</h3>;
              },
              p: ({ children, node }: any) => {
                if (node?.children?.some((child: any) => child.tagName === 'img')) return <>{children}</>;
                return <p className="mb-8 text-gray-600 leading-relaxed md:leading-loose text-justify sm:text-left">{children}</p>;
              },
              blockquote: ({ children }) => (
                <blockquote className="my-10 rounded-3xl border-l-0 bg-gradient-to-br from-rose-50/50 to-purple-50/50 p-8 md:p-10 italic shadow-inner">
                  <div className="text-rose-500 mb-4 font-serif text-4xl opacity-50">“</div>
                  <div className="text-gray-600 font-medium leading-relaxed">{children}</div>
                </blockquote>
              ),
              a: ({ children, href }: any) => (
                <a 
                  href={href} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="relative inline-block font-bold text-rose-500 group"
                >
                  {children}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-rose-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ),
              ul: (props: any) => <ul {...props} className="my-8 space-y-4" />,
              li: ({ children }: any) => (
                <li className="flex items-start gap-4">
                  <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                  <div className="text-gray-600">{children}</div>
                </li>
              ),
              code: ({ inline, className, children }: any) => {
                const match = /language-(\w+)/.exec(className || '');
                const codeString = String(children).replace(/\n$/, '');
                return !inline && match ? (
                  <div className="group relative my-10 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-200">
                    <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
                      <button
                        onClick={() => copyCode(codeString)}
                        className="rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
                      >
                        {copiedCode === codeString ? <Check size={14} className="text-green-400" /> : 'Copy'}
                      </button>
                    </div>
                    <div className="bg-gray-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-white/5">
                      {match[1]}
                    </div>
                    <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" className="!m-0 !bg-gray-900 !p-6" showLineNumbers>
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className="rounded-lg bg-rose-50 px-2 py-0.5 font-mono text-sm font-bold text-rose-600">
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </motion.div>
    </>
  );
};
