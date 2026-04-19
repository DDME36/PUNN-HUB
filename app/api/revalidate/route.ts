import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // ตรวจสอบ secret token เพื่อความปลอดภัย
    const authHeader = request.headers.get('authorization');
    const secret = process.env.REVALIDATE_SECRET || 'your-secret-token';

    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Revalidate MD posts cache
    revalidateTag('md-posts', 'max');

    return NextResponse.json({
      revalidated: true,
      message: 'Cache revalidated successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to revalidate',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint สำหรับทดสอบ (ใช้ query param แทน header)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const secret = searchParams.get('secret');
    const expectedSecret = process.env.REVALIDATE_SECRET || 'your-secret-token';

    if (secret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    revalidateTag('md-posts', 'max');

    return NextResponse.json({
      revalidated: true,
      message: 'Cache revalidated successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to revalidate',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
