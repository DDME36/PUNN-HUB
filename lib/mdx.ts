import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from './types';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Helper to construct a post object from matter result
const getPostData = (relativeFilePath: string): Post | null => {
  try {
    // Generate flat slug from basename e.g. "ee-101/ee-101-ep1-vir.md" -> "ee-101-ep1-vir"
    const slug = path.basename(relativeFilePath, '.md');
    const fullPath = path.join(postsDirectory, relativeFilePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse frontmatter
    const matterResult = matter(fileContents);
    const { title, date, tags, cover, isParent, parentSlug, episodeNumber, coverPosition } = matterResult.data;

    return {
      id: slug, // Using slug as ID for local files
      slug,
      title: title || 'Untitled',
      date: date || new Date().toISOString(),
      tags: tags || [],
      cover: cover || null,
      content: matterResult.content,
      isParent: isParent || false,
      parentSlug: parentSlug || undefined,
      episodeNumber: episodeNumber || undefined,
      coverPosition: coverPosition || 'center',
    };
  } catch (error) {
    console.error(`Error reading post ${relativeFilePath}:`, error);
    return null;
  }
};

// Recursive helper to get all markdown files
const getAllMarkdownFiles = (dirPath: string, arrayOfFiles: string[] = []) => {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllMarkdownFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.md')) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
};

// Get all published posts
export const getPublishedPosts = async (): Promise<Post[]> => {
  try {
    const allFilePaths = getAllMarkdownFiles(postsDirectory);
    
    // Convert absolute paths to relative paths for getPostData
    const fileNames = allFilePaths.map((fullPath) => path.relative(postsDirectory, fullPath));
    
    const posts: Post[] = fileNames
      .map((fileName) => getPostData(fileName))
      .filter((post): post is Post => post !== null)
      // Sort posts by date
      .sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        } else {
          return -1;
        }
      });

    return posts;
  } catch (error) {
    console.error('Error fetching matching local md posts:', error);
    return [];
  }
};

// Get a post by its slug (Searches all posts since slugs are flat)
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const allPosts = await getPublishedPosts();
  return allPosts.find((post) => post.slug === slug) || null;
};

// Getting content is now basically synchronous and included in getPostBySlug
export const getPostContent = async (idOrSlug: string): Promise<string> => {
  const post = await getPostBySlug(idOrSlug);
  return post?.content || 'เนื้อหาไม่พร้อมใช้งาน ณ ตอนนี้ หรือไฟล์ยังไม่ได้ถูกสร้าง';
};

// Episodes
export const getEpisodesByParentSlug = async (parentSlug: string): Promise<Post[]> => {
  try {
    const allPosts = await getPublishedPosts();
    
    const episodes = allPosts
      .filter((post) => post.parentSlug === parentSlug)
      .sort((a, b) => {
        const epA = a.episodeNumber || 0;
        const epB = b.episodeNumber || 0;
        return epA - epB;
      });

    return episodes;
  } catch (error) {
    console.error('Error fetching episodes from local md:', error);
    return [];
  }
};
