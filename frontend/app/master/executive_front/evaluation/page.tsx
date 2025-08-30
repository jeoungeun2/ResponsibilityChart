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

export default function ExecutiveFrontEvaluationPage() {
  const { isSidebarCollapsed } = useSidebar();
  
  // 추가 폼 관련 상태 관리
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  
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
    // 여기에 평가 로직을 구현할 수 있습니다
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
      render: (value: any, row: any) => {
        const statusDisplay = getEvaluationStatusDisplay(value);
        let textColor = '';
        
        // 상태별로 동그라미 색상에 맞는 글씨색 설정
        if (value === 'completed') {
          textColor = 'text-blue-800';
        } else if (value === 'in-progress') {
          textColor = 'text-yellow-800';
        } else {
          textColor = 'text-gray-800';
        }
        
        return (
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${statusDisplay.color}`}></div>
            <span className={`text-sm ${textColor}`}>
              {statusDisplay.label}
            </span>
          </div>
        );
      }
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
      key: "actions",
      header: "관리",
      visible: true,
      render: (value: any, row: any) => {
        const isCompleted = row.evaluationStatus === 'completed';
        
        return (
          <div className="relative">
            {isCompleted ? (
              <button
                onClick={() => handleViewDetail(row)}
                className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 transition-colors underline"
              >
                상세보기
              </button>
            ) : (
              <button
                onClick={() => handleEvaluate(row)}
                className="px-2 py-1 text-xs text-orange-600 hover:text-orange-800 transition-colors underline"
              >
                평가하기
              </button>
            )}
          </div>
        );
      }
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

  // 폼 필드 정의
  const formFields = [
    { key: "name", label: "성명", type: "text" as const, required: true },
    { key: "jobTitle", label: "직책", type: "text" as const, required: true },
    { key: "position", label: "직위", type: "text" as const, required: true },
    { key: "managedOrganization", label: "관리대상조직", type: "text" as const, required: true }
  ];

  // 폼 데이터 변경 핸들러
  const handleFormDataChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 추가 버튼 클릭 핸들러
  const handleShowAddForm = () => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) {
      setFormData({}); // 폼 초기화
    }
  };

  // 추가 처리 핸들러 (기능 없음)
  const handleAdd = () => {
    console.log('추가 기능은 구현되지 않았습니다.', formData);
    // 여기에 실제 추가 로직을 구현할 수 있습니다
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
            { title: "대상 임원", value: "23명" },
            { title: "완료", value: "18명" },
            { title: "진행중", value: "3명" },
            { title: "미평가", value: "2명" }
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
          // 추가 버튼 관련 props
          enableAddForm={true}
          showAddForm={showAddForm}
          onShowAddForm={handleShowAddForm}
          formData={formData}
          formFields={formFields}
          onFormDataChange={handleFormDataChange}
          onAdd={handleAdd}
          isAddLoading={false}
          isNameValid={true}
          // 액션 컬럼 비활성화 (별도 actions 컬럼 사용)
          showActionColumn={false}
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
        />
      </div>
    </div>
  );
}
