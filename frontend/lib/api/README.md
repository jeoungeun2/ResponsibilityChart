# API 구조 및 사용법

이 폴더는 `sdk.gen.ts`에서 생성된 OpenAPI 함수들을 도메인별로 정리하여 사용하기 쉽게 만든 래퍼입니다.

## 구조

```
src/lib/api/
├── index.ts              # 모든 API를 모아서 export
├── app.ts                # App 관련 API (Hello, TestUser)
├── responsibilities.ts    # 책무 관련 API
├── executives.ts         # 임원 관련 API
├── org-registrations.ts  # 조직 등록 관련 API
├── quali-items.ts        # 자격 항목 관련 API
├── integrity-items.ts    # 무결성 항목 관련 API
└── evaluations.ts        # 평가 관련 API
```

## 사용법

### 1. 전체 API import
```typescript
import { 
  appApi, 
  executivesApi, 
  evaluationsApi 
} from '@/lib/api';
```

### 2. 특정 도메인만 import
```typescript
import { executivesApi } from '@/lib/api/executives';
```

### 3. API 호출 예시
```typescript
// 임원 목록 조회
const executives = await executivesApi.findAll();

// 특정 임원 조회
const executive = await executivesApi.findOne({ 
  params: { id: '123' } 
});

// 평가 생성
const evaluation = await evaluationsApi.createForExecutive({
  params: { executiveId: '123' },
  json: { /* 평가 데이터 */ }
});
```

## 특징

- **자동 client 주입**: 모든 API 호출에 기본 client가 자동으로 주입됩니다
- **타입 안전성**: TypeScript 타입이 완벽하게 지원됩니다
- **도메인 분리**: 관련 기능별로 API가 논리적으로 그룹화되어 있습니다
- **일관된 인터페이스**: 모든 API가 동일한 패턴을 따릅니다

## 주의사항

- `sdk.gen.ts`는 자동 생성 파일이므로 직접 수정하지 마세요
- 새로운 API가 추가되면 해당 도메인 파일에 추가하고 `index.ts`에 export하세요
- 모든 API는 JWT 인증이 필요합니다 (security 헤더 자동 포함)
