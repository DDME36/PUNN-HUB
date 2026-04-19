import fs from 'fs';
import path from 'path';

const SLUGS = [
  'HowToUsePurrDrop',
  'CompleteDiscordQuest',
  'HowToUseHeartopiano',
  'HackGameHeartopia',
];

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'posts');
const COVERS_DIR = path.join(process.cwd(), 'public', 'images', 'covers');

// Create directories if they don't exist
[POSTS_DIR, IMAGES_DIR, COVERS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  try {
    // Some URLs are Notion proxies like /api/image-proxy?url=XYZ.
    // We need to decode them if they are proxies.
    let targetUrl = url;
    if (url.startsWith('/api/image-proxy?url=')) {
      targetUrl = decodeURIComponent(url.replace('/api/image-proxy?url=', ''));
    } else if (url.startsWith('https://punn.site/api/image-proxy?url=')) {
      targetUrl = decodeURIComponent(url.replace('https://punn.site/api/image-proxy?url=', ''));
    }

    // Force https
    if (targetUrl.startsWith('http://')) {
      targetUrl = targetUrl.replace('http://', 'https://');
    }

    if (!targetUrl.startsWith('http')) {
        console.log(`Skipping local or invalid image: ${targetUrl}`);
        return false;
    }

    const response = await fetch(targetUrl);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filepath, buffer);
    return true;
  } catch (error) {
    console.error(`Error downloading image ${url}:`, error);
    return false;
  }
}

async function migratePost(slug: string) {
  console.log(`Migrating post: ${slug}...`);
  try {
    const response = await fetch(`https://punn.site/api/posts/${slug}`);
    if (!response.ok) throw new Error(`Failed to fetch post data: ${response.statusText}`);
    
    const post = await response.json();
    let content = post.content || '';
    
    // 1. Handle Cover Image
    let newCoverUrl = '';
    if (post.cover && typeof post.cover === 'string' && post.cover.length > 0) {
      const ext = '.png'; // default
      const coverFilename = `${slug}-cover${ext}`;
      const coverFilepath = path.join(COVERS_DIR, coverFilename);
      
      console.log(`  Downloading cover image...`);
      const success = await downloadImage(post.cover, coverFilepath);
      if (success) {
        newCoverUrl = `/images/covers/${coverFilename}`;
      } else {
        newCoverUrl = post.cover; // fallback
      }
    }

    // 2. Handle inline content images
    const postImagesDir = path.join(IMAGES_DIR, slug);
    if (!fs.existsSync(postImagesDir)) {
      fs.mkdirSync(postImagesDir, { recursive: true });
    }

    // Regex to match markdown images: ![alt](url)
    const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    let imgIndex = 1;
    
    const matchesList = [];
    while ((match = imgRegex.exec(content)) !== null) {
      matchesList.push({
        fullMatch: match[0],
        alt: match[1],
        url: match[2]
      });
    }

    for (const img of matchesList) {
      console.log(`  Downloading inline image ${imgIndex}...`);
      
      // Try to determine extension from URL (tricky with pre-signed S3, assume .png)
      let ext = '.png';
      if (img.url.includes('.jpg') || img.url.includes('.jpeg')) ext = '.jpg';
      if (img.url.includes('.gif')) ext = '.gif';
      
      const imgFilename = `img-${imgIndex}${ext}`;
      const imgFilepath = path.join(postImagesDir, imgFilename);
      
      const success = await downloadImage(img.url, imgFilepath);
      if (success) {
        const newLocalUrl = `/images/posts/${slug}/${imgFilename}`;
        // Replace ONLY this specific occurrence safely
        content = content.replace(img.fullMatch, `![${img.alt}](${newLocalUrl})`);
      }
      
      imgIndex++;
      await delay(500); // Be nice to servers
    }

    // 3. Construct Frontmatter
    const frontmatter = `---
title: "${post.title?.replace(/"/g, '\\"') || 'Untitled'}"
date: "${post.date || new Date().toISOString()}"
tags: ${JSON.stringify(post.tags || [])}
${newCoverUrl ? `cover: "${newCoverUrl}"` : ''}
${post.isParent !== undefined ? `isParent: ${post.isParent}` : ''}
${post.parentSlug ? `parentSlug: "${post.parentSlug}"` : ''}
${post.episodeNumber !== undefined ? `episodeNumber: ${post.episodeNumber}` : ''}
---

${content}`;

    // 4. Save Markdown file
    const mdFilepath = path.join(POSTS_DIR, `${slug}.md`);
    fs.writeFileSync(mdFilepath, frontmatter);
    console.log(`✅ Successfully migrated ${slug}.`);
    
  } catch (error) {
    console.error(`❌ Error migrating ${slug}:`, error);
  }
}

async function main() {
  for (const slug of SLUGS) {
    await migratePost(slug);
    await delay(1000);
  }
  console.log("Migration complete!");
}

main();
