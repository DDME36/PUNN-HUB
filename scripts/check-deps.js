#!/usr/bin/env bun

/**
 * ตรวจสอบ dependencies ที่ล้าสมัยและแสดงรายการ - ใช้ Bun Native
 */

console.log('🔍 Checking for outdated dependencies...\n');

try {
  // ใช้ Bun.spawn แทน child_process
  const proc = Bun.spawn(['bun', 'outdated'], {
    stdout: 'inherit',
    stderr: 'inherit',
  });

  await proc.exited;

  console.log('\n✅ Dependency check complete!');
  console.log('\n💡 To update all dependencies:');
  console.log('   bun update');
  console.log('\n💡 To update specific package:');
  console.log('   bun update <package-name>');
} catch (error) {
  console.error('❌ Error checking dependencies:', error.message);
  process.exit(1);
}
