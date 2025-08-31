"use client";

import { useState, useEffect } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from '../../executive/_components/Breadcrumb';
import Header from '../_components/Header';
import { useSidebar } from '@/config/providers';
import { ExecutiveEvaluationData, executiveEvaluationSampleData, getEvaluationStatusDisplay } from '@/data/executive-evaluation-data';
import ExecutiveDetailModal from '@/components/ExecutiveDetailModal';
import StatusCard_2 from '@/components/StatusCard_2';
import StatusBadge from '@/components/ui/StatusBadge';
import ActionButton from '@/components/ui/ActionButton';
import EditIcon from '@/components/ui/edit-icon';
import DeleteIcon from '@/components/ui/delete-icon';

export default function ExecutiveFrontEvaluationPage() {
  const { isSidebarCollapsed } = useSidebar();
  
  // 모달 관련 상태 관리
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedExecutive, setSelectedExecutive] = useState<ExecutiveEvaluationData | null>(null);
   
  // 필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    position: '',
    jobTitle: '',
    name: '',
    evaluationStatus: ''
  });

  // H1 필터용 추가 상태 관리
  const [h1Filters, setH1Filters] = useState<Record<string, string>>({
    position: '',
    jobTitle: '',
    managedOrganization: ''
  });

  // 페이지네이션 관련 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정

  // 상세보기 핸들러
  const handleViewDetail = (executive: ExecutiveEvaluationData) => {
    setSelectedExecutive(executive);
    setShowDetailModal(true);
  };

  // 평가하기 핸들러
  const handleEvaluate = (executive: ExecutiveEvaluationData) => {
    console.log('평가하기:', executive.name);
    setSelectedExecutive(executive);
    setShowDetailModal(true);
  };

  // 수정 핸들러
  const handleEdit = (executive: ExecutiveEvaluationData) => {
    console.log('수정:', executive.name);
    setSelectedExecutive(executive);
    setShowDetailModal(true);
  };

  // 삭제 핸들러
  const handleDelete = (executive: ExecutiveEvaluationData) => {
    if (confirm(`${executive.name} 임원의 평가 정보를 삭제하시겠습니까?`)) {
      console.log('삭제:', executive.name);
      // TODO: API 호출로 데이터 삭제
      alert('삭제되었습니다.');
    }
  };

  // 일괄 삭제 핸들러
  const handleBulkDelete = (selectedIds: string[]) => {
    if (confirm(`선택된 ${selectedIds.length}명의 임원 평가 정보를 삭제하시겠습니까?`)) {
      console.log('일괄 삭제:', selectedIds);
      // TODO: API 호출로 데이터 삭제
      alert(`${selectedIds.length}명의 임원 평가 정보가 삭제되었습니다.`);
    }
  };

  // 모달 닫기 핸들러
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedExecutive(null);
  };

  const [tableColumns, setTableColumns] = useState<any[]>([]);

  // 컬럼 정의 (이미지에 맞게 수정)
  const columns: any[] = [
    {
      key: "name" as keyof ExecutiveEvaluationData,
      header: "성명",
      visible: true,
      render: (value: any, row: any) => (
        <button 
          onClick={() => handleViewDetail(row)}
          className="text-blue-600 underline cursor-pointer hover:text-blue-800"
        >
          {value}
        </button>
      )
    },
    {
      key: "jobTitle" as keyof ExecutiveEvaluationData,
      header: "직책",
      visible: true
    },
    {
      key: "position" as keyof ExecutiveEvaluationData,
      header: "직위",
      visible: true
    },
    {
      key: "managedOrganization" as keyof ExecutiveEvaluationData,
      header: "관리대상 조직",
      visible: true
    },
    {
      key: "evaluationStatus" as keyof ExecutiveEvaluationData,
      header: "평가상태",
      visible: true,
      render: (value: any, row: any) => (
        <StatusBadge status={value} />
      )
    },
    {
      key: "evaluationCompletionDate" as keyof ExecutiveEvaluationData,
      header: "평가완료일자",
      visible: true,
      render: (value: any, row: any) => (
        <span>{value || '-'}</span>
      )
    },
    {
      key: "management",
      header: "관리",
      visible: true,
      width: "w-32",
      render: (value: any, row: any) => {
        const isCompleted = row.evaluationStatus === 'completed';
        
        return (
          <ActionButton
            actionType={isCompleted ? 'view' : 'evaluate'}
            onClick={() => isCompleted ? handleViewDetail(row) : handleEvaluate(row)}
          />
        );
      }
    },
    {
      key: "actions",
      header: "액션",
      visible: true,
      width: "w-32",
      render: (value: any, row: any) => (
        <div className="flex items-center space-x-2">
          <EditIcon 
            className="h-4 w-4" 
            onClick={() => handleEdit(row)}
          />
          <DeleteIcon 
            className="h-4 w-4" 
            onClick={() => handleDelete(row)}
          />
        </div>
      )
    }
  ];

  // columns가 정의된 후 tableColumns 상태를 업데이트
  useEffect(() => {
    setTableColumns(columns);
  }, []);

  // 필터 설정 정의
  const filters = [
    {
      key: "position",
      label: "직위",
      type: "dropdown" as const,
      width: "w-32"
    },
    {
      key: "jobTitle",
      label: "직책",
      type: "dropdown" as const,
      width: "w-32"
    },
    {
      key: "name",
      label: "성명",
      type: "dropdown" as const,
      width: "w-32"
    },
    {
      key: "evaluationStatus",
      label: "평가상태",
      type: "dropdown" as const,
      width: "w-32"
    }
  ];

  // 필터 옵션들
  const filterOptions = {
    position: [
      { value: "대표이사", label: "대표이사" },
      { value: "상무", label: "상무" },
      { value: "실장", label: "실장" },
      { value: "부문장", label: "부문장" },
      { value: "이사대우", label: "이사대우" }
    ],
    jobTitle: [
      { value: "대표이사", label: "대표이사" },
      { value: "ETF투자부문장", label: "ETF투자부문장" },
      { value: "감사실장", label: "감사실장" },
      { value: "경영관리부문장", label: "경영관리부문장" },
      { value: "글로벌투자부문장", label: "글로벌투자부문장" },
      { value: "금융소비자보호실장", label: "금융소비자보호실장" }
    ],
    name: [
      { value: "전체", label: "전체" },
      { value: "이도현", label: "이도현" },
      { value: "황준호", label: "황준호" },
      { value: "윤태섭", label: "윤태섭" },
      { value: "노지환", label: "노지환" },
      { value: "정유진", label: "정유진" },
      { value: "임혜진", label: "임혜진" }
    ],
    evaluationStatus: [
      { value: "전체", label: "전체" },
      { value: "completed", label: "완료" },
      { value: "in-progress", label: "진행중" },
      { value: "not-evaluated", label: "미평가" }
    ]
  };

  // 필터 변경 핸들러
  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // H1 필터 변경 핸들러
  const handleH1FilterChange = (key: string, value: string) => {
    setH1Filters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`페이지 ${page}로 이동`);
    // 여기에 실제 페이지 변경 로직을 구현할 수 있습니다
  };

  return (
    <div className="relative">
      <Header 
        rightContent={
          <div className="flex items-center space-x-3">
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer border-l border-white/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12 " />
              </svg>
              <span>업로드</span>
            </button>
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>다운로드</span>
            </button>
          </div>
        }
      />
      <div className={`max-w-7xl mx-auto space-y-6 pt-10 ${isSidebarCollapsed ? '' : 'px-8'}`}>
        <CommonBreadcrumb />
       
        <H1 
          title="임원적격성평가" 
        />
        
        {/* 상태 카드 그리드 */}
        <StatusCard_2 
          cards={[
            { 
              title: "대상 임원", 
              value: "23명",
              image: "/images/people.png",
              titleColor: "text-brand-500",
              valueColor: "text-brand-500"
            },
            { 
              title: "완료", 
              value: "18명",
              image: "/images/check (3).png"
            },
            { 
              title: "진행중", 
              value: "3명",
              image: "/images/loading.png",
              status: "in-progress"
            },
            { 
              title: "미평가", 
              value: "2명",
              image: "/images/alert-sign.png"
            }
          ]}
        />
        
        <DataTable
          data={executiveEvaluationSampleData}
          columns={tableColumns}
          onColumnsChange={setTableColumns}
          className="w-full"
          // 체크박스 활성화
          enableRowSelection={true}
          // 필터 관련 props
          searchFilters={searchFilters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          filters={filters}
          // 추가 버튼 비활성화
          enableAddForm={false}
          // 액션 컬럼 비활성화 (별도 actions 컬럼 사용)
          showActionColumn={false}
          // 일괄 삭제 버튼 활성화
          enableBulkDelete={true}
          // 일괄 삭제 핸들러
          onBulkDelete={handleBulkDelete}
        />

        {/* 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-6 mb-8"
        />

        {/* 임원 상세 정보 모달 */}
        <ExecutiveDetailModal
          executive={selectedExecutive}
          isOpen={showDetailModal}
          onClose={handleCloseDetailModal}
          initialEditMode={selectedExecutive?.evaluationStatus !== 'completed'}
        />
      </div>
    </div>
  );
}
