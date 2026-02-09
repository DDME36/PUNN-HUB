import { getPostBySlug, getPostContent, getPublishedPosts } from "@/lib/notion";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/Card";
import { Footer } from "@/components/Footer";
import { BlogPostContent } from "@/components/BlogPostContent";
import { ShareButtons } from "@/components/ShareButtons";
import { TableOfContents } from "@/components/TableOfContents";
import { BackToTop } from "@/components/BackToTop";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Tag, Clock, User, FileX } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 3600; // ขณะ production ใช้ 1 ชั่วโมง

export async function generateStaticParams() {
    const posts = await getPublishedPosts().catch(() => []);
    return posts.map((post: any) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug).catch(() => null);

    if (!post) {
        return {
            title: "Article Not Found",
        }
    }

    const content = await getPostContent(post.id).catch(() => "");
    const description = content.slice(0, 160).replace(/[#*`\n]/g, ' ').trim() || `อ่านบทความ "${post.title}" ใน PUNN HUB`;

    return {
        title: `${post.title} - PUNN HUB`,
        description: description,
        openGraph: {
            title: post.title,
            description: description,
            url: `https://punn.site/blog/${slug}`,
            siteName: 'PUNN HUB',
            images: post.cover ? [
                {
                    url: post.cover,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                    type: 'image/png',
                }
            ] : [
                {
                    url: 'https://punn.site/icon-512.png',
                    width: 512,
                    height: 512,
                    alt: 'PUNN HUB',
                    type: 'image/png',
                }
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
        }
    }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug).catch(() => null);

    if (!post) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <Navbar />
                <div className="max-w-3xl mx-auto px-4 pt-20 text-center">
                    <div className="mb-8">
                        <FileX className="w-32 h-32 text-gray-300 mx-auto" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-400 mb-6">ไม่พบบทความนี้</h1>
                    <p className="text-gray-500 mb-8 text-lg">บทความอาจถูกลบหรือ URL ไม่ถูกต้อง</p>
                    <Link href="/blog" className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-400 to-purple-400 text-white px-8 py-4 rounded-full font-bold hover:shadow-[0_12px_40px_rgb(251,113,133,0.4)] transition-all transform hover:scale-105 shadow-lg">
                        <ArrowLeft size={20} /> กลับไปหน้าบทความ
                    </Link>
                </div>
                <Footer />
            </div>
        )
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
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar posts={allPosts} />

            {/* Enhanced Breadcrumb */}
            <div className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-4 py-3">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-rose-500 transition-colors font-medium">หน้าแรก</Link>
                        <span className="text-gray-300">/</span>
                        <Link href="/blog" className="hover:text-rose-500 transition-colors font-medium">บทความ</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-900 font-semibold truncate">{post.title}</span>
                    </nav>
                </div>
            </div>

            <article className="max-w-5xl mx-auto px-4 py-12">
                {/* Table of Contents */}
                <TableOfContents content={content} />

                {/* Hero Cover Image */}
                {post.cover && (
                    <div className="relative w-full h-72 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl group bg-gradient-to-br from-gray-100 to-gray-200">
                        <Image
                            src={post.cover}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            style={{ objectPosition: 'center 40%' }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag: string) => (
                                    <span key={tag} className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 border border-white/30">
                                        <Tag size={12} />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Article Header */}
                <header className="mb-16 text-center max-w-4xl mx-auto">
                    {/* Tags (if no cover image) */}
                    {!post.cover && (
                        <div className="flex justify-center flex-wrap gap-2 mb-8">
                            {post.tags.map((tag: string) => (
                                <span key={tag} className="bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 border border-emerald-200">
                                    <Tag size={12} />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display mb-8 leading-tight text-gray-900 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text">
                        {post.title}
                    </h1>

                    {/* Enhanced Meta Info */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-gray-600 text-sm bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center">
                                <User size={14} className="text-rose-600" />
                            </div>
                            <span className="font-medium">PUNN</span>
                        </div>
                        <div className="hidden sm:block w-px h-6 bg-gray-200"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                                <Calendar size={14} className="text-blue-600" />
                            </div>
                            <span className="text-center sm:text-left" suppressHydrationWarning>{new Date(post.date).toLocaleDateString("th-TH", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>
                        <div className="hidden sm:block w-px h-6 bg-gray-200"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                                <Clock size={14} className="text-purple-600" />
                            </div>
                            <span>อ่าน {readingTime} นาที</span>
                        </div>
                    </div>
                </header>

                {/* Enhanced Article Content */}
                <BlogPostContent content={content} title={post.title} />

                {/* Enhanced Share Section */}
                <ShareButtons 
                    title={post.title} 
                    url={`https://punn.site/blog/${slug}`}
                />
            </article>

            {/* Enhanced Related Articles */}
            {relatedPosts.length > 0 && (
                <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 border-t border-gray-100">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold font-display text-gray-800 mb-3">บทความที่เกี่ยวข้อง</h2>
                            <p className="text-gray-600">บทความอื่นๆ ที่คุณอาจสนใจ</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedPosts.map((p: any, index: number) => (
                                <Card key={p.id} href={`/blog/${p.slug}`} className="h-full !border-gray-100 hover:border-rose-200 hover:shadow-xl transition-all duration-500 bg-white/90 backdrop-blur-md group transform hover:-translate-y-2">
                                    <div className="h-40 -mt-6 -mx-6 mb-4 overflow-hidden rounded-t-2xl relative bg-gradient-to-br from-rose-100 via-purple-100 to-blue-100">
                                        {p.cover ? (
                                            <Image
                                                src={p.cover}
                                                alt={p.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                style={{ objectPosition: 'center 35%' }}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-rose-400">
                                                <BookOpen size={32} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {p.tags.slice(0, 2).map((tag: string) => (
                                            <span key={tag} className="bg-rose-50 text-rose-600 px-2.5 py-1 rounded-lg text-xs font-medium border border-rose-100">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="font-bold font-display text-lg mb-2 line-clamp-2 group-hover:text-rose-500 transition-colors">{p.title}</h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto">
                                        <Calendar size={12} />
                                        <span suppressHydrationWarning>{new Date(p.date).toLocaleDateString("th-TH", {
                                            month: 'short',
                                            day: 'numeric'
                                        })}</span>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center mt-10">
                            <Link href="/blog" className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-400 to-purple-400 text-white px-8 py-3 rounded-full font-bold hover:shadow-[0_12px_40px_rgb(251,113,133,0.4)] transition-all transform hover:scale-105 shadow-lg">
                                ดูบทความทั้งหมด <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Enhanced Navigation */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-10">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Link href="/blog" className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md border border-gray-200 hover:border-rose-200 text-gray-700 hover:text-rose-500 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
                        <ArrowLeft size={18} /> กลับไปหน้าบทความรวม
                    </Link>
                </div>
            </div>

            <Footer />
            <BackToTop />
        </div>
    );
}
