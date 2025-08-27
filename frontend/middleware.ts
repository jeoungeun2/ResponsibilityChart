import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // /api/backend 경로에 대한 보안 검사
  if (request.nextUrl.pathname.startsWith('/api/backend')) {
    // CSRF 보호를 위한 Origin 검사
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    
    // 같은 도메인에서의 요청만 허용
    if (origin && !origin.startsWith(process.env.NEXTAUTH_URL || 'http://localhost:3000')) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    // Referer 헤더 검사 (선택적)
    if (referer && !referer.startsWith(process.env.NEXTAUTH_URL || 'http://localhost:3000')) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/backend/:path*',
  ],
};
