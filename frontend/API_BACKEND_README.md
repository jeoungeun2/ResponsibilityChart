# 백엔드 API 프록시 구조

이 프로젝트는 Next.js (App Router)에서 Auth.js/NextAuth를 사용하여 백엔드 NestJS API와 안전하게 통신할 수 있는 프록시 구조를 구현했습니다.

## 🏗️ 구조 개요

```
클라이언트 → /api/backend/[...path] → 백엔드 API (localhost:8000)
```

### 1. 프록시 라우트 (`/app/api/backend/[...path]/route.ts`)
- 모든 HTTP 메서드 (GET, POST, PUT, PATCH, DELETE) 지원
- 서버 사이드에서 세션 토큰을 자동으로 읽어서 Authorization 헤더에 추가
- httpOnly 쿠키 문제 해결
- 보안상 안전한 토큰 처리

### 2. OpenAPI 클라이언트 설정 (`/config/openapi-runtime.ts`)
- baseUrl을 `/api/backend`로 설정
- 클라이언트는 인증 신경 쓰지 않고 API 호출 가능

### 3. 보안 미들웨어 (`/middleware.ts`)
- CSRF 보호를 위한 Origin/Referer 검사
- `/api/backend` 경로에 대한 추가 보안

## 🔧 환경 변수 설정

`.env.local` 파일에 다음을 추가하세요:

```bash
# NextAuth 설정
AUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# 백엔드 API 설정
API_URL=http://localhost:8000

# 환경 설정
NODE_ENV=development
```

## 📱 사용법

### 기본 API 호출

```typescript
import { client } from '@/generated/openapi-client/client.gen';

// GET 요청
const user = await client.users.getMe();

// POST 요청
const newUser = await client.users.createUser({
  body: { name: 'John', email: 'john@example.com' }
});

// PUT 요청
const updatedUser = await client.users.updateUser({
  params: { id: '123' },
  body: { name: 'John Updated' }
});

// DELETE 요청
await client.users.deleteUser({
  params: { id: '123' }
});
```

### 실제 요청 흐름

1. 클라이언트에서 `client.users.getMe()` 호출
2. 실제로는 `/api/backend/users/me`로 요청
3. Next.js 서버에서 세션 토큰을 읽어서 Authorization 헤더에 추가
4. 백엔드 API (`http://localhost:8000/users/me`)로 프록시 요청
5. 응답을 클라이언트에 반환

## 🔒 보안 특징

### 1. 토큰 보안
- httpOnly 쿠키 사용으로 XSS 공격 방지
- 서버 사이드에서만 토큰 접근 가능
- 클라이언트는 토큰을 직접 읽을 수 없음

### 2. CSRF 보호
- Origin/Referer 헤더 검사
- 같은 도메인에서의 요청만 허용

### 3. 인증 검증
- 모든 API 요청에 대해 세션 검증
- 인증되지 않은 요청은 401 에러 반환

## 🚀 프로덕션 배포 시 고려사항

### 1. 환경 변수
```bash
NODE_ENV=production
NEXTAUTH_URL=https://yourdomain.com
API_URL=https://your-backend-api.com
```

### 2. HTTPS 설정
- 프로덕션에서는 반드시 HTTPS 사용
- `useSecureCookies: true` 설정 확인

### 3. CORS 설정
- 백엔드 API에서 허용된 도메인만 접근 가능하도록 설정

## 🐛 문제 해결

### 1. 401 Unauthorized 에러
- 세션이 만료되었거나 로그인이 필요
- `auth()` 함수가 null을 반환하는지 확인

### 2. 403 Forbidden 에러
- Origin/Referer 헤더가 올바르지 않음
- 미들웨어 설정 확인

### 3. 백엔드 연결 실패
- `API_URL` 환경 변수 확인
- 백엔드 서버가 실행 중인지 확인

## 📁 파일 구조

```
frontend/
├── app/
│   └── api/
│       └── backend/
│           └── [...path]/
│               └── route.ts          # 프록시 라우트 핸들러
├── config/
│   └── openapi-runtime.ts            # OpenAPI 클라이언트 설정
├── middleware.ts                      # 보안 미들웨어
└── components/
    └── api-example.tsx               # 사용 예시 컴포넌트
```

## 🔄 업데이트 및 유지보수

### 1. OpenAPI 스키마 변경 시
```bash
# 백엔드 API 스키마가 변경되면 클라이언트 재생성
pnpm openapi-ts
```

### 2. 새로운 API 엔드포인트 추가
- 백엔드에 새 엔드포인트 추가
- OpenAPI 스키마 업데이트
- 클라이언트 재생성
- 프록시는 자동으로 모든 경로를 처리

이 구조를 통해 클라이언트는 인증을 신경 쓰지 않고도 안전하게 백엔드 API를 호출할 수 있습니다.
