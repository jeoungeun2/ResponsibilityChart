import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  try {
    // 1. 세션에서 토큰 가져오기
    const session = await auth();
    console.log('🔍 세션 정보:', session);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: '세션이 없습니다' },
        { status: 401 }
      );
    }

    // 2. 테스트 응답
    return NextResponse.json({
      message: '프록시 테스트 성공!',
      session: {
        user: session.user,
        hasAccessToken: !!session.accessToken,
        accessTokenLength: session.accessToken ? session.accessToken.length : 0
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('프록시 테스트 에러:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
