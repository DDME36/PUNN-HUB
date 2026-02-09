#!/usr/bin/env bun

/**
 * Pre-commit hook - ตรวจสอบ code ก่อน commit - ใช้ Bun Native
 */

console.log('🔍 Running pre-commit checks...\n');

async function preCommit() {
  try {
    // 1. Type check
    console.log('📝 Type checking...');
    const typecheck = Bun.spawn(['bun', 'run', 'typecheck'], {
      stdout: 'inherit',
      stderr: 'inherit',
    });
    const typecheckCode = await typecheck.exited;
    if (typecheckCode !== 0) throw new Error('Type check failed');
    console.log('✅ Type check passed\n');

    // 2. Lint
    console.log('🔍 Linting...');
    const lint = Bun.spawn(['bun', 'run', 'lint'], {
      stdout: 'inherit',
      stderr: 'inherit',
    });
    const lintCode = await lint.exited;
    if (lintCode !== 0) throw new Error('Lint failed');
    console.log('✅ Lint passed\n');

    console.log('✨ All checks passed! Ready to commit.\n');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Pre-commit checks failed!');
    console.error('Please fix the errors above before committing.\n');
    process.exit(1);
  }
}

preCommit();
