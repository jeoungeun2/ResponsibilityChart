import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

const BACKEND_BASE_URL = process.env.API_URL || 'http://localhost:8000';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'PUT');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'PATCH');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'DELETE');
}

async function handleRequest(
  request: NextRequest,
  pathSegments: string[],
  method: string
) {
  try {
    console.log('🚀 프록시 요청 시작:', { method, path: pathSegments.join('/') });
    
    // 1. 세션에서 토큰 가져오기
    console.log('🔍 세션 확인 중...');
    const session = await auth();
    console.log('📋 세션 정보:', {
      hasSession: !!session,
      hasUser: !!session?.user,
      hasAccessToken: !!session?.accessToken,
      userEmail: session?.user?.email,
      accessTokenLength: session?.accessToken?.length || 0
    });
    
    if (!session?.user) {
      console.error('❌ 인증 실패: 세션이 없습니다');
      return NextResponse.json(
        { error: 'Unauthorized', message: '세션이 없습니다. 로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    // 2. 백엔드 URL 구성
    const path = pathSegments.join('/');
    const backendUrl = `${BACKEND_BASE_URL}/${path}`;
    console.log('🌐 백엔드 URL:', backendUrl);
    
    // 3. 쿼리 파라미터 처리
    const url = new URL(request.url);
    const searchParams = url.searchParams.toString();
    const fullBackendUrl = searchParams 
      ? `${backendUrl}?${searchParams}` 
      : backendUrl;
    console.log('🔗 최종 백엔드 URL:', fullBackendUrl);

    // 4. 요청 헤더 준비
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Authorization 헤더 추가 (JWT 토큰 사용)
    if (session.accessToken) {
      headers['Authorization'] = `Bearer ${session.accessToken}`;
      console.log('🔑 Authorization 헤더 추가됨');
    } else {
      console.warn('⚠️ accessToken이 없습니다');
    }

    console.log('📤 요청 헤더:', headers);

    // 5. 요청 본문 처리
    let body: string | undefined;
    if (method !== 'GET' && method !== 'DELETE') {
      try {
        const clonedRequest = request.clone();
        body = await clonedRequest.text();
        console.log('📦 요청 본문:', body);
      } catch (error) {
        console.error('❌ 요청 본문 읽기 실패:', error);
      }
    }

    // 6. 백엔드로 요청 전송
    console.log('📡 백엔드로 요청 전송 중...');
    const response = await fetch(fullBackendUrl, {
      method,
      headers,
      body,
    });

    console.log('📥 백엔드 응답:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    // 7. 응답 처리
    const responseData = await response.text();
    console.log('📄 응답 데이터:', responseData);
    
    // 8. 응답 헤더 복사 (CORS 관련 헤더 제외)
    const responseHeaders = new Headers();
    for (const [key, value] of response.headers.entries()) {
      if (!['access-control-allow-origin', 'access-control-allow-methods', 'access-control-allow-headers'].includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    }

    // 9. 응답 반환
    console.log('✅ 프록시 요청 완료');
    return new NextResponse(responseData, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('❌ 프록시 에러:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
