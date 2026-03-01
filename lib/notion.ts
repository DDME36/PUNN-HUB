import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { Post, NotionPage } from './types';
import { unstable_cache } from 'next/cache';

const notion = new Client({
  auth: process.env.NOTION_API_KEY || process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

// Helper function to map Notion page to Post (DRY principle)
const mapNotionPageToPost = (notionPage: NotionPage): Post => {
  const title = notionPage.properties.Name?.title?.[0]?.plain_text || 'Untitled';
  const slug = notionPage.properties.Slug?.rich_text?.[0]?.plain_text || notionPage.id;

  // Handle Tags - support both Multi-select and Rich Text
  let tags: string[] = [];
  if (notionPage.properties.Tags?.multi_select) {
    tags = notionPage.properties.Tags.multi_select.map((tag) => tag.name);
  } else if ((notionPage.properties.Tags as any)?.rich_text?.[0]?.plain_text) {
    // Fallback: if Tags is Rich Text, split by comma
    const tagsText = (notionPage.properties.Tags as any).rich_text[0].plain_text;
    tags = tagsText.split(',').map((tag: string) => tag.trim()).filter(Boolean);
  }

  const date = notionPage.properties.Date?.date?.start || new Date().toISOString();
  const isParent = notionPage.properties.IsParent?.checkbox || false;
  const parentSlug = notionPage.properties.ParentSlug?.rich_text?.[0]?.plain_text || undefined;
  const episodeNumber = notionPage.properties.EpisodeNumber?.number || undefined;

  const rawCover = notionPage.cover?.external?.url || notionPage.cover?.file?.url || null;
  let cover = rawCover;

  if (
    rawCover &&
    (rawCover.includes('notion.so') ||
      rawCover.includes('amazonaws.com') ||
      rawCover.includes('secure.notion-static.com'))
  ) {
    cover = `/api/image-proxy?url=${encodeURIComponent(rawCover)}`;
  }

  return {
    id: notionPage.id,
    title,
    slug,
    tags,
    date,
    cover,
    isParent,
    parentSlug,
    episodeNumber,
  };
};

export const getPublishedPosts = unstable_cache(
  async (): Promise<Post[]> => {
    try {
      const databaseId = process.env.NOTION_DATABASE_ID;
      if (!databaseId) {
        console.error('❌ NOTION_DATABASE_ID is not set');
        return [];
      }

      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        sorts: [
          {
            timestamp: 'created_time',
            direction: 'descending',
          },
        ],
      });

      console.log(`✅ Fetched ${response.results.length} published posts from Notion`);

      const posts = response.results.map((page) => {
        const notionPage = page as unknown as NotionPage;
        return mapNotionPageToPost(notionPage);
      });

      return posts;
    } catch (e) {
      console.error('❌ Error fetching Notion posts:', e);
      return [];
    }
  },
  ['notion-published-posts'],
  {
    tags: ['notion-posts'],
    revalidate: 3600, // 1 hour instead of 24 hours
  }
);

export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    try {
      const databaseId = process.env.NOTION_DATABASE_ID;
      if (!databaseId) return null;

      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'Slug',
          rich_text: {
            equals: slug,
          },
        },
      });

      const page = response.results[0];
      if (!page) return null;

      const notionPage = page as unknown as NotionPage;
      return mapNotionPageToPost(notionPage);
    } catch (e) {
      console.error('❌ Error fetching post by slug:', e);
      return null;
    }
  },
  ['notion-post-by-slug'],
  {
    tags: ['notion-posts'],
    revalidate: 3600, // 1 hour
  }
);

export const getPostContent = async (pageId: string): Promise<string> => {
  try {
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);
    return mdString.parent || '';
  } catch (error) {
    return 'ไม่พบเนื้อหาบทความเนื่องจาก API รันไม่สำเร็จ ลองใส่ API Key ที่ `.env.local` เพื่อดูเนื้อหาจริงครับ';
  }
};

// Get image blocks with their metadata from Notion
// Note: Notion API doesn't expose the visual width that users set by dragging corners
// This is a known API limitation - width is a UI-only feature not available via API
export const getImageBlocks = async (pageId: string): Promise<Map<string, number>> => {
  try {
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
    });

    const imageWidths = new Map<string, number>();

    for (const block of blocks.results) {
      if ('type' in block && block.type === 'image') {
        const imageBlock = block as any;
        const imageUrl = imageBlock.image?.external?.url || imageBlock.image?.file?.url || null;

        if (imageUrl) {
          // Check if caption contains width hint like [width:50] or [w:50]
          const caption = imageBlock.image?.caption?.[0]?.plain_text || '';
          const widthMatch = caption.match(/\[w(?:idth)?:(\d+)\]/i);

          // Use caption width if specified, otherwise default to 75% (reasonable default)
          const width = widthMatch ? parseInt(widthMatch[1]) : 75;
          imageWidths.set(imageUrl, width);
        }
      }
    }

    return imageWidths;
  } catch (error) {
    console.error('Error fetching image blocks:', error);
    return new Map();
  }
};

export const getEpisodesByParentSlug = unstable_cache(
  async (parentSlug: string): Promise<Post[]> => {
    try {
      const databaseId = process.env.NOTION_DATABASE_ID;
      if (!databaseId) return [];

      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'ParentSlug',
          rich_text: {
            equals: parentSlug,
          },
        },
        sorts: [
          {
            property: 'EpisodeNumber',
            direction: 'ascending',
          },
        ],
      });

      const episodes = response.results.map((page) => {
        const notionPage = page as unknown as NotionPage;
        return mapNotionPageToPost(notionPage);
      });

      return episodes;
    } catch (e) {
      console.error('❌ Error fetching episodes:', e);
      return [];
    }
  },
  ['notion-episodes-by-parent'],
  {
    tags: ['notion-posts'],
    revalidate: 3600, // 1 hour
  }
);
