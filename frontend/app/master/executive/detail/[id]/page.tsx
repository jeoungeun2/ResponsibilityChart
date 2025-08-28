import { notFound } from 'next/navigation';
import { executivesControllerFindOne } from '@/generated/openapi-client/sdk.gen';
import { client } from '@/generated/openapi-client/client.gen';
import H1 from '@/components/layouts/h1';

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
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const resolvedSearchParams = await searchParams;
  const { name, employeeNo } = resolvedSearchParams;

  console.log('🔍 디버깅 정보:', { id, name, employeeNo });

  try {
    // 임원 정보 조회
    console.log('📡 API 호출 시작:', { id });
    const response = await executivesControllerFindOne({
      client,
      path: { id }
    });

    console.log('📡 API 응답:', response);

    // API 응답에서 data 추출
    if (response.error || !response.data) {
      console.error('❌ 임원 정보 조회 실패:', response.error);
      
      // API 호출 실패 시 임시 데이터로 표시 (디버깅용)
      console.log('🔄 임시 데이터로 표시');
      const tempExecutive = {
        name: name || '임시 이름',
        employeeNo: employeeNo || '임시 사번',
        positionLabel: '임시 직위',
        titleLabel: '임시 직책',
        phone: '임시 연락처',
        email: '임시 이메일',
        termStartDate: '임시 시작일',
        termEndDate: '임시 종료일',
        evaluation: { status: 'NOT_STARTED' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return (
        <div className="space-y-6">
          <H1 title={`임원 상세정보 - ${tempExecutive.name} (${tempExecutive.employeeNo})`} />
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>주의:</strong> API 호출에 실패하여 임시 데이터를 표시합니다.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 기본 정보 */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">기본 정보</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                  <p className="text-gray-900">{tempExecutive.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">사번</label>
                  <p className="text-gray-900">{tempExecutive.employeeNo}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">직위</label>
                  <p className="text-gray-900">{tempExecutive.positionLabel}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
                  <p className="text-gray-900">{tempExecutive.titleLabel}</p>
                </div>
              </div>

              {/* 연락처 정보 */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">연락처 정보</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                  <p className="text-gray-900">{tempExecutive.phone}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <p className="text-gray-900">{tempExecutive.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">재임시작일</label>
                  <p className="text-gray-900">{tempExecutive.termStartDate}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">재임종료일</label>
                  <p className="text-gray-900">{tempExecutive.termEndDate}</p>
                </div>
              </div>
            </div>

            {/* 평가 상태 */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-medium text-gray-900 mb-4">평가 상태</h3>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {tempExecutive.evaluation.status === 'NOT_STARTED' && '미시작'}
              </div>
            </div>

            {/* 생성/수정 정보 */}
            <div className="mt-6 pt-6 border-t text-sm text-gray-500">
              <p>생성일: {new Date(tempExecutive.createdAt).toLocaleDateString('ko-KR')}</p>
              <p>수정일: {new Date(tempExecutive.updatedAt).toLocaleDateString('ko-KR')}</p>
            </div>
          </div>
        </div>
      );
    }

    const executive = response.data as any;

    return (
      <div className="space-y-6">
        <H1 title={`임원 상세정보 - ${name || executive.name} (${employeeNo || executive.employeeNo || '사번없음'})`} />
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 기본 정보 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">기본 정보</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <p className="text-gray-900">{executive.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사번</label>
                <p className="text-gray-900">{executive.employeeNo || '미입력'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직위</label>
                <p className="text-gray-900">{executive.positionLabel || '미입력'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
                <p className="text-gray-900">{executive.titleLabel || '미입력'}</p>
              </div>
            </div>

            {/* 연락처 정보 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">연락처 정보</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                <p className="text-gray-900">{executive.phone || '미입력'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <p className="text-gray-900">{executive.email || '미입력'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">재임시작일</label>
                <p className="text-gray-900">{executive.termStartDate || '미입력'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">재임종료일</label>
                <p className="text-gray-900">{executive.termEndDate || '미입력'}</p>
              </div>
            </div>
          </div>

          {/* 평가 상태 */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-medium text-gray-900 mb-4">평가 상태</h3>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {executive.evaluation?.status === 'NOT_STARTED' && '미시작'}
              {executive.evaluation?.status === 'STARTED' && '시작'}
              {executive.evaluation?.status === 'IN_PROGRESS' && '진행중'}
              {!executive.evaluation?.status && '미시작'}
            </div>
          </div>

          {/* 생성/수정 정보 */}
          <div className="mt-6 pt-6 border-t text-sm text-gray-500">
            <p>생성일: {new Date(executive.createdAt).toLocaleDateString('ko-KR')}</p>
            {executive.updatedAt && (
              <p>수정일: {new Date(executive.updatedAt).toLocaleDateString('ko-KR')}</p>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('❌ API 호출 중 에러 발생:', error);
    
    // 에러 발생 시에도 임시 데이터로 표시
    console.log('🔄 에러로 인한 임시 데이터 표시');
    const tempExecutive = {
      name: name || '임시 이름',
      employeeNo: employeeNo || '임시 사번',
      positionLabel: '임시 직위',
      titleLabel: '임시 직책',
      phone: '임시 연락처',
      email: '임시 이메일',
      termStartDate: '임시 시작일',
      termEndDate: '임시 종료일',
      evaluation: { status: 'NOT_STARTED' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return (
      <div className="space-y-6">
        <H1 title={`임원 상세정보 - ${tempExecutive.name} (${tempExecutive.employeeNo})`} />
        
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>에러:</strong> API 호출 중 오류가 발생하여 임시 데이터를 표시합니다.
              </p>
              <p className="text-xs text-red-600 mt-1">
                에러 내용: {error instanceof Error ? error.message : String(error)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 기본 정보 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">기본 정보</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <p className="text-gray-900">{tempExecutive.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사번</label>
                <p className="text-gray-900">{tempExecutive.employeeNo}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직위</label>
                <p className="text-gray-900">{tempExecutive.positionLabel}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
                <p className="text-gray-900">{tempExecutive.titleLabel}</p>
              </div>
            </div>

            {/* 연락처 정보 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">연락처 정보</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                <p className="text-gray-900">{tempExecutive.phone}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <p className="text-gray-900">{tempExecutive.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">재임시작일</label>
                <p className="text-gray-900">{tempExecutive.termStartDate}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">재임종료일</label>
                <p className="text-gray-900">{tempExecutive.termEndDate}</p>
              </div>
            </div>
          </div>

          {/* 평가 상태 */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-medium text-gray-900 mb-4">평가 상태</h3>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {tempExecutive.evaluation.status === 'NOT_STARTED' && '미시작'}
            </div>
          </div>

          {/* 생성/수정 정보 */}
          <div className="mt-6 pt-6 border-t text-sm text-gray-500">
            <p>생성일: {new Date(tempExecutive.createdAt).toLocaleDateString('ko-KR')}</p>
            <p>수정일: {new Date(tempExecutive.updatedAt).toLocaleDateString('ko-KR')}</p>
          </div>
        </div>
      </div>
    );
  }
}
