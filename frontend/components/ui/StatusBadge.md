# StatusBadge 컴포넌트

평가상태나 기타 상태를 표시하는 뱃지 컴포넌트입니다.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `string` | - | 상태값 (필수) |
| `text` | `string` | - | 표시할 텍스트 (선택사항) |
| `color` | `string` | - | 배경색 (선택사항) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 뱃지 크기 |
| `className` | `string` | `''` | 추가 CSS 클래스 |

## 기본 사용법

### 1. status만 전달 (자동 텍스트 및 색상)

```tsx
<StatusBadge status="completed" />
<StatusBadge status="in-progress" />
<StatusBadge status="not-evaluated" />
```

### 2. 커스텀 텍스트와 색상

```tsx
<StatusBadge 
  status="custom" 
  text="진행중" 
  color="bg-yellow-300" 
/>
```

### 3. 크기 지정

```tsx
<StatusBadge status="completed" size="sm" />
<StatusBadge status="in-progress" size="md" />
<StatusBadge status="not-evaluated" size="lg" />
```

## 지원하는 상태값

### 영어 상태값
- `completed` → 파란색 원 + "완료" 텍스트
- `in-progress` → 노란색 원 + "진행중" 텍스트  
- `not-evaluated` → 회색 원 + "미평가" 텍스트
- `pending` → 주황색 원 + "대기중" 텍스트
- `rejected` → 빨간색 원 + "거부" 텍스트
- `approved` → 초록색 원 + "승인" 텍스트

### 한글 상태값
- `완료` → 파란색 원 + "완료" 텍스트
- `진행중` → 노란색 원 + "진행중" 텍스트
- `미평가` → 회색 원 + "미평가" 텍스트
- `대기중` → 주황색 원 + "대기중" 텍스트
- `거부` → 빨간색 원 + "거부" 텍스트
- `승인` → 초록색 원 + "승인" 텍스트

## 예제

```tsx
import StatusBadge from '@/components/ui/StatusBadge';

// 기본 사용
<StatusBadge status="in-progress" />

// 커스텀 스타일
<StatusBadge 
  status="custom" 
  text="진행중" 
  color="bg-yellow-300" 
  size="lg"
  className="ml-2"
/>
```

## 특징

- 상태값에 따라 자동으로 적절한 색상과 텍스트를 매핑
- 커스텀 텍스트와 색상 지원
- 3가지 크기 옵션 (sm, md, lg)
- 반응형 디자인
- Tailwind CSS 기반 스타일링
