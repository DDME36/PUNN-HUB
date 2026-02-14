import { getPostBySlug, getPostContent, getPublishedPosts } from '@/lib/notion';
import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/Card';
import { Footer } from '@/components/Footer';
import { BlogPostContent } from '@/components/BlogPostContent';
import { ShareButtons } from '@/components/ShareButtons';
import { TableOfContents } from '@/components/TableOfContents';
import { BackToTop } from '@/components/BackToTop';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Tag, Clock, User, FileX } from 'lucide-react';
import { Metadata } from 'next';

export const revalidate = 3600; // ขณะ production ใช้ 1 ชั่วโมง

export async function generateStaticParams() {
  const posts = await getPublishedPosts().catch(() => []);
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const content = await getPostContent(post.id).catch(() => '');
  const description =
    content
      .slice(0, 160)
      .replace(/[#*`\n]/g, ' ')
      .trim() || `อ่านบทความ "${post.title}" ใน PUNN HUB`;

  return {
    title: `${post.title} - PUNN HUB`,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      url: `https://punn.site/blog/${slug}`,
      siteName: 'PUNN HUB',
      images: post.cover
        ? [
            {
              url: post.cover,
              width: 1200,
              height: 630,
              alt: post.title,
              type: 'image/png',
            },
          ]
        : [
            {
              url: 'https://punn.site/icon-512.png',
              width: 512,
              height: 512,
              alt: 'PUNN HUB',
              type: 'image/png',
            },
          ],
      locale: 'th_TH',
      type: 'article',
      publishedTime: post.date,
      authors: ['Satayu Pongpan'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: post.cover ? [post.cover] : ['https://punn.site/icon-512.png'],
      creator: '@punnhub',
      site: '@punnhub',
    },
    other: {
      'theme-color': '#fb7185',
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="mx-auto max-w-3xl px-4 pt-20 text-center">
          <div className="mb-8">
            <FileX className="mx-auto h-32 w-32 text-gray-300" />
          </div>
          <h1 className="mb-6 text-4xl font-bold text-gray-400">ไม่พบบทความนี้</h1>
          <p className="mb-8 text-lg text-gray-500">บทความอาจถูกลบหรือ URL ไม่ถูกต้อง</p>
          <Link
            href="/blog"
            className="inline-flex transform items-center gap-2 rounded-full bg-gradient-to-r from-rose-400 to-purple-400 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-[0_12px_40px_rgb(251,113,133,0.4)]"
          >
            <ArrowLeft size={20} /> กลับไปหน้าบทความ
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const content = await getPostContent(post.id);
  const allPosts = await getPublishedPosts().catch(() => []);

  // หาบทความที่เกี่ยวข้องตาม tags
  const relatedPosts = allPosts
    .filter((p: any) => p.id !== post.id)
    .map((p: any) => {
      // นับจำนวน tags ที่ตรงกัน
      const matchingTags = p.tags.filter((tag: string) => post.tags.includes(tag)).length;
      return { ...p, matchingTags };
    })
    .sort((a: any, b: any) => {
      // เรียงตามจำนวน tags ที่ตรงกัน แล้วตามวันที่
      if (b.matchingTags !== a.matchingTags) {
        return b.matchingTags - a.matchingTags;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  // Calculate reading time (more accurate)
  const wordsPerMinute = 200;
  const wordCount = content ? content.split(/\s+/).length : 0;
  const readingTime = Math.max(Math.ceil(wordCount / wordsPerMinute), 1); // Minimum 1 minute

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar posts={allPosts} />

      {/* Enhanced Breadcrumb */}
      <div className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="font-medium transition-colors hover:text-rose-500">
              หน้าแรก
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/blog" className="font-medium transition-colors hover:text-rose-500">
              บทความ
            </Link>
            <span className="text-gray-300">/</span>
            <span className="truncate font-semibold text-gray-900">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-4 py-12">
        {/* Table of Contents */}
        <TableOfContents content={content} />

        {/* Hero Cover Image */}
        {post.cover && (
          <div className="group relative mb-12 h-72 w-full overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl md:h-96 lg:h-[500px]">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: 'center 40%' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              unoptimized={post.cover.includes('notion.so') || post.cover.includes('amazonaws.com')}
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-md"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Article Header */}
        <header className="mx-auto mb-16 max-w-4xl text-center">
          {/* Tags (if no cover image) */}
          {!post.cover && (
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full border border-emerald-200 bg-gradient-to-r from-emerald-100 to-blue-100 px-4 py-2 text-sm font-bold text-emerald-700"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text font-display text-3xl font-black leading-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          {/* Enhanced Meta Info */}
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/60 bg-white/90 p-6 text-sm text-gray-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md sm:flex-row sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-rose-200">
                <User size={14} className="text-rose-600" />
              </div>
              <span className="font-medium">PUNN</span>
            </div>
            <div className="hidden h-6 w-px bg-gray-200 sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200">
                <Calendar size={14} className="text-blue-600" />
              </div>
              <span suppressHydrationWarning className="text-center sm:text-left">
                {new Date(post.date).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="hidden h-6 w-px bg-gray-200 sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-purple-200">
                <Clock size={14} className="text-purple-600" />
              </div>
              <span>อ่าน {readingTime} นาที</span>
            </div>
          </div>
        </header>

        {/* Enhanced Article Content */}
        <BlogPostContent content={content} title={post.title} />

        {/* Enhanced Share Section */}
        <ShareButtons title={post.title} url={`https://punn.site/blog/${slug}`} />
      </article>

      {/* Enhanced Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-gray-100 bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-10 text-center">
              <h2 className="mb-3 font-display text-3xl font-bold text-gray-800">
                บทความที่เกี่ยวข้อง
              </h2>
              <p className="text-gray-600">บทความอื่นๆ ที่คุณอาจสนใจ</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((p: any, index: number) => (
                <Card
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group h-full transform !border-gray-100 bg-white/90 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-rose-200 hover:shadow-xl"
                >
                  <div className="relative -mx-6 -mt-6 mb-4 h-40 overflow-hidden rounded-t-2xl bg-gradient-to-br from-rose-100 via-purple-100 to-blue-100">
                    {p.cover ? (
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        style={{ objectPosition: 'center 35%' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized={
                          p.cover.includes('notion.so') || p.cover.includes('amazonaws.com')
                        }
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-rose-400">
                        <BookOpen size={32} />
                      </div>
                    )}
                  </div>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 2).map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-rose-100 bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-2 line-clamp-2 font-display text-lg font-bold transition-colors group-hover:text-rose-500">
                    {p.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span suppressHydrationWarning>
                      {new Date(p.date).toLocaleDateString('th-TH', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex transform items-center gap-2 rounded-full bg-gradient-to-r from-rose-400 to-purple-400 px-8 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-[0_12px_40px_rgb(251,113,133,0.4)]"
              >
                ดูบทความทั้งหมด <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Navigation */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-10">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Link
            href="/blog"
            className="inline-flex transform items-center gap-3 rounded-full border border-gray-200 bg-white/90 px-8 py-3 font-semibold text-gray-700 shadow-md backdrop-blur-md transition-all hover:scale-105 hover:border-rose-200 hover:text-rose-500 hover:shadow-lg"
          >
            <ArrowLeft size={18} /> กลับไปหน้าบทความรวม
          </Link>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
}
