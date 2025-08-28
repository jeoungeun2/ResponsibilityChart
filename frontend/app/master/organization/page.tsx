"use client";

import { useState } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from '../executive/_components/Breadcrumb';
import Header from '../executive/_components/Header';
import { useSidebar } from '@/config/providers';
import EditIcon from '@/components/ui/edit-icon';
import DeleteIcon from '@/components/ui/delete-icon';
import { OrganizationData, organizationSampleData } from '@/data/organization-data';

// 컬럼 정의
const columns: any[] = [
  {
    key: "orgCodeLv1" as keyof OrganizationData,
    header: "관리대상조직코드 Lv1",
    visible: true
  },
  {
    key: "orgNameLv1" as keyof OrganizationData,
    header: "관리대상조직명",
    visible: true
  },
  {
    key: "deptCodeLv2" as keyof OrganizationData,
    header: "소관부서/본부코드 Lv2",
    visible: true
  },
  {
    key: "deptNameLv2" as keyof OrganizationData,
    header: "소관부서/본부명",
    visible: true
  },
  {
    key: "teamCodeLv3" as keyof OrganizationData,
    header: "소관팀코드 Lv3",
    visible: true
  },
  {
    key: "teamNameLv3" as keyof OrganizationData,
    header: "소관팀명",
    visible: true
  },
  {
    key: "registrationDate" as keyof OrganizationData,
    header: "등록일자",
    visible: true
  },
  {
    key: "actions",
    header: "액션",
    visible: true,
    render: (value: any, row: any) => (
      <div className="flex items-center space-x-2">
        <EditIcon 
          className="h-4 w-4" 
          onClick={() => console.log('수정:', row.id)}
        />
        <DeleteIcon 
          className="h-4 w-4" 
          onClick={() => console.log('삭제:', row.id)}
        />
      </div>
    )
  }
];

export default function OrganizationPage() {
  const { isSidebarCollapsed } = useSidebar();
  const [tableColumns, setTableColumns] = useState(columns);
  // 추가 폼 관련 상태 관리
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
   
  // 필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    orgCodeLv1: ''
  });

  // 페이지네이션 관련 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정

  // 필터 설정 정의
  const filters = [
    {
      key: "orgCodeLv1",
      label: "조직코드",
      type: "dropdown" as const,
      width: "w-32"
    }
  ];

  // 필터 옵션들
  const filterOptions = {
    orgCodeLv1: [
      { value: "ET", label: "ET - ETF투자부문" },
      { value: "AU", label: "AU - 자산운용부문" },
      { value: "AM", label: "AM - 자산관리부문" },
      { value: "GI", label: "GI - 글로벌투자부문" },
      { value: "CP", label: "CP - 금융소비자보호실" },
      { value: "IT", label: "IT - IT부문" },
      { value: "HR", label: "HR - 인사부문" },
      { value: "FI", label: "FI - 재무부문" },
      { value: "LE", label: "LE - 법무부문" }
    ]
  };

  // 폼 필드 정의
  const formFields = [
    { key: "orgCodeLv1", label: "관리대상조직코드 Lv1", type: "text" as const, required: true },
    { key: "orgNameLv1", label: "관리대상조직명", type: "text" as const, required: true },
    { key: "deptCodeLv2", label: "소관부서/본부코드 Lv2", type: "text" as const, required: true },
    { key: "deptNameLv2", label: "소관부서/본부명", type: "text" as const, required: true },
    { key: "teamCodeLv3", label: "소관팀코드 Lv3", type: "text" as const, required: true },
    { key: "teamNameLv3", label: "소관팀명", type: "text" as const, required: true },
    { key: "registrationDate", label: "등록일자", type: "date" as const, required: true }
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
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer border-l border-white/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2" />
              </svg>
              <span>직전회차 조직도</span>
            </button>
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer border-l border-white/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>다운로드</span>
            </button>
          </div>
        }
      />
      <div className={`max-w-7xl mx-auto space-y-6 ${isSidebarCollapsed ? '' : 'px-8'}`}>
        <CommonBreadcrumb />
        <H1 title="조직 Master" />
        
        <DataTable
          data={organizationSampleData}
          columns={tableColumns}
          onColumnsChange={setTableColumns}
          className="w-full"
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
      </div>
    </div>
  );
}
