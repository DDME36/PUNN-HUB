import { getPublishedPosts } from '@/lib/notion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BlogList } from '@/components/BlogList';
import { BackToTop } from '@/components/BackToTop';
import { Metadata } from 'next';

export const revalidate = 3600; // ขณะ production ใช้ 1 ชั่วโมง

export const metadata: Metadata = {
  title: 'บทความ - PUNN HUB',
  description:
    'แชร์ความรู้และประสบการณ์ด้านเทคโนโลยี | Next.js, React, TypeScript, Web Development',
  openGraph: {
    title: 'บทความ - PUNN HUB',
    description: 'แชร์ความรู้และประสบการณ์ด้านเทคโนโลยี',
    type: 'website',
  },
};

export default async function BlogPage() {
  let posts: any[] = [];
  let error = null;

  try {
    posts = await getPublishedPosts();
  } catch (e) {
    console.error(e);
    error = 'ไม่สามารถดึงข้อมูลจาก Notion ได้ (ตรวจสอบ Token หรือ Integration)';
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar posts={posts} />
      <BlogList posts={posts} error={error} />
      <Footer />
      <BackToTop />
    </div>
  );
}
