import ExecutiveDetailUI from './ui';

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
