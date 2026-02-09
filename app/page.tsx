import { getPublishedPosts } from "@/lib/notion";
import { EnhancedBentoGrid } from "@/components/EnhancedBentoGrid";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TechStackMarquee } from "@/components/TechStackMarquee";

export const revalidate = 3600; // ISR: Revalidate every 1 hour (production)

export default async function Home() {
  const posts = await getPublishedPosts().catch((err) => {
    console.error("Failed to fetch Notion posts:", err);
    return [];
  });

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar posts={posts} />
      <Hero />
      <Marquee />
      <section id="projects">
        <EnhancedBentoGrid posts={posts} />
      </section>
      <TechStackMarquee />
      <Footer />
    </main>
  );
}
