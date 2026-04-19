const fs = require('fs');
const path = require('path');

// Fix path to point to the root instead of scripts folder
const postsDir = path.join(process.cwd(), 'content/posts');
const targetDir = path.join(postsDir, 'ee-101');

// Create ee-101 directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const slugMap = {
  1: 'ee-101-ep1-vir',
  2: 'ee-101-ep2-power',
  3: 'ee-101-ep3-rlc',
  4: 'ee-101-ep4-impedance',
  5: 'ee-101-ep5-power-triangle',
  6: 'ee-101-ep6-power-factor',
  7: 'ee-101-ep7-1phase-vs-3phase',
  8: 'ee-101-ep8-ac-power',
  9: 'ee-101-ep9-transformers',
  10: 'ee-101-ep10-motors',
  11: 'ee-101-ep11-star-delta',
  12: 'ee-101-ep12-air-conditioners',
  13: 'ee-101-ep13-electricity-bill',
  14: 'ee-101-ep14-circuit-breaker',
  15: 'ee-101-ep15-wire-sizing',
  16: 'ee-101-ep16-diode',
  17: 'ee-101-ep17-rectifier',
};

const files = fs.readdirSync(postsDir);

for (const file of files) {
  if (file.startsWith('ee-101-ep') && file.endsWith('.md')) {
    const oldPath = path.join(postsDir, file);
    const newPath = path.join(targetDir, file);
    
    // Read content
    let content = fs.readFileSync(oldPath, 'utf8');
    
    // Replace links `[...EP.X...](#)` with `[...EP.X...](/blog/...)`
    // Regex explanation:
    // \[             match '['
    // (              capture group 1 (link text)
    //   [^\]]*?      any characters except ']'
    //   EP\.(\d+)    match 'EP.' followed by numbers (capture group 2)
    //   [^\]]*?      any characters except ']'
    // )              close group 1
    // \]             match ']'
    // \(#\)          match '(#)'
    
    content = content.replace(/\[([^\]]*?EP\.(\d+)[^\]]*?)\]\(#\)/g, (match, linkText, epNum) => {
        const targetSlug = slugMap[epNum];
        if (targetSlug) {
            return `[${linkText}](/blog/${targetSlug})`;
        }
        return match;
    });

    // Also handle cases like [EP.16](#) and [EP.2](#)
    
    // Save the modified file to the new location
    fs.writeFileSync(newPath, content, 'utf8');
    
    // Delete old file
    fs.unlinkSync(oldPath);
    console.log(`Moved and updated ${file}`);
  }
}

// Special check for ee-101-course.md (main course file, don't move it, but update links if any)
const courseFilePath = path.join(postsDir, 'ee-101-course.md');
if (fs.existsSync(courseFilePath)) {
    let content = fs.readFileSync(courseFilePath, 'utf8');
    // For course file, it doesn't have (#) but let's make sure it's intact
    // Actually course file doesn't have internal (#) links, it's just text.
    console.log("Course file kept at root.");
}

console.log("Migration complete.");
