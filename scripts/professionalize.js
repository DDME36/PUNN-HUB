const fs = require('fs');
const path = require('path');

const postsDir = path.join(process.cwd(), 'content/posts/ee-101');
const courseFile = path.join(process.cwd(), 'content/posts/ee-101-course.md');

const newTitles = {
    'ee-101-ep1-vir.md': 'EP.1: พื้นฐาน V, I, R และกฎของโอห์ม',
    'ee-101-ep2-power.md': 'EP.2: กำลังไฟฟ้า (Electrical Power)',
    'ee-101-ep3-rlc.md': 'EP.3: การต่อวงจร R, L, C เบื้องต้น',
    'ee-101-ep4-impedance.md': 'EP.4: อิพีแดนซ์ (Impedance - Z)',
    'ee-101-ep5-power-triangle.md': 'EP.5: สามเหลี่ยมกำลังไฟฟ้า (Power Triangle)',
    'ee-101-ep6-power-factor.md': 'EP.6: ตัวประกอบกำลัง (Power Factor)',
    'ee-101-ep7-1phase-vs-3phase.md': 'EP.7: ระบบไฟฟ้า 1 เฟส และ 3 เฟส',
    'ee-101-ep8-ac-power.md': 'EP.8: กำลังไฟฟ้ากระแสสลับ (AC Power)',
    'ee-101-ep9-transformers.md': 'EP.9: หม้อแปลงไฟฟ้า (Transformers)',
    'ee-101-ep10-motors.md': 'EP.10: มอเตอร์ไฟฟ้าและการอ่าน Nameplate',
    'ee-101-ep11-star-delta.md': 'EP.11: วงจรสตาร์ทมอเตอร์แบบ Star-Delta',
    'ee-101-ep12-air-conditioners.md': 'EP.12: การคำนวณโหลดเครื่องปรับอากาศ',
    'ee-101-ep13-electricity-bill.md': 'EP.13: การคำนวณค่าไฟฟ้า',
    'ee-101-ep14-circuit-breaker.md': 'EP.14: การเลือกขนาดเบรกเกอร์ (Circuit Breaker)',
    'ee-101-ep15-wire-sizing.md': 'EP.15: การเลือกขนาดสายไฟ (Cable Sizing)',
    'ee-101-ep16-diode.md': 'EP.16: ไดโอด (Diode)',
    'ee-101-ep17-rectifier.md': 'EP.17: วงจรเรียงกระแส (Rectifier)',
    'ee-101-ep18-lighting.md': 'EP.18: การออกแบบระบบแสงสว่าง (Lighting Design)'
};

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

for (const file of files) {
    const filePath = path.join(postsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Update Title in frontmatter
    if (newTitles[file]) {
        content = content.replace(/^title:\s*".*?"/m, `title: "${newTitles[file]}"`);
    }

    // Update Exam Corner headers
    content = content.replace(/### 🎓 มุมข้อสอบ กว\. \(License Exam Corner\)/g, '### 📝 ตัวอย่างแนวข้อสอบ');
    content = content.replace(/\*\*โจทย์ กว\. (.*?):\*\*/g, '**โจทย์ตัวอย่าง ($1):**');

    fs.writeFileSync(filePath, content, 'utf8');
}

// Update Course file
let courseContent = fs.readFileSync(courseFile, 'utf8');
courseContent = courseContent.replace(/^title:\s*".*?"/m, 'title: "สรุปสูตรวิศวกรรมไฟฟ้า (EE Cheat Sheet)"');
Object.keys(newTitles).forEach(file => {
    const epMatch = newTitles[file].match(/EP\.\d+/)[0];
    const newTitleText = newTitles[file].replace(/EP\.\d+:\s*/, '');
    
    // Replace the list item titles in course.md
    const regex = new RegExp(`\\*\\*${epMatch}:.*?(?=\\*\\*)`, 'g');
    courseContent = courseContent.replace(regex, `**${epMatch}: ${newTitleText} `);
});

// Remove old slang descriptions in course file manually in next step if Regex is too complex
fs.writeFileSync(courseFile, courseContent, 'utf8');
console.log('Done professionalizing titles and exam corners.');
