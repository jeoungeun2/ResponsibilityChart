'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import H1 from '@/components/layouts/h1';
import ExecutiveInfoCard from './_components/ExecutiveInfoCard';
import ExecutiveDetailTable from './_components/ExecutiveDetailTable';

// React Query를 사용하여 임원 데이터 조회
const fetchExecutiveData = async (id: string) => {
  const response = await fetch(`/api/backend/executives/${id}`);
  if (!response.ok) {
    throw new Error('임원 데이터를 불러오는데 실패했습니다.');
  }
  return response.json();
};

// 데이터 로딩 실패 시 경고 컴포넌트
const DataLoadWarning = ({ message }: { message: string }) => (
  <div className="space-y-6">
    <H1 title="임원 상세정보" />
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>주의:</strong> {message}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function ExecutiveDetailUI() {
  const params = useParams();
  const executiveId = params.id as string;

  // React Query를 사용하여 데이터 조회
  const { data: executive, isLoading, error } = useQuery({
    queryKey: ['executive', executiveId],
    queryFn: () => fetchExecutiveData(executiveId),
    enabled: !!executiveId,
  });

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="space-y-6">
        <H1 title="임원 상세정보" />
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return <DataLoadWarning message="임원 데이터를 불러오는데 실패했습니다." />;
  }

  // 데이터가 없는 경우
  if (!executive) {
    return <DataLoadWarning message="임원 데이터를 찾을 수 없습니다." />;
  }

  return (
    <div className="space-y-6">
      <H1 title={`임원 상세정보 - ${executive.name} (${executive.employeeNo || '사번없음'})`} />
      
      {/* 1:2 그리드 레이아웃 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 기본 정보 카드 - 1/3 */}
        <div className="lg:col-span-1">
          <ExecutiveInfoCard
            name={executive.name}
            positionLabel={executive.positionLabel}
            titleLabel={executive.titleLabel}
          />
        </div>
        
        {/* 상세 정보 테이블 - 2/3 */}
        <div className="lg:col-span-2">
          <ExecutiveDetailTable
            employeeNo={executive.employeeNo}
            phone={executive.phone}
            email={executive.email}
            termStartDate={executive.termStartDate}
            termEndDate={executive.termEndDate}
            evaluationStatus={executive.evaluation?.status}
            createdAt={executive.createdAt}
            updatedAt={executive.updatedAt}
          />
        </div>
      </div>
    </div>
  );
}
