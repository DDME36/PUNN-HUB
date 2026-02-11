import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { Post, NotionPage } from './types';
import { cache } from './cache';

const notion = new Client({
  auth: process.env.NOTION_API_KEY || process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getPublishedPosts = async (): Promise<Post[]> => {
  // Check cache first
  const cached = cache.get<Post[]>('published_posts');
  if (cached) return cached;

  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error('Missing NOTION_DATABASE_ID');

  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
  });

  const posts = response.results.map((page) => {
    const notionPage = page as unknown as NotionPage;

    const title = notionPage.properties.Name?.title?.[0]?.plain_text || 'Untitled';
    const slug = notionPage.properties.Slug?.rich_text?.[0]?.plain_text || notionPage.id;

    let tags: string[] = [];
    if (notionPage.properties.Tags?.multi_select) {
      tags = notionPage.properties.Tags.multi_select.map((tag) => tag.name);
    }

    const date = notionPage.properties.Date?.date?.start || new Date().toISOString();

    return {
      id: notionPage.id,
      title,
      slug,
      tags,
      date,
      cover: notionPage.cover?.external?.url || notionPage.cover?.file?.url || null,
    };
  });

  // Cache for 1 hour
  cache.set('published_posts', posts, 3600);

  return posts;
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  // Check cache first
  const cacheKey = `post_${slug}`;
  const cached = cache.get<Post>(cacheKey);
  if (cached) return cached;

  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error('Missing NOTION_DATABASE_ID');

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
  const title = notionPage.properties.Name?.title?.[0]?.plain_text || 'Untitled';
  const date = notionPage.properties.Date?.date?.start || new Date().toISOString();

  let tags: string[] = [];
  if (notionPage.properties.Tags?.multi_select) {
    tags = notionPage.properties.Tags.multi_select.map((tag) => tag.name);
  }

  const post: Post = {
    id: notionPage.id,
    title,
    slug,
    date,
    tags,
    cover: notionPage.cover?.external?.url || notionPage.cover?.file?.url || null,
  };

  // Cache for 1 hour
  cache.set(cacheKey, post, 3600);

  return post;
};

export const getPostContent = async (pageId: string) => {
  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);
  return mdString.parent;
};
