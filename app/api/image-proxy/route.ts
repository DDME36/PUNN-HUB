import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PunnHub/1.0)',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status} ${response.statusText} - ${url}`);
      return new NextResponse('Failed to fetch image', { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    // Validate content type
    if (!contentType.startsWith('image/')) {
      console.error(`Invalid content type: ${contentType} - ${url}`);
      return new NextResponse('Invalid image content type', { status: 400 });
    }

    const imageBuffer = await response.arrayBuffer();

    // Validate image size
    if (imageBuffer.byteLength === 0) {
      console.error(`Empty image buffer - ${url}`);
      return new NextResponse('Empty image', { status: 400 });
    }

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        // Reduce cache time to 1 hour since Notion URLs expire
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('Image proxy timeout:', url);
        return new NextResponse('Image fetch timeout', { status: 504 });
      }
      console.error('Image proxy error:', error.message, url);
    } else {
      console.error('Image proxy error:', error, url);
    }
    return new NextResponse('Failed to proxy image', { status: 500 });
  }
}
