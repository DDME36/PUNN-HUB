import { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/lib/notion'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://punn.site'
  
  // Get all blog posts
  const posts = await getPublishedPosts().catch(() => [])
  
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...blogPosts,
  ]
}
