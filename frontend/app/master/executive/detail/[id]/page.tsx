import ExecutiveDetailUI from './ui';

// 정적 빌드를 위한 generateStaticParams 함수
export async function generateStaticParams() {
  // 샘플 ID들을 반환 (실제로는 API에서 가져와야 함)
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

interface ExecutiveDetailPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    name?: string;
    employeeNo?: string;
  }>;
}

export default async function ExecutiveDetailPage({ 
  params, 
  searchParams 
}: ExecutiveDetailPageProps) {
  // UI 컴포넌트는 React Query를 사용하여 데이터를 직접 조회하므로
  // 여기서는 단순히 컴포넌트만 렌더링합니다.
  return <ExecutiveDetailUI />;
}
