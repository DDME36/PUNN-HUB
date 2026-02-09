#!/usr/bin/env bun

/**
 * ลบ cache และ build files ทั้งหมด - ใช้ Bun Native APIs
 */

console.log('🧹 Cleaning project...\n');

const filesToClean = [
  '.next',
  'node_modules',
  'bun.lockb',
  '.turbo',
  'out',
  '.vercel',
];

async function clean() {
  for (const file of filesToClean) {
    const exists = await Bun.file(file).exists();
    if (exists) {
      console.log(`🗑️  Removing ${file}...`);
      await Bun.$`rm -rf ${file}`.quiet();
      console.log(`✅ ${file} removed`);
    } else {
      console.log(`⏭️  ${file} not found, skipping`);
    }
  }

  console.log('\n✨ Clean complete!');
  console.log('\n💡 To reinstall dependencies:');
  console.log('   bun install');
}

clean().catch((error) => {
  console.error('❌ Clean failed:', error.message);
  process.exit(1);
});
