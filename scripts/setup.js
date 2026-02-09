#!/usr/bin/env bun

/**
 * Setup script สำหรับโปรเจคใหม่ - ใช้ Bun Native APIs
 */

console.log('🚀 Setting up Punn Hub...\n');

async function setup() {
  try {
    // 1. ตรวจสอบ .env.local
    const envExists = await Bun.file('.env.local').exists();
    if (!envExists) {
      console.log('📝 Creating .env.local from example...');
      const example = await Bun.file('.env.local.example').text();
      await Bun.write('.env.local', example);
      console.log('✅ .env.local created!');
      console.log('⚠️  Please edit .env.local and add your Notion credentials\n');
    } else {
      console.log('✅ .env.local already exists\n');
    }

    // 2. ติดตั้ง dependencies
    console.log('📦 Installing dependencies with Bun...');
    const install = Bun.spawn(['bun', 'install'], {
      stdout: 'inherit',
      stderr: 'inherit',
    });
    await install.exited;
    console.log('✅ Dependencies installed!\n');

    // 3. Generate icons
    console.log('🎨 Generating icons...');
    const icons = Bun.spawn(['bun', 'run', 'generate-icons'], {
      stdout: 'inherit',
      stderr: 'inherit',
    });
    await icons.exited;
    console.log('✅ Icons generated!\n');

    // 4. Type check
    console.log('🔍 Running type check...');
    const typecheck = Bun.spawn(['bun', 'run', 'typecheck'], {
      stdout: 'inherit',
      stderr: 'inherit',
    });
    await typecheck.exited;
    console.log('✅ Type check passed!\n');

    console.log('🎉 Setup complete!\n');
    console.log('Next steps:');
    console.log('1. Edit .env.local with your Notion credentials');
    console.log('2. Run: bun dev');
    console.log('3. Open: http://localhost:3000\n');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setup();
